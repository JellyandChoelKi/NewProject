<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

class UpdateStockData extends Command
{
    protected $signature = 'update:stock-data';
    protected $description = 'Update stock data from API';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $apiKey = 'N1ZSZEZEYFVP3LI5'; // 발급받은 API 키로 교체
        $client = new Client([
            'verify' => base_path('cacert.pem'),
        ]);
        $symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB'];
        
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
                // 최근 일주일 이내의 데이터만 업데이트
                if (strtotime($date) >= strtotime('-1 week')) {
                    DB::table('stock')->updateOrInsert(
                        ['symbol' => $symbol, 'date' => $date],
                        ['close' => $info['4. close']]
                    );
                }
            }
        }

        $this->info('Stock data updated successfully.');
    }
}
