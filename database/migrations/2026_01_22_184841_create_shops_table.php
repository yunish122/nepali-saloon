<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('shop_name')->unique();
            $table->string('location');
            $table->string('phone')->unique();
            $table->time('opening_time');
            $table->time('closing_time');
            $table->tinyInteger('status');
            $table->foreignId('user_id');      
            $table->softDeletes(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shops');

    }
};
