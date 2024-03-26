import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { StoreContext } from '../../storeContext';
import DashboardPage from './DashboardPage';

const mockStore = {
  tickers: [
    { id: 'TEST1', name: 'Test Ticker 1', price: 100.1234, change: 5.25, volume: 100000 },
    { id: 'TEST2', name: 'Test Ticker 2', price: 10.1, change: -15.3, volume: 1150000 },
  ],
  updateTicker: () => {},
};

describe('DashboardPage', () => {
  test('it renders the component with tickers data', () => {
    render(
      <BrowserRouter>
        <StoreContext.Provider value={mockStore}>
          <DashboardPage />
        </StoreContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Tickers List')).toBeInTheDocument();

    expect(screen.getByText('TEST1')).toBeInTheDocument();
    expect(screen.getByText('Test Ticker 1')).toBeInTheDocument();
    expect(screen.getByText('TEST2')).toBeInTheDocument();
    expect(screen.getByText('Test Ticker 2')).toBeInTheDocument();

    expect(screen.getByText('$100.12')).toBeInTheDocument();
    expect(screen.getByText('5.25%')).toBeInTheDocument();
    expect(screen.getByText('100,000')).toBeInTheDocument();

    expect(screen.getByText('$10.10')).toBeInTheDocument();
    expect(screen.getByText('-15.30%')).toBeInTheDocument();
    expect(screen.getByText('1,150,000')).toBeInTheDocument();
  });
});
