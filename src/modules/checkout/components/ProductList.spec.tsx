import React from 'react';
import { renderWithReduxRouter } from '../../../../test/render-utils';
import ProductList from './ProductList';

describe('ProductList', () => {
  const renderComponent = () => {
    return {
      ...renderWithReduxRouter(<ProductList />),
    };
  };

  test('it renders productlist', () => {
    const { getByRole } = renderComponent();

    const productList = getByRole('table');

    expect(productList).toBeInTheDocument();
  });
});
