import { WebSocketMessage } from './types';

type Callback = (data: WebSocketMessage) => void;

class TickerWebSocket {
  private socket: WebSocket;

  private callback: Callback;

  private ids: string[];

  constructor(ids: string[], callback: Callback) {
    this.socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.REACT_APP_WEBSOCKET_KEY}`,
    );
    this.ids = ids;
    this.callback = callback;

    this.socket.addEventListener('open', () => {
      this.ids.forEach((id) => this.subscribe(id));
    });

    this.socket.addEventListener('message', (event) => {
      if (!this.callback) return;
      this.callback(JSON.parse(event.data));
    });
  }

  subscribe(id: string) {
    this.socket.send(JSON.stringify({ type: 'subscribe', symbol: id }));
  }

  unsubscribe(id: string) {
    this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol: id }));
  }

  close() {
    this.ids.forEach((id) => this.unsubscribe(id));
    this.socket.close();
  }
}

export default TickerWebSocket;
