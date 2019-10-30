import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ProductListItem from './ProductListItem';
import { getUtProduct } from '../../../../test/helper-objects';
import { formatCurrency } from '../../../util/numberUtils';

describe('ProductList item ', () => {
  const renderComponent = (product = getUtProduct(), quantity = 2, onButtonClick = () => {}) => {
    return {
      ...render(
        <table>
          <tbody>
            <ProductListItem product={product} quantity={quantity} onButtonClicked={onButtonClick} />
          </tbody>
        </table>
      ),
    };
  };

  test('it renders by default', () => {
    const product = getUtProduct();
    const { container, getByLabelText, getByAltText } = renderComponent(product);

    const tableRow = container.querySelector('tr');

    expect(tableRow).toBeInTheDocument();

    const imageAlt = getByAltText(product.title);
    expect(imageAlt).toBeInTheDocument();
    expect(imageAlt.getAttribute('src')).toBe(product.image);

    const titleHeaderTag = container.querySelector('h5').innerHTML;
    expect(titleHeaderTag).toBe(product.title);

    const skuSpan = container.getElementsByTagName('span')[0];
    expect(skuSpan.innerHTML).toBe(product.sku);

    const priceSpan = container.getElementsByClassName('money')[0];
    expect(priceSpan.innerHTML).toContain(formatCurrency(product.price));

    const button = getByLabelText(/remove/i);
    const iTag = button.querySelector('i');
    expect(iTag).toBeInTheDocument();
    expect(iTag).toHaveClass('fa fa-trash');
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
