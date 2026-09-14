<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class SearchCarsRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'listing_type'=>['nullable',Rule::in(['sale','rent'])],'term'=>['nullable','string','max:120'],'make'=>['nullable','string','max:80'],'model'=>['nullable','string','max:100'],'body_type'=>['nullable','string','max:40'],'fuel'=>['nullable','string','max:30'],'transmission'=>['nullable','string','max:30'],'locality'=>['nullable','string','max:120'],'price_min'=>['nullable','integer','min:0'],'price_max'=>['nullable','integer','gte:price_min'],'year_min'=>['nullable','integer','min:1950','max:'.(date('Y')+1)],'year_max'=>['nullable','integer','gte:year_min'],'mileage_max'=>['nullable','integer','min:0'],'sort'=>['nullable',Rule::in(['newest','price_asc','price_desc','year_desc','mileage_asc'])],'per_page'=>['nullable','integer','min:1','max:48'],
        ];
    }
}
