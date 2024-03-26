import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('it renders the 404 page', async () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Ticker Not Found/i)).toBeInTheDocument();
  });
});
