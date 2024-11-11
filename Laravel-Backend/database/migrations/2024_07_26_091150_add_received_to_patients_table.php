<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::table('patients', function (Blueprint $table) {
        $table->boolean('received')->default(false);
    });
}

public function down()
{
    Schema::table('patients', function (Blueprint $table) {
        $table->dropColumn('received');
    });
}
};
