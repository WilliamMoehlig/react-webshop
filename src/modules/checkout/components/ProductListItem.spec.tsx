import React from 'react';

import { render, within } from '@testing-library/react';
import ProductListItem from './ProductListItem';

import { getUtProduct } from '../../../../test/helper-objects';

describe('ProductList item ', () => {
  const renderComponent = (product = getUtProduct()) => {
    return {
      ...render(<ProductListItem product={product} />),
    };
  };
  test('it renders', () => {
    const { container } = renderComponent();

    expect(container.querySelector('tr')).toBeInTheDocument();
  });

  test('it has a product as property and renders image, title, sku, price, quantity', () => {
    const product = getUtProduct();
    const { getByText, getByAltText, container } = renderComponent();

    expect(getByAltText(product.title)).toBeInTheDocument();
    expect(container.querySelector('h5').innerHTML).toBe(product.title);
    //todo: continue HERE
  });
});
