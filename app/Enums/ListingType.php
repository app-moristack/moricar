<?php
namespace App\Enums;
enum ListingType: string
{
    case Sale = 'sale';
    case Rent = 'rent';
    public function label(): string { return $this === self::Sale ? 'For sale' : 'For rent'; }
}
