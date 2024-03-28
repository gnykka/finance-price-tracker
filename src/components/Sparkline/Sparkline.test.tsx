import React from 'react';
import { render, screen } from '@testing-library/react';
import Sparkline from './Sparkline';

describe('Sparkline', () => {
  test('it renders correctly with positive change', () => {
    const mockHistory = [
      { date: '', close: 100, high: 0, low: 0, open: 0 },
      { date: '', close: 150, high: 0, low: 0, open: 0 },
      { date: '', close: 200, high: 0, low: 0, open: 0 },
    ];
    render(<Sparkline history={mockHistory} width={100} height={50} />);

    const polyline = screen.getByTestId('sparkline');

    expect(polyline).toHaveClass('stroke-green-800');
    expect(polyline).toHaveAttribute('points');
  });

  test('it renders correctly with negative change', () => {
    const mockHistory = [
      { date: '', close: 200, high: 0, low: 0, open: 0 },
      { date: '', close: 150, high: 0, low: 0, open: 0 },
      { date: '', close: 100, high: 0, low: 0, open: 0 },
    ];
    render(<Sparkline history={mockHistory} width={100} height={50} />);

    const polyline = screen.getByTestId('sparkline');

    expect(polyline).toHaveClass('stroke-red-800');
    expect(polyline).toHaveAttribute('points');
  });
});
