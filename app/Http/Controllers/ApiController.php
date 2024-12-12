<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
class ApiController extends Controller
{
    public function getStockData()
    {
        // 데이터베이스에서 주식 데이터 조회
        $stocks = DB::table('stock')
                    ->select('symbol', 'date', 'close')
                    ->orderBy('date', 'desc')
                    ->get()
                    ->groupBy('symbol');

        return response()->json($stocks);
    }

    public function getDomesticStockData()
    {
        $stocks = DB::table('domestic_stocks')
                    ->select('symbol', 'date', 'close')
                    ->orderBy('date', 'desc')
                    ->get()
                    ->groupBy('symbol');

        return response()->json($stocks);
    }


    public function getTopFiveCryptocurrencies()
    {
        try {
            $client = new Client(['verify' => false]);
            $response = $client->get('https://api.coingecko.com/api/v3/coins/markets', [
                'query' => [
                    'vs_currency' => 'usd',
                    'order' => 'market_cap_desc',
                    'per_page' => 5,
                    'page' => 1
                ]
            ]);
            $data = json_decode($response->getBody(), true);

            $topFiveCryptos = array_map(function($crypto) {
                return [
                    'symbol' => $crypto['symbol'],
                    'name' => $crypto['name'],
                    'current_price' => $crypto['current_price'],
                    'market_cap' => $crypto['market_cap'],
                    '24h_high' => $crypto['high_24h'],
                    '24h_low' => $crypto['low_24h'],
                    '24h_change' => $crypto['price_change_percentage_24h'],
                    'last_updated' => $crypto['last_updated']
                ];
            }, $data);

            return response()->json($topFiveCryptos);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}


