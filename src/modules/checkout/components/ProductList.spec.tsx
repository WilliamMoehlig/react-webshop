import React from 'react';
import { within } from '@testing-library/react';

import { renderWithReduxRouter } from '../../../../test/render-utils';
import ProductList from './ProductList';

describe('ProductList', () => {
  const renderComponent = () => {
    const result = renderWithReduxRouter(<ProductList />);
    return {
      ...result,
      getTableHeader: () => result.container.querySelector('thead'),
    };
  };

  test('it renders productlist', () => {
    const { getByRole } = renderComponent();

    const productList = getByRole('table');

    expect(productList).toBeInTheDocument();
  });

  test('table head has product, price, quantity and remove', () => {
    const { getTableHeader } = renderComponent();

    const { getByText } = within(getTableHeader());

    expect(getByText(/product/i)).toBeInTheDocument();
    expect(getByText(/price/i)).toBeInTheDocument();
    expect(getByText(/quantity/i)).toBeInTheDocument();
    expect(getByText(/remove/i)).toBeInTheDocument();
  });
});
