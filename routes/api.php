<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::middleware('api')->group(function () {
    Route::get('/stocks', [ApiController::class, 'getStockData']);
    Route::get('/domestic-stocks', [ApiController::class, 'getDomesticStockData']);
    Route::get('/cryptocurrencies', [ApiController::class, 'getTopFiveCryptocurrencies']);
});
