<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('provider_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('listing_type', 10);
            $table->string('make', 80); $table->string('model', 100); $table->string('trim', 100)->nullable();
            $table->unsignedSmallInteger('year'); $table->string('body_type', 40); $table->string('condition', 30);
            $table->unsignedBigInteger('sale_price_minor')->nullable();
            $table->unsignedBigInteger('daily_rate_minor')->nullable(); $table->unsignedBigInteger('weekly_rate_minor')->nullable(); $table->unsignedBigInteger('monthly_rate_minor')->nullable();
            $table->unsignedSmallInteger('minimum_rental_days')->nullable();
            $table->string('rental_availability', 20)->nullable(); $table->date('available_from')->nullable(); $table->timestamp('availability_updated_at')->nullable();
            $table->unsignedInteger('mileage_km'); $table->string('fuel', 30); $table->string('transmission', 30);
            $table->unsignedSmallInteger('engine_capacity_cc')->nullable(); $table->string('colour', 40)->nullable();
            $table->string('locality', 120); $table->decimal('latitude', 10, 7)->nullable(); $table->decimal('longitude', 10, 7)->nullable();
            $table->text('description'); $table->boolean('is_negotiable')->default(false);
            $table->string('approval_status', 20)->default('draft'); $table->string('publication_status', 20)->default('private');
            $table->boolean('is_featured')->default(false); $table->timestamp('featured_until')->nullable();
            $table->timestamp('submitted_at')->nullable(); $table->timestamp('approved_at')->nullable(); $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete(); $table->text('rejection_reason')->nullable(); $table->timestamp('published_at')->nullable();
            $table->unsignedBigInteger('view_count')->default(0); $table->unsignedBigInteger('contact_count')->default(0);
            $table->timestamps(); $table->softDeletes();
            $table->index(['listing_type','approval_status','publication_status']);
            $table->index(['make','model']); $table->index(['locality','listing_type']); $table->index(['is_featured','featured_until']);
        });
        Schema::create('car_photos', function (Blueprint $table) {
            $table->id(); $table->foreignId('car_id')->constrained()->cascadeOnDelete(); $table->string('path'); $table->string('alt_text')->nullable(); $table->unsignedSmallInteger('sort_order')->default(0); $table->unsignedInteger('width')->nullable(); $table->unsignedInteger('height')->nullable(); $table->timestamps(); $table->unique(['car_id','sort_order']);
        });
    }
    public function down(): void { Schema::dropIfExists('car_photos'); Schema::dropIfExists('cars'); }
};
