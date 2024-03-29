import React from 'react';
import { render, act } from '@testing-library/react';
import TickerPrice from './TickerPrice';

describe('TickerPrice', () => {
  jest.useFakeTimers();

  const getCellLayout = (price: number) => (
    <table>
      <tbody>
        <tr>
          <TickerPrice price={price} />
        </tr>
      </tbody>
    </table>
  );

  test('it initially renders without any highlight class', () => {
    const { container } = render(getCellLayout(100));
    const span = container.querySelector('span');

    expect(span).not.toHaveClass('bg-green-100', 'bg-red-100');
  });

  test('it adds green highlight class on price increase', () => {
    const { container, rerender } = render(getCellLayout(100));
    const span = container.querySelector('span');

    rerender(getCellLayout(150));

    expect(span).toHaveClass('bg-green-100');
    expect(span).not.toHaveClass('bg-red-100');
  });

  test('it adds red highlight class on price decrease', () => {
    const { container, rerender } = render(getCellLayout(150));
    const span = container.querySelector('span');

    rerender(getCellLayout(100));

    expect(span).toHaveClass('bg-red-100');
    expect(span).not.toHaveClass('bg-green-100');
  });

  test('it  removes highlight class after timeout', () => {
    const { container, rerender } = render(getCellLayout(100));

    rerender(getCellLayout(150));

    const span = container.querySelector('span');

    act(() => jest.runAllTimers());

    expect(span).not.toHaveClass('bg-green-100', 'bg-red-100');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
