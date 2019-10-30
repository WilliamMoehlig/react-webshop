import React from 'react';
import { render } from '@testing-library/react';

import Checkout from './Checkout';

describe('Checkout module', () => {
  test('it renders', () => {
    const { getByRole } = render(<Checkout />);

    const header = getByRole('heading');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/basket/i);
  });

  test('it is possible to write a note', () => {});
});
