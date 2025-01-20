<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pets';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'image_url',
    ];

    /**
     * Get the values associated with the pet.
     */
    public function petValues()
    {
        return $this->hasMany(PetValue::class, 'pet_id', 'id');
    }
}
