export interface Ticker {
  id: string;
  name: string;
  price?: number;
  prevPrice?:number;
  change?: number;
  volume?: number;
}

export interface TickerQuoteResponse {
  change_p: number;
  close: number;
  previousClose: number;
  volume: number;
}

export interface WebSocketMessageItem {
  p: number,
  s: string,
}

export interface WebSocketMessage {
  data: WebSocketMessageItem[],
  type: string,
}
