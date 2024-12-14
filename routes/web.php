<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\RegisterController;
// 기본 경로
Route::get('/', function () {
    return view('app');  
});

// 투자 분석 페이지 경로
Route::get('/invest', function () {
    return view('app');
});

// 쇼핑 페이지 경로
Route::get('/products', function () {
    return view('app');
});


Auth::routes();

Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);
