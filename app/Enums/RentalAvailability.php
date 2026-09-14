<?php
namespace App\Enums;
enum RentalAvailability: string
{
    case Available = 'available';
    case Unavailable = 'unavailable';
    case AvailableFrom = 'available_from';
}
