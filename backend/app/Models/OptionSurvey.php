<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionSurvey extends Model
{
    use HasFactory;

    protected $table = 'option_survey';

    protected $fillable = [
        'survey_id', 'title',
    ];
}
