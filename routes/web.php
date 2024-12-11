<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/api/stocks', [ApiController::class, 'getStockData']);
Route::get('/api/cryptocurrencies', [ApiController::class, 'getTopFiveCryptocurrencies']);
// 기본 경로
Route::get('/', function () {
    return view('app');
});
