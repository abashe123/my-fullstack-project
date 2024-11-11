<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSenderNameAndSampleTransportDateToPatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->string('senderName')->nullable(); // Add sender_name column
            $table->date('sampleTransportDate')->nullable(); // Add sample_transport_date column
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn('senderName'); // Remove sender_name column
            $table->dropColumn('sampleTransportDate'); // Remove sample_transport_date column
        });
    }
}
