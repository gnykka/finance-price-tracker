import { makeAutoObservable } from 'mobx';
import { Ticker } from './types';

class Store {
  tickers: Ticker[] = [
    { id: 'AAPL', name: 'Apple Inc.' },
    { id: 'GOOGL', name: 'Alphabet Inc.' },
    { id: 'MSFT', name: 'Microsoft Corp.' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateTicker(tickerId: string, newData: Partial<Ticker>) {
    const index = this.tickers.findIndex((t) => t.id === tickerId);

    if (index !== -1) {
      this.tickers[index] = { ...this.tickers[index], ...newData };
    }
  }
}

const store = new Store();

export default store;
