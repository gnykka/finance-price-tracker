import { makeAutoObservable } from 'mobx';
import { Ticker } from './types';

class Store {
  tickers: Ticker[] = [
    { id: 'AAPL', name: 'Apple Inc.' },
    { id: 'GOOGL', name: 'Alphabet Inc.' },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
