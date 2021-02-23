<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_metas', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('fname',20)->nullable();
            $table->string('lname',30)->nullable();
            $table->text('adress')->nullable();
            $table->string('city',20)->nullable();
            $table->string('country',20)->nullable();
            $table->integer('postalCode')->nullable();
            $table->text('about')->nullable();
            $table->text('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_metas');
    }
}
