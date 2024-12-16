<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InvestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;

Route::middleware('api')->group(function () {
    // Invest 관련 라우트
    Route::get('/stocks', [InvestController::class, 'getStockData']);
    Route::get('/domestic-stocks', [InvestController::class, 'getDomesticStockData']);
    Route::get('/cryptocurrencies', [InvestController::class, 'getTopFiveCryptocurrencies']);
    Route::get('/exchange-rates', [InvestController::class, 'getExchangeRates']);

    // 프로덕트 관련 라우트
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});

// 인증 라우트
Route::post('/login', [AuthController::class, 'login'])->middleware('web');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify', [AuthController::class, 'verify']); // 메일인증입니다
Route::post('/send-verification-code', [AuthController::class, 'sendVerificationCode']); // 인증 코드 전송
Route::post('/verify-code', [AuthController::class, 'verifyCode']); // 인증 코드 확인
Route::middleware('auth:sanctum')->post('/update-admin', [AuthController::class, 'updateAdmin']);
Route::middleware('auth:sanctum')->get('/check-admin', [AuthController::class, 'checkAdmin']);
