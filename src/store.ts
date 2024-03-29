import { makeAutoObservable } from 'mobx';
import { Ticker } from './types';

class Store {
  // Initial store contains the tickers that we observe
  tickers: Record<string, Ticker> = {
    MSFT: { id: 'MSFT', name: 'Microsoft Corporation' },
    AAPL: { id: 'AAPL', name: 'Apple Inc.' },
    NVDA: { id: 'NVDA', name: 'NVIDIA Corporation' },
    GOOG: { id: 'GOOG', name: 'Alphabet Inc.' },
    AMZN: { id: 'AMZN', name: 'Amazon.com, Inc.' },
    META: { id: 'META', name: 'Meta Platforms, Inc.' },
    TSLA: { id: 'TSLA', name: 'Tesla, Inc.' },
    AMD: { id: 'AMD', name: 'Advanced Micro Devices, Inc.' },
    BABA: { id: 'BABA', name: 'Alibaba Group Holding Limited' },
    INTC: { id: 'INTC', name: 'Intel Corporation' },
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Method to update store value with any new data from APIs
  updateTicker(tickerId: string, newData: Partial<Ticker>) {
    if (!this.tickers[tickerId]) return;

    this.tickers[tickerId] = { ...this.tickers[tickerId], ...newData };
  }
}

const store = new Store();

export default store;
