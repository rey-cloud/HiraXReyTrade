<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PetValue extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pet_values';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'pet_id',
        'type',
        'attribute',
        'value',
        'clicks',
    ];

    /**
     * Get the pet that owns the value.
     */
    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id', 'id');
    }
}
