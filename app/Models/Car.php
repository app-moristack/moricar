<?php

namespace App\Models;

use App\Enums\ApprovalStatus;
use App\Enums\ListingType;
use App\Enums\PublicationStatus;
use App\Enums\RentalAvailability;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['listing_type', 'make', 'model', 'trim', 'year', 'body_type', 'condition', 'sale_price_minor', 'daily_rate_minor', 'weekly_rate_minor', 'monthly_rate_minor', 'minimum_rental_days', 'rental_availability', 'available_from', 'mileage_km', 'fuel', 'transmission', 'engine_capacity_cc', 'colour', 'locality', 'description', 'is_negotiable'];

    protected function casts(): array
    {
        return ['listing_type' => ListingType::class, 'publication_status' => PublicationStatus::class, 'approval_status' => ApprovalStatus::class, 'rental_availability' => RentalAvailability::class, 'available_from' => 'date', 'availability_updated_at' => 'datetime', 'is_negotiable' => 'boolean', 'approved_at' => 'datetime', 'published_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(CarPhoto::class)->orderBy('sort_order');
    }

    public function scopePubliclyVisible(Builder $query): Builder
    {
        return $query->where('approval_status', ApprovalStatus::Approved->value)
            ->where('publication_status', PublicationStatus::Active->value)
            ->whereHas('user.entitlement', fn (Builder $entitlement) => $entitlement->commerciallyEligible())
            ->whereDoesntHave('user.provider', fn (Builder $provider) => $provider
                ->where('approval_status', ApprovalStatus::Suspended->value)->orWhere('is_active', false))
            ->where(fn (Builder $owner) => $owner->whereNull('provider_id')
                ->orWhereHas('provider', fn (Builder $provider) => $provider->whereColumn('providers.user_id', 'cars.user_id')));
    }

    public function displayPriceMinor(): int
    {
        return $this->listing_type === ListingType::Sale ? (int) $this->sale_price_minor : (int) $this->daily_rate_minor;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
