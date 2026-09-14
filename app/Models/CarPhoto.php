<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
class CarPhoto extends Model
{
    protected $fillable = ['path','alt_text','sort_order','width','height'];
    public function car(): BelongsTo { return $this->belongsTo(Car::class); }
    public function url(): string { return Storage::disk('public')->url($this->path); }
}
