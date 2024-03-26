import { makeAutoObservable } from 'mobx';
import { Ticker } from './types';

class Store {
  tickers: Ticker[] = [
    { id: 'MSFT', name: 'Microsoft Corporation' },
    { id: 'AAPL', name: 'Apple Inc.' },
    { id: 'NVDA', name: 'NVIDIA Corporation' },
    { id: 'GOOG', name: 'Alphabet Inc.' },
    { id: 'AMZN', name: 'Amazon.com, Inc.' },
    { id: 'META', name: 'Meta Platforms, Inc.' },
    { id: 'TSLA', name: 'Tesla, Inc.' },
    { id: 'AMD', name: 'Advanced Micro Devices, Inc.' },
    { id: 'BABA', name: 'Alibaba Group Holding Limited' },
    { id: 'INTC', name: 'Intel Corporation' },
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
