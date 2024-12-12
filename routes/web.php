<?php

use Illuminate\Support\Facades\Route;
// 기본 경로
Route::get('/', function () {
    return view('app');
});