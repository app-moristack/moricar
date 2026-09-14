<?php

namespace Tests\Feature;

use App\Actions\Accounts\ProvisionEntitlement;
use App\Enums\ApprovalStatus;
use App\Models\Car;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarSecurityTest extends TestCase
{
    use RefreshDatabase;

    private function car(): Car
    {
        $user = User::factory()->create();
        app(ProvisionEntitlement::class)->handle($user, 'individual');

        return Car::query()->forceCreate([
            'user_id' => $user->id, 'slug' => 'security-test-car',
            'listing_type' => 'sale', 'make' => 'Toyota', 'model' => 'Corolla',
            'year' => 2021, 'body_type' => 'sedan', 'condition' => 'used',
            'sale_price_minor' => 10000000, 'mileage_km' => 10000,
            'fuel' => 'petrol', 'transmission' => 'automatic', 'locality' => 'Moka',
            'latitude' => -20.1234567, 'longitude' => 57.1234567,
            'description' => 'Security test listing', 'approval_status' => 'approved',
            'publication_status' => 'active', 'is_featured' => true, 'published_at' => now(),
        ]);
    }

    private function assertHidden(Car $car): void
    {
        $this->getJson('/api/v1/cars/'.$car->slug)->assertNotFound();
        $this->getJson('/api/v1/cars/search')->assertOk()->assertJsonCount(0, 'data');
        $this->getJson('/api/v1/cars/featured')->assertOk()->assertJsonCount(0, 'data');
    }

    public function test_public_car_payload_excludes_private_account_and_location_data(): void
    {
        $car = $this->car();
        $response = $this->getJson('/api/v1/cars/'.$car->slug)->assertOk();
        foreach (['latitude', 'longitude', 'user_id', 'email', 'password', 'remember_token'] as $field) {
            $response->assertJsonMissingPath('data.'.$field)->assertJsonMissingPath('data.seller.'.$field);
        }
    }

    public function test_unapproved_and_non_active_cars_are_hidden_on_every_public_endpoint(): void
    {
        $car = $this->car();
        foreach (['draft', 'pending', 'rejected', 'suspended'] as $status) {
            $car->forceFill(['approval_status' => $status])->save();
            $this->assertHidden($car);
        }
        foreach (['private', 'paused', 'sold', 'archived'] as $status) {
            $car->forceFill(['approval_status' => 'approved', 'publication_status' => $status])->save();
            $this->assertHidden($car);
        }
    }

    public function test_missing_or_suspended_entitlement_hides_cars(): void
    {
        $car = $this->car();
        $car->user->entitlement->update(['status' => 'suspended']);
        $this->assertHidden($car);
        $car->user->entitlement->delete();
        $this->assertHidden($car);
    }

    public function test_business_term_is_checked_at_request_time_including_expiry_boundary(): void
    {
        $this->freezeTime();
        $car = $this->car();
        $entitlement = $car->user->entitlement;
        $entitlement->update(['classification' => 'business', 'status' => 'trialing',
            'trial_started_at' => now()->subMonth(), 'trial_ends_at' => now()->addSecond()]);
        $this->getJson('/api/v1/cars/'.$car->slug)->assertOk();
        $this->travel(1)->seconds();
        $this->assertHidden($car);
        $entitlement->update(['status' => 'active', 'paid_started_at' => now(), 'paid_ends_at' => now()->addYear()]);
        $this->getJson('/api/v1/cars/'.$car->slug)->assertOk();
        $entitlement->update(['status' => 'free']);
        $this->assertHidden($car);
    }

    public function test_future_paid_term_does_not_grant_early_access(): void
    {
        $car = $this->car();
        $car->user->entitlement->update(['classification' => 'business', 'status' => 'active',
            'paid_started_at' => now()->addDay(), 'paid_ends_at' => now()->addYear()]);
        $this->assertHidden($car);
    }

    public function test_provider_suspension_and_incorrect_seller_link_hide_cars(): void
    {
        $car = $this->car();
        $provider = Provider::factory()->approved()->create(['user_id' => $car->user_id]);
        $provider->forceFill(['approval_status' => ApprovalStatus::Suspended])->save();
        $this->assertHidden($car);
        $provider->forceFill(['approval_status' => ApprovalStatus::Approved, 'is_active' => false])->save();
        $this->assertHidden($car);
        $provider->forceFill(['is_active' => true])->save();
        $other = Provider::factory()->approved()->create();
        $car->forceFill(['provider_id' => $other->id])->save();
        $this->assertHidden($car);
    }

    public function test_search_rejects_unbounded_page_size_and_invalid_sort(): void
    {
        $this->getJson('/api/v1/cars/search?per_page=100000&sort=invalid')
            ->assertUnprocessable()->assertJsonValidationErrors(['per_page', 'sort']);
    }
}
