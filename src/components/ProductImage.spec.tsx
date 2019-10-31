import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Product from '../models/Product';
import ProductImage from './ProductImage';

describe('Product image component', () => {
  function generateProduct() {
    return {
      id: 1,
      title: 'Test product',
      sku: 'abc-123',
      price: 4.2,
    } as Product;
  }

  function renderComponent(product: Product) {
    return render(<ProductImage product={product} />);
  }

  it('renders by default', () => {
    const product = generateProduct();
    const { getByAltText } = renderComponent(product);

    const img = getByAltText(product.title);
    expect(img).toHaveAttribute('src', 'https://dummyimage.com/300x300.png/dddddd/000000');
  });

  it('renders product image if present', () => {
    const product = {
      ...generateProduct(),
      image: 'https//example.com/image.jpg',
    };
    const { getByAltText } = renderComponent(product);

    const img = getByAltText(product.title);
    expect(img).toHaveAttribute('src', product.image);
  });
});
