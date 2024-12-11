<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class FetchStockData extends Command
{
    protected $signature = 'stocks:fetch';
    protected $description = 'Fetch stock data and store it in the stock table';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $apiKey = 'N1ZSZEZEYFVP3LI5'; // 발급받은 API 키로 교체
        $client = new Client();
        $symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'BRK.A', 'V', 'JNJ', 'WMT'];

        foreach ($symbols as $symbol) {
            $response = $client->get('https://www.alphavantage.co/query', [
                'query' => [
                    'function' => 'TIME_SERIES_DAILY',
                    'symbol' => $symbol,
                    'apikey' => $apiKey,
                ]
            ]);

            $data = json_decode($response->getBody(), true);
            $timeSeries = $data['Time Series (Daily)'] ?? [];

            foreach ($timeSeries as $date => $info) {
                DB::table('stock')->updateOrInsert(
                    ['symbol' => $symbol, 'date' => $date],
                    ['close' => $info['4. close']]
                );
            }

            // 요청 간 대기 시간 추가 (1초)
            sleep(1);
        }
    }
}

