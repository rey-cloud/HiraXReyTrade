<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pet_values', function (Blueprint $table) {
            $table->id(); // Auto-increment ID
            $table->unsignedBigInteger('pet_id'); // Foreign key for pets
            $table->enum('type', ['normal', 'neon', 'mega']); // Type of pet
            $table->enum('attribute', ['no_potion', 'fly', 'ride', 'fly_ride']); // Attribute
            $table->integer('value'); // Value for this attribute
            $table->integer('clicks')->default(0); // Number of clicks, default to 0
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->nullable(); // Optional: Add this if you want to track updates but set it manually

            // Foreign key constraint
            $table->foreign('pet_id')->references('id')->on('pets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_values');
    }
};
