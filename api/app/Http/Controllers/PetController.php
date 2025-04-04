<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use App\Models\PetValue;
use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use Illuminate\Validation\Rule;

class PetController extends Controller
{
    public function index(Request $request)
    {
        $query = Pet::with('petValues')->orderBy('id', 'desc');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%$search%");
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }        

        if ($request->has('paginate') && $request->paginate == 'false') {
            return response()->json($query->get());
        }

        return response()->json($query->paginate(10));
    }

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
            'type' => $request->input('type'),
            'value' => $request->input('value'),
        ]);

        if ($values) {
            // Add the pet values
            foreach ($values as $value) {
                $pet->petValues()->create([
                    'type' => $value['type'],
                    'attribute' => $value['attribute'],
                    'value' => $value['value'],
                    'clicks' => 0,
                ]);
            }
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

        return response()->json([
            'id' => $pet->id,
            'name' => $pet->name,
            'type' => $pet->type,
            'image_url' => $pet->image_url,
            'value' => $pet->value, // for non-"Pet" types
            'values' => $pet->petValues, // rename relation to match frontend expectation
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('pets')->ignore($id), // Use $id instead of $this->pet
            ],
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'type' => 'required',
            'value' => 'nullable|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
            'values' => 'nullable|json',
        ]);
        $pet = Pet::find($id);

        // Handle the image upload if provided
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('pets', 'public');
            $pet->image_url = $imagePath;
        }

        // Update the pet's name
        $pet->name = $request->input('name');
        $pet->type = $request->input('type');
        $pet->value = $request->input('value');
        $pet->save();

        // Decode the `values` JSON string into an array
        $values = json_decode($request->input('values'), true);

        // Replace old pet values
        if ($values) {
            $pet->petValues()->delete();
            foreach ($values as $value) {
                $pet->petValues()->create([
                    'type' => $value['type'],
                    'attribute' => $value['attribute'],
                    'value' => $value['value'],
                    'clicks' => 0,
                ]);
            }
        }

        return response()->json([
            'message' => 'Pet and values updated successfully.',
            'pet' => $pet->load('petValues'),
        ]);
    }

    public function getValue(Request $request, $id)
    {
        $pet = Pet::find($id);
        
        if ($request->has('type') && $request->has('attribute')) {
            // Return all results
            $pet_value = PetValue::with('pet')->where('type', $request->type)->where('pet_id', $id)->where('attribute', $request->attribute)->first();
        } else {
            $pet_value = $pet;
        }
        
        return $pet_value->value;
    }

    public function destroy($id) {
        
        return Pet::find($id)->delete();
    }
}
