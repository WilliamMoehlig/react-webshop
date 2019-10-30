import React from 'react';
import { render } from '@testing-library/react';

import StockedLabel from './StockedLabel';

describe('StockedLabel component', () => {
  test('it renders when in stock', () => {
    const { container } = render(<StockedLabel stocked />);

    const span = container.querySelector('span');

    expect(span).toHaveClass('badge', 'badge-success');
    expect(span).toHaveTextContent('In Stock');
  });

  test('it renders when out of stock', () => {
    const { container } = render(<StockedLabel stocked={false} />);

    const span = container.querySelector('span');

    expect(span).toHaveClass('badge', 'badge-danger');
    expect(span).toHaveTextContent('Out of Stock');
  });
});
