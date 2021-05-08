<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyController;

Route::apiResource('surveys', SurveyController::class);
