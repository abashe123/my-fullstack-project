<?php
// database/migrations/2024_07_23_115227_add_submitted_to_patients_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSubmittedToPatientsTable extends Migration
{
    public function up()
    {
        Schema::table('patients', function (Blueprint $table) {
            // Check if the column does not exist before adding it
            if (!Schema::hasColumn('patients', 'submitted')) {
                $table->boolean('submitted')->default(false);
            }
        });
    }

    public function down()
    {
        Schema::table('patients', function (Blueprint $table) {
            // Check if the column exists before dropping it
            if (Schema::hasColumn('patients', 'submitted')) {
                $table->dropColumn('submitted');
            }
        });
    }
}
