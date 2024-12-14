// src/types/stock.d.ts
export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
}

export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface StockData {
  "Meta Data": MetaData;
  "Time Series (5min)": {
      [timestamp: string]: TimeSeriesData;
  };
}
// resources/js/types/stock.d.ts
export interface StockEntry {
  date: string;
  close: number;
}

export const domesticStockSymbols: { [key: string]: string } = {
  '005930': '삼성전자',
  '000660': 'SK하이닉스',
  '035420': 'NAVER',
  '051910': 'LG화학',
  '005380': '현대자동차'
};

export const overseasStockSymbols: { [key: string]: string } = {
  'AAPL': '애플',
  'MSFT': '마이크로소프트',
  'GOOGL': '구글',
  'AMZN': '아마존',
  'FB': '페이스북'
};
