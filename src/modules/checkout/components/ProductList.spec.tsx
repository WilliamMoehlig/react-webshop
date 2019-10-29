import React from 'react';
import '@testing-library/dom';
import { renderWithReduxRouter } from '../../../../test/render-utils';
import ProductList from './ProductList';
import { getByText } from '@testing-library/dom';

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

    const productTableHeader = getTableHeader();

    expect(getByText(productTableHeader, /product/i)).toBeInTheDocument();
    expect(getByText(productTableHeader, /price/i)).toBeInTheDocument();
    expect(getByText(productTableHeader, /quantity/i)).toBeInTheDocument();
    expect(getByText(productTableHeader, /remove/i)).toBeInTheDocument();
  });
});
