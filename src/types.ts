export interface Ticker {
  id: string;
  name: string;
  price?: number;
  change?: number;
  volume?: number;
}

export interface TickerQuoteResponse {
  change_p: number;
  close: number;
  volume: number;
}
