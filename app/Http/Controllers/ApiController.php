<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

class ApiController extends Controller
{
    public function getStockData()
    {
        $apiKey = 'N1ZSZEZEYFVP3LI5'; // 발급받은 API 키로 교체
        $client = new Client();
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
                DB::table('stock')->updateOrInsert(
                    ['symbol' => $symbol, 'date' => $date],
                    ['close' => $info['4. close']]
                );
            }

            // 요청 간 대기 시간 추가 (1초)
            sleep(1);
        }

        // 데이터 조회 및 반환
        $stocks = DB::table('stock')
                    ->select('symbol', 'date', 'close')
                    ->orderBy('date', 'desc')
                    ->get()
                    ->groupBy('symbol');

        return response()->json($stocks);
    }

    public function getBitcoinData()
    {
        // 비트코인 데이터 가져오기 예제
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            $data = json_decode($response->getBody(), true);

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
