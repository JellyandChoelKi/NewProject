<?php

use App\Http\Controllers\ApiController;

Route::get('/stocks', [ApiController::class, 'getStockData']);
