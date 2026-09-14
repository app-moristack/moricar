<?php
namespace App\Http\Controllers\Api\V1\Public;
use App\Http\Controllers\Controller;
use App\Http\Requests\SearchCarsRequest;
use App\Http\Resources\CarSummaryResource;
use App\Models\Car;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
class CarSearchController extends Controller
{
    public function __invoke(SearchCarsRequest $request): AnonymousResourceCollection {
        $data=$request->validated(); $query=Car::query()->publiclyVisible()->with(['photos','provider','user']);
        foreach (['listing_type','make','model','body_type','fuel','transmission','locality'] as $field) if (!empty($data[$field])) $query->where($field,$data[$field]);
        if (!empty($data['term'])) $query->where(fn($q)=>$q->where('make','like','%'.$data['term'].'%')->orWhere('model','like','%'.$data['term'].'%'));
        if (isset($data['year_min'])) $query->where('year','>=',$data['year_min']); if (isset($data['year_max'])) $query->where('year','<=',$data['year_max']); if (isset($data['mileage_max'])) $query->where('mileage_km','<=',$data['mileage_max']);
        $price=$data['listing_type'] ?? 'sale'; $column=$price === 'rent' ? 'daily_rate_minor' : 'sale_price_minor';
        if (isset($data['price_min'])) $query->where($column,'>=',$data['price_min']*100); if (isset($data['price_max'])) $query->where($column,'<=',$data['price_max']*100);
        match ($data['sort'] ?? 'newest') { 'price_asc'=>$query->orderBy($column), 'price_desc'=>$query->orderByDesc($column), 'year_desc'=>$query->orderByDesc('year'), 'mileage_asc'=>$query->orderBy('mileage_km'), default=>$query->latest('published_at') };
        return CarSummaryResource::collection($query->orderBy('id')->paginate($data['per_page'] ?? 12)->withQueryString());
    }
}
