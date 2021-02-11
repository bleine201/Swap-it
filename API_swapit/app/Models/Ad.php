<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;

    protected $table = 'ads';
    protected $fillable = [
        'title',
        'description',
        'exchange_id',
        'category_id',
        'condition_id',
        'user_id',
        'pseudo',
        'address',
        'username',
    ];
}
