<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/api/stocks', [ApiController::class, 'getStockData']);
Route::get('/api/bitcoin', [ApiController::class, 'getBitcoinData']);
// 기본 경로
Route::get('/', function () {
    return view('app');
});
