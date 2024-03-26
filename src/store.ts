import { makeAutoObservable } from 'mobx';
import { Ticker } from './types';

class Store {
  tickers: Ticker[] = [
    { id: 'AAPL', name: 'Apple Inc.', price: 0 },
    { id: 'GOOGL', name: 'Alphabet Inc.', price: 0 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updatePrice(tickerId: string, newPrice: number) {
    const ticker = this.tickers.find((t) => t.id === tickerId);

    if (ticker) {
      ticker.price = newPrice;
    }
  }
}

const store = new Store();

export default store;
