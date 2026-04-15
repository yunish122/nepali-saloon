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
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign('services_shop_id_foreign');
            $table->dropUnique('service_name');
            $table->index('shop_id', 'services_shop_id_index');
            $table->foreign('shop_id')->references('id')->on('shops');
            $table->unique(['shop_id', 'service_name'], 'services_shop_id_service_name_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign('services_shop_id_foreign');
            $table->dropUnique('services_shop_id_service_name_unique');
            $table->dropIndex('services_shop_id_index');
            $table->unique('shop_id', 'service_name');
            $table->foreign('shop_id')->references('id')->on('shops');
        });
    }
};
