<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountEntitlement extends Model
{
    protected $fillable = ['classification', 'capabilities', 'status', 'trial_started_at', 'trial_ends_at', 'paid_started_at', 'paid_ends_at', 'car_limit', 'photos_per_car_limit', 'annual_price_minor', 'currency'];

    protected function casts(): array
    {
        return ['capabilities' => 'array', 'trial_started_at' => 'datetime', 'trial_ends_at' => 'datetime', 'paid_started_at' => 'datetime', 'paid_ends_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCommerciallyEligible(Builder $query): Builder
    {
        $now = now();

        return $query->where(function (Builder $query) use ($now): void {
            $query->where(fn (Builder $free) => $free
                ->whereIn('classification', ['individual', 'self_employed'])
                ->where('status', 'free'))
                ->orWhere(fn (Builder $business) => $business
                    ->where('classification', 'business')
                    ->whereIn('status', ['trialing', 'active'])
                    ->where(fn (Builder $period) => $period
                        ->where(fn (Builder $trial) => $trial->where('trial_started_at', '<=', $now)->where('trial_ends_at', '>', $now))
                        ->orWhere(fn (Builder $paid) => $paid->where('paid_started_at', '<=', $now)->where('paid_ends_at', '>', $now))));
        });
    }

    public function isCommerciallyEligible(): bool
    {
        return $this->exists && static::query()->whereKey($this->getKey())->commerciallyEligible()->exists();
    }
}
