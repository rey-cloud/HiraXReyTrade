<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PetSeeder extends Seeder
{
    public function run()
    {
        $pets = [
            ['name' => 'Dog', 'image_url' => null],
            ['name' => 'Cat', 'image_url' => null],
            ['name' => 'Rabbit', 'image_url' => null],
            ['name' => 'Tiger', 'image_url' => null],
            ['name' => 'Elephant', 'image_url' => null],
            ['name' => 'Horse', 'image_url' => null],
            ['name' => 'Lion', 'image_url' => null],
            ['name' => 'Fox', 'image_url' => null],
            ['name' => 'Panda', 'image_url' => null],
            ['name' => 'Wolf', 'image_url' => null],
        ];

        foreach ($pets as $pet) {
            $petId = DB::table('pets')->insertGetId([
                'name' => $pet['name'],
                'image_url' => $pet['image_url'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $values = [
                ["type" => "normal", "attribute" => "no_potion", "value" => 1],
                ["type" => "normal", "attribute" => "fly", "value" => 2],
                ["type" => "normal", "attribute" => "ride", "value" => 3],
                ["type" => "normal", "attribute" => "fly_ride", "value" => 4],
                ["type" => "neon", "attribute" => "no_potion", "value" => 5],
                ["type" => "neon", "attribute" => "fly", "value" => 6],
                ["type" => "neon", "attribute" => "ride", "value" => 7],
                ["type" => "neon", "attribute" => "fly_ride", "value" => 8],
                ["type" => "mega", "attribute" => "no_potion", "value" => 9],
                ["type" => "mega", "attribute" => "fly", "value" => 10],
                ["type" => "mega", "attribute" => "ride", "value" => 11],
                ["type" => "mega", "attribute" => "fly_ride", "value" => 12],
            ];

            foreach ($values as $value) {
                DB::table('pet_values')->insert([
                    'pet_id' => $petId,
                    'type' => $value['type'],
                    'attribute' => $value['attribute'],
                    'value' => $value['value'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
