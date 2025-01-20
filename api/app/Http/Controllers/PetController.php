<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use App\Models\PetValue;
use App\Http\Requests\StorePetRequest;

class PetController extends Controller
{
    /**
     * Store a new pet and its values.
     */
    public function store(StorePetRequest $request)
    {
        // Handle the image upload if provided
        $imagePath = null;
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('pets', 'public');
        } else {
            // Set a default image if no file is uploaded
            $imagePath = 'default_images/default_pet.png'; // Ensure this exists
        }

        // Decode the `values` JSON string into an array
        $values = json_decode($request->input('values'), true);

        // Create the pet
        $pet = Pet::create([
            'name' => $request->input('name'),
            'image_url' => $imagePath,
        ]);

        // Add the pet values
        foreach ($values as $value) {
            $pet->petValues()->create([
                'type' => $value['type'],
                'attribute' => $value['attribute'],
                'value' => $value['value'],
                'clicks' => 0,
            ]);
        }

        return response()->json([
            'message' => 'Pet and values created successfully.',
            'pet' => $pet->load('petValues'),
        ], 201);
    }

    /**
     * Retrieve a pet and its values.
     */
    public function show($id)
    {
        $pet = Pet::with('petValues')->find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet not found.'], 404);
        }

        return response()->json($pet);
    }
}
