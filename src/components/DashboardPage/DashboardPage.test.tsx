import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreContext } from '../../storeContext';
import DashboardPage from './DashboardPage';

const mockStore = {
  tickers: {
    TEST1: { id: 'TEST1', name: 'Test Ticker 1', price: 100.1234, change: 5.25, volume: 100000 },
    TEST2: { id: 'TEST2', name: 'Test Ticker 2', price: 10.1, change: -15.3, volume: 1150000 },
  },
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

    Object.values(mockStore.tickers).map((ticker) => {
      const detailsLink = screen.getByText(ticker.id);

      expect(detailsLink).toBeInTheDocument();
      expect(detailsLink).toHaveAttribute('href', `/${ticker.id}`);
      expect(screen.getByText(ticker.name)).toBeInTheDocument();

      expect(screen.getByText(`$${ticker.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`${ticker.change.toFixed(2)}%`)).toBeInTheDocument();
      expect(screen.getByText(Intl.NumberFormat().format(ticker.volume))).toBeInTheDocument();
    });
  });
});
