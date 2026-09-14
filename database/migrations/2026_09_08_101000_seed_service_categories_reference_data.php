<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();
        $sortOrder = 0;

        foreach ($this->categories() as [$name, $icon, $isPopular]) {
            DB::table('service_categories')->updateOrInsert(
                ['slug' => Str::slug($name)],
                [
                    'name' => $name,
                    'icon' => $icon,
                    'is_active' => true,
                    'is_popular' => $isPopular,
                    'sort_order' => $sortOrder += 10,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            );
        }
    }

    public function down(): void
    {
        DB::table('service_categories')->delete();
    }

    private function categories(): array
    {
        return [
            ['Routine Servicing', 'settings', true],
            ['Mechanical Repair', 'wrench', true],
            ['Engine Work', 'gauge', true],
            ['Transmission & Clutch', 'cog', false],
            ['Brakes', 'disc', true],
            ['Suspension & Steering', 'git-branch', false],
            ['Computer Diagnostics', 'scan-line', true],
            ['Auto Electrical', 'zap', true],
            ['Batteries', 'battery-charging', true],
            ['Air Conditioning', 'snowflake', true],
            ['Hybrid & EV Specialists', 'leaf', false],
            ['Panel Beating & Body Repair', 'hammer', true],
            ['Painting', 'paintbrush', true],
            ['Car Detailing & Polishing', 'sparkles', true],
            ['Ceramic Coating & Wrapping', 'shield', false],
            ['Window Tinting & Glass', 'panels-top-left', false],
            ['Tyre Supply & Fitting', 'circle-dot', true],
            ['Wheel Alignment', 'move-horizontal', true],
            ['Audio, Cameras & Sensors', 'radio', false],
            ['Parts & Accessories', 'package', true],
            ['Towing & Recovery', 'truck', true],
            ['Mobile Mechanics', 'car-front', true],
            ['Pre-purchase Inspections', 'clipboard-check', true],
            ['Vehicle Specialist Services', 'badge-check', false],
        ];
    }
};
