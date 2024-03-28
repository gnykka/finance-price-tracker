import React from 'react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreContext } from '../../storeContext';
import DetailsPage from './DetailsPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockStore = {
  tickers: {
    TEST1: {
      id: 'TEST1',
      name: 'Test Ticker 1',
      price: 100.1234,
      change: 5.25,
      volume: 100000,
      history: [],
    },
  },
  updateTicker: () => {},
};

describe('DetailsPage', () => {
  test('it renders the component with ticker data', () => {
    const ticker = Object.values(mockStore.tickers)[0];

    (useParams as jest.Mock).mockReturnValue({ tickerId: ticker.id });

    render(
      <BrowserRouter>
        <StoreContext.Provider value={mockStore}>
          <DetailsPage />
        </StoreContext.Provider>
      </BrowserRouter>,
    );

    const title = screen.getByText(ticker.name);

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');

    const dashboardLink = screen.getByText('Dashboard');

    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', "/");

    expect(screen.getByText(ticker.id)).toBeInTheDocument();

    expect(screen.getByText(`$${ticker.price.toFixed(4)}`)).toBeInTheDocument();
    expect(screen.getByText(`${ticker.change.toFixed(2)}%`)).toBeInTheDocument();
    expect(screen.getByText(Intl.NumberFormat().format(ticker.volume))).toBeInTheDocument();

    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });
});
