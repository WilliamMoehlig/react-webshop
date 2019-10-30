import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ProductListItem from './ProductListItem';
import { getUtProduct } from '../../../../test/helper-objects';

describe('ProductList item ', () => {
  const renderComponent = (product = getUtProduct(), quantity = 2, onButtonClick = () => {}) => {
    return {
      ...render(<ProductListItem product={product} quantity={quantity} onButtonClicked={onButtonClick} />),
    };
  };

  test('it renders', () => {
    const { container } = renderComponent();

    const tableRow = container.querySelector('tr');

    expect(tableRow).toBeInTheDocument();
  });

  test('it has a product as property and renders image, title, sku, price', () => {
    const product = getUtProduct();
    const { getByAltText, container } = renderComponent(product);

    const imageAlt = getByAltText(product.title);
    const titleHeaderTag = container.querySelector('h5').innerHTML;
    const skuSpan = container.getElementsByTagName('span')[0];
    const priceSpan = container.getElementsByClassName('money')[0];

    expect(imageAlt).toBeInTheDocument();
    expect(imageAlt.getAttribute('src')).toBe(product.image);
    expect(titleHeaderTag).toBe(product.title);
    expect(skuSpan.innerHTML).toBe(product.sku);
    expect(priceSpan.innerHTML).toContain(product.price);
  });

  test('it gets quantity as a property and renders it', () => {
    const product = getUtProduct();
    const amountOfProduct = 3;
    const { container } = renderComponent(product, amountOfProduct);

    const quantity = container.getElementsByClassName('quantity')[0];

    expect(quantity.innerHTML).toEqual(amountOfProduct.toString());
  });

  test('it calls the delete function on button click that has an icon', () => {
    const mockFunction = jest.fn();
    const product = getUtProduct();
    const { getByLabelText, container } = renderComponent(product, 2, mockFunction);

    const button = getByLabelText(/remove/i);
    const iTags = container.getElementsByTagName('i');
    const icon = Object.values(iTags).find(t => t.className === 'fa fa-trash');

    fireEvent.click(button);
    expect(mockFunction).toBeCalled();
    expect(icon).toBeInTheDocument();
  });
});
