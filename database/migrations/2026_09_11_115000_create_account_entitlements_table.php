<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('account_entitlements', function (Blueprint $table) {
            $table->id(); $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('classification',30); $table->json('capabilities'); $table->string('status',20);
            $table->timestamp('trial_started_at')->nullable(); $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('paid_started_at')->nullable(); $table->timestamp('paid_ends_at')->nullable();
            $table->unsignedSmallInteger('car_limit'); $table->unsignedSmallInteger('photos_per_car_limit');
            $table->unsignedInteger('annual_price_minor')->default(100000); $table->char('currency',3)->default('MUR');
            $table->timestamps(); $table->index(['status','trial_ends_at','paid_ends_at']);
        });
    }
    public function down(): void { Schema::dropIfExists('account_entitlements'); }
};
