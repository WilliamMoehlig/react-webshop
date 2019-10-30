import React from 'react';
import { render } from '@testing-library/react';

import Checkout from './Checkout';

jest.mock('./components/ProductList', () => () => {
  return <div data-testid="product-list-component" />;
});

jest.mock('./components/Instructions', () => () => {
  return <div data-testid="instructions-component" />;
});

jest.mock('./components/Overview', () => () => {
  return <div data-testid="overview-component" />;
});

describe('Checkout module', () => {
  test('it renders', () => {
    const { getByRole, getByTestId } = render(<Checkout />);

    const header = getByRole('heading');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/basket/i);

    getByTestId('product-list-component');
    getByTestId('instructions-component');
    getByTestId('overview-component');
  });
});
