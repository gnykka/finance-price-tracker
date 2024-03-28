import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { StoreContext } from '../../storeContext';
import * as ApiClient from '../../apiClient';
import store from '../../store';
import App from './App';

const mockStore = {
  tickers: {
    TEST1: { id: 'TEST1', name: 'Test Ticker 1' },
    TEST2: { id: 'TEST2', name: 'Test Ticker 2' },
  },
  updateTicker: () => {},
};

describe('App.jsx', () => {
  test('it renders DashboardPage for route "/"', () => {
    window.history.pushState({}, '', '/');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Tickers List/i)).toBeInTheDocument();
    expect(window.location.pathname).toEqual('/');
  });

  test('it renders DashboardDetailsPage for route "/:tickerId"', () => {
    const ticker = Object.values(store.tickers)[0];

    window.history.pushState({}, '', `/${ticker.id}`);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(ticker.name)).toBeInTheDocument();
    expect(window.location.pathname).toEqual(`/${ticker.id}`);
  });

  test('it redirects to 404 page for other routes', async () => {
    window.history.pushState({}, '', '/test');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Ticker Not Found/i)).toBeInTheDocument();
    expect(window.location.pathname).toEqual('/404');
  });

  test('it loads and displays ticker data', async () => {
    jest.spyOn(ApiClient, 'getTickerQuotes').mockResolvedValue([
      { close: 100.1234, previousClose: 99.5, change_p: 5.25, volume: 100000 },
      { close: 10.1, previousClose: 12.356, change_p: -15.3, volume: 1150000 },
    ]);

    render(
      <BrowserRouter>
        <StoreContext.Provider value={mockStore}>
          <App />
        </StoreContext.Provider>
      </BrowserRouter>,
    );

    const cover = screen.getByTestId('loading-cover');

    expect(cover).toHaveClass('opacity-100 pointer-events-auto');

    await waitFor(() => expect(cover).toHaveClass('opacity-0 pointer-events-none'));

    expect(screen.getByText('$100.12')).toBeInTheDocument();
    expect(screen.getByText('$10.10')).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('it updates ticker data with WebSocket', async () => {});
});
