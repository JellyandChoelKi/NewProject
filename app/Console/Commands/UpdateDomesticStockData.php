<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

class UpdateDomesticStockData extends Command
{
    protected $signature = 'update:domestic-stock-data';
    protected $description = 'Update domestic stock data from Naver Finance API';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $client = new Client(['verify' => base_path('cacert.pem')]);
        $symbols = ['005930', '000660', '035420', '051910', '005380']; // 삼성전자, SK하이닉스, NAVER, LG화학, 현대자동차

        foreach ($symbols as $symbol) {
            $response = $client->get("https://finance.naver.com/item/main.nhn?code={$symbol}");
            $html = $response->getBody()->getContents();

            // HTML 파싱하여 주식 데이터 추출 (간단한 예시)
            preg_match('/<span class="blind">([0-9,]+)<\/span>/', $html, $matches);
            if (isset($matches[1])) {
                $price = str_replace(',', '', $matches[1]);

                DB::table('domestic_stocks')->updateOrInsert(
                    ['symbol' => $symbol, 'date' => date('Y-m-d')],
                    ['close' => $price]
                );
            }
        }

        $this->info('Domestic stock data updated successfully.');
    }
}
