import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingCover from './LoadingCover';

describe('LoadingCover', () => {
  test('it shows and hides the cover', async () => {
    const { rerender } = render(<LoadingCover loading={true} />);

    expect(screen.getByTestId('loading-cover')).toHaveClass('opacity-100 pointer-events-auto');

    rerender(<LoadingCover loading={false} />);

    expect(screen.getByTestId('loading-cover')).toHaveClass('opacity-0 pointer-events-none');
  });
});
