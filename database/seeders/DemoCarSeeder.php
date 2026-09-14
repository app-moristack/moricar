<?php
namespace Database\Seeders;
use App\Enums\ApprovalStatus;
use App\Enums\ListingType;
use App\Enums\PublicationStatus;
use App\Enums\RentalAvailability;
use App\Models\Car;
use App\Models\Provider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoCarSeeder extends Seeder
{
    public function run(): void {
        $cars=[
            ['Toyota','Corolla',2021,85000000,'sale',55000,'Hybrid','Automatic','Black River','Sedan'],
            ['Hyundai','i20',2019,59500000,'sale',68000,'Petrol','Automatic','Moka','Hatchback'],
            ['BMW','X3',2020,230000000,'sale',42000,'Diesel','Automatic','Tamarin','SUV'],
            ['Suzuki','Swift',2022,140000,'rent',31000,'Petrol','Automatic','Grand Baie','Hatchback'],
            ['Toyota','Hilux',2021,175000000,'sale',61000,'Diesel','Manual','Curepipe','Pickup'],
            ['Kia','Seltos',2023,220000,'rent',18000,'Petrol','Automatic','Mahebourg','SUV'],
        ];
        $providers=Provider::query()->with('user')->take(count($cars))->get();
        foreach($cars as $index=>$data) {
        $businessNames=['Auto Plus Garage','Island Auto','Premium Motors','Mauritius Drive','Auto Select','Coastal Rentals'];
        foreach ($providers as $index=>$provider) {
            $name=$businessNames[$index] ?? 'MoriCar Automotive';
            $provider->forceFill(['name'=>$name,'slug'=>Str::slug($name).'-demo','description'=>"Trusted automotive services and direct local expertise from $name."])->save();
        }
            [$make,$model,$year,$price,$type,$mileage,$fuel,$transmission,$locality,$body]=$data;
            $provider=$providers[$index] ?? $providers->first(); if(!$provider) continue;
            Car::query()->updateOrCreate(['slug'=>Str::slug("$year-$make-$model-demo")],[
                'user_id'=>$provider->user_id,'provider_id'=>$provider->id,'listing_type'=>ListingType::from($type),
                'make'=>$make,'model'=>$model,'year'=>$year,'body_type'=>$body,'condition'=>'used',
                'sale_price_minor'=>$type==='sale'?$price:null,'daily_rate_minor'=>$type==='rent'?$price:null,
                'minimum_rental_days'=>$type==='rent'?1:null,'rental_availability'=>$type==='rent'?RentalAvailability::Available:null,
                'availability_updated_at'=>$type==='rent'?now():null,'mileage_km'=>$mileage,'fuel'=>$fuel,'transmission'=>$transmission,
                'locality'=>$locality,'description'=>"Well maintained $make $model, reviewed for the MoriCar demo marketplace.",
                'approval_status'=>ApprovalStatus::Approved,'publication_status'=>PublicationStatus::Active,'is_featured'=>$index<4,
                'approved_at'=>now(),'published_at'=>now(),
            ]);
        }
    }
}
