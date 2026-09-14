<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
class PublicCarResource extends CarSummaryResource
{
    public function toArray(Request $request): array {
        return array_merge(parent::toArray($request), ['trim'=>$this->trim,'condition'=>$this->condition,'colour'=>$this->colour,'engine_capacity_cc'=>$this->engine_capacity_cc,'description'=>$this->description,'is_negotiable'=>$this->is_negotiable,'weekly_rate_minor'=>$this->listing_type->value === 'rent' ? $this->weekly_rate_minor : null,'monthly_rate_minor'=>$this->listing_type->value === 'rent' ? $this->monthly_rate_minor : null,'minimum_rental_days'=>$this->listing_type->value === 'rent' ? $this->minimum_rental_days : null,'rental_availability'=>$this->listing_type->value === 'rent' ? $this->rental_availability?->value : null,'available_from'=>$this->available_from?->toDateString(),'availability_updated_at'=>$this->availability_updated_at?->toIso8601String(),'photos'=>$this->photos->map(fn ($photo)=>['id'=>$photo->id,'url'=>$photo->url(),'alt_text'=>$photo->alt_text,'sort_order'=>$photo->sort_order]),'published_at'=>$this->published_at?->toIso8601String(),'updated_at'=>$this->updated_at?->toIso8601String()]);
    }
}
