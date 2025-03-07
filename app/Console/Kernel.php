<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('update:stock-data')->dailyAt('00:00'); // 매일 자정에 데이터 업데이트
        $schedule->command('update:domestic-stock-data')->dailyAt('00:30');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    // app/Http/Kernel.php
    protected $routeMiddleware = [
        // ...
        'admin' => \App\Http\Middleware\IsAdmin::class,
    ];

}
