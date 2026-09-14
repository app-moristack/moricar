<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class CarSummaryResource extends JsonResource
{
    public function toArray(Request $request): array {
        $cover=$this->photos->first();
        return ['id'=>$this->id,'slug'=>$this->slug,'listing_type'=>$this->listing_type->value,'listing_type_label'=>$this->listing_type->label(),'title'=>"{$this->year} {$this->make} {$this->model}",'make'=>$this->make,'model'=>$this->model,'year'=>$this->year,'body_type'=>$this->body_type,'price_minor'=>$this->displayPriceMinor(),'price_unit'=>$this->listing_type->value === 'rent' ? 'day' : null,'mileage_km'=>$this->mileage_km,'fuel'=>$this->fuel,'transmission'=>$this->transmission,'locality'=>$this->locality,'is_featured'=>$this->is_featured,'cover_url'=>$cover?->url(),'seller'=>['name'=>$this->provider?->name ?? $this->user->name,'type'=>$this->provider?->provider_type?->value ?? 'individual','verified'=>$this->provider?->is_verified ?? false]];
    }
}
