import React from 'react';
import { render } from '@testing-library/react';

import ProductListItem from './ProductListItem';

describe('ProductList item ', () => {
  test('it renders', () => {
    const { container } = render(<ProductListItem />);
    expect(container.querySelector('tr')).toBeInTheDocument();
  });

  test('it has image, title, sku, price, quantity', () => {});
});
