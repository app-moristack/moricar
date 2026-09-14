<?php
namespace App\Actions\Accounts;
use App\Models\AccountEntitlement;
use App\Models\User;
class ProvisionEntitlement
{
    public function handle(User $user, string $providerType): AccountEntitlement {
        $business=$providerType === 'agency'; $now=now();
        return $user->entitlement()->create([
            'classification'=>$business ? 'business' : 'self_employed',
            'capabilities'=>['cars','services'],
            'status'=>$business ? 'trialing' : 'free',
            'trial_started_at'=>$business ? $now : null,
            'trial_ends_at'=>$business ? $now->copy()->addMonthNoOverflow() : null,
            'car_limit'=>$business ? 20 : 1,
            'photos_per_car_limit'=>$business ? 15 : 5,
            'annual_price_minor'=>100000,
            'currency'=>'MUR',
        ]);
    }
}
