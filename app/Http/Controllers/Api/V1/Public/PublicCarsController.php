<?php
namespace App\Http\Controllers\Api\V1\Public;
use App\Http\Controllers\Controller;
use App\Http\Resources\CarSummaryResource;
use App\Http\Resources\PublicCarResource;
use App\Models\Car;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
class PublicCarsController extends Controller
{
    public function show(Car $car): PublicCarResource { abort_unless($car->newQuery()->whereKey($car->getKey())->publiclyVisible()->exists(),404); return new PublicCarResource($car->load(['photos','provider','user'])); }
    public function featured(): AnonymousResourceCollection { return CarSummaryResource::collection(Car::query()->publiclyVisible()->where('is_featured',true)->with(['photos','provider','user'])->latest('published_at')->limit(8)->get()); }
}
