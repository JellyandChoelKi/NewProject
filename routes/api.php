<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/cryptocurrencies', [ApiController::class, 'getTopFiveCryptocurrencies']);
