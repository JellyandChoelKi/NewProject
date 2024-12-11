// src/types/bitcoin.d.ts
export interface CryptocurrencyData {
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  '24h_high': number;
  '24h_low': number;
  '24h_change': number;
  last_updated: string;
}
