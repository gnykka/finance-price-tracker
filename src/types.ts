export type TickerHistoryItem = {
  date: string,
  close: number,
  high: number,
  low: number,
  open: number,
}

export type Ticker = {
  id: string;
  name: string;
  price?: number;
  prevPrice?:number;
  change?: number;
  volume?: number;
  history?: TickerHistoryItem[];
}

export type TickerQuoteResponse = {
  change_p: number;
  close: number;
  previousClose: number;
  volume: number;
}

export type WebSocketMessageItem = {
  p: number,
  s: string,
}

export type WebSocketMessage = {
  data: WebSocketMessageItem[],
  type: string,
}
