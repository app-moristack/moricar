<?php
namespace App\Enums;
enum PublicationStatus: string
{
    case Private = 'private';
    case Active = 'active';
    case Paused = 'paused';
    case Sold = 'sold';
    case Archived = 'archived';
}
