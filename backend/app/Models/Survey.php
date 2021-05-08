<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $table = 'survey';

    protected $fillable = [
        'title', 'initiated_at', 'ended_at',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'initiated_at',
        'ended_at'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d/m');
    }
}
