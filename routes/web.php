<?php

use Illuminate\Support\Facades\Route;

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