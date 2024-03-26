import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
    const ticker = store.tickers[0];

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
});
