import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { StoreProvider } from '../../storeContext';
import { TickerQuoteResponse, TickerHistoryItem } from '../../types';
import * as ApiClient from '../../apiClient';
import store from '../../store';
import App from './App';

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

  test('it loads and displays ticker quote and history data', async () => {
    const mockData: TickerQuoteResponse[] = [
      { close: 100.1234, previousClose: 99.5, change_p: 5.25, volume: 100000 },
      { close: 10.1, previousClose: 12.356, change_p: -15.3, volume: 1150000 },
    ];
    const mockHistoryData: TickerHistoryItem[] = [
      { date: '1', close: 108, high: 110, low: 105, open: 106 },
      { date: '2', close: 118, high: 120, low: 115, open: 116 },
    ];

    const updateTickerSpy = jest.spyOn(store, 'updateTicker');

    jest.spyOn(ApiClient, 'getTickerQuotes').mockResolvedValue(mockData);
    jest.spyOn(ApiClient, 'getTickerData').mockResolvedValue(mockHistoryData);

    window.history.pushState({}, '', '/');

    const res = render(
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>,
    );

    const cover = screen.getByTestId('loading-cover');

    expect(cover).toHaveClass('opacity-100 pointer-events-auto');

    await waitFor(() => expect(cover).toHaveClass('opacity-0 pointer-events-none'));

    mockData.forEach((item: TickerQuoteResponse, index: number) => {
      expect(updateTickerSpy).toHaveBeenCalledWith(Object.keys(store.tickers)[index], {
        price: item.close,
        prevPrice: item.previousClose,
        change: item.change_p,
        volume: item.volume,
      });
    });

    expect(updateTickerSpy).toHaveBeenCalledWith(expect.anything(), { history: mockHistoryData });

    expect(screen.getByText('$100.12')).toBeInTheDocument();
    expect(screen.getByText('$10.10')).toBeInTheDocument();
    expect(screen.getAllByTestId('sparkline').length).toEqual(Object.keys(store.tickers).length);

    jest.restoreAllMocks();
  });

  test('it updates ticker data with WebSocket', async () => {});
});
