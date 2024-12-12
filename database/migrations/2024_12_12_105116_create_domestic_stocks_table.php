<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDomesticStocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('domestic_stocks', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->date('date');
            $table->decimal('close', 8, 2);
            $table->timestamps();
            $table->unique(['symbol', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('domestic_stocks');
    }
}
