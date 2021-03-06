import React from 'react';
import { within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Product from './Product';
import IProduct from '../../../models/Product';
import { renderWithRedux } from '../../../../test/render-utils';

describe('Product component', () => {
  function renderComponent({ product, initialState = {} }) {
    const result = renderWithRedux(<Product product={product} />, { initialState });

    return {
      ...result,
    };
  }

  function generateProduct(): IProduct {
    return {
      id: 1,
      title: 'test',
      sku: '639538639-5',
      price: 78.193,
    };
  }

  it('should render by default', () => {
    const product = generateProduct();
    const { getByAltText, getByRole, container, getByText } = renderComponent({ product });

    const img = getByAltText(product.title);
    expect(img).toHaveAttribute('src', 'https://dummyimage.com/300x300.png/dddddd/000000');

    getByText(product.title);

    expect(container.querySelector('.card-text')).not.toBeInTheDocument();

    const list = getByRole('list');
    const sku = within(list).getByText(product.sku);
    expect(within(sku).queryByText(/sku:/i)).toBeInTheDocument();

    const money = getByText(`€ ${product.price.toFixed(2).replace('.', ',')}`);
    expect(money).toHaveClass('money', 'money--new');

    const stockBadge = getByText(/out of stock/i);
    expect(stockBadge).toHaveClass('badge', 'badge-danger');

    const addToCartButton = getByRole('button');
    expect(addToCartButton).toHaveTextContent(/add to cart/i);
    const svg = container.querySelector('button svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('fa-cart-plus');

    const desc = container.querySelector('.card-text');
    expect(desc).not.toBeInTheDocument();

    const moneyOld = container.querySelector('.money--old');
    expect(moneyOld).not.toBeInTheDocument();

    const discount = container.querySelector('.product-discount-label');
    expect(discount).not.toBeInTheDocument();
  });

  it('should render a description if present', () => {
    const product = {
      ...generateProduct(),
      desc: 'This is a test.',
    };
    const { container } = renderComponent({ product });
    const desc = container.querySelector('.card-text');
    expect(desc).toHaveTextContent(product.desc);
  });

  it('should render a custom image if present', () => {
    const product = {
      ...generateProduct(),
      image: 'http://example.com/100.jpg',
    };
    const { getByAltText } = renderComponent({ product });

    const img = getByAltText(product.title);
    expect(img).toHaveAttribute('src', product.image);
  });

  it('should render a base price and discount if present and higher than price', () => {
    const product = {
      ...generateProduct(),
      price: 50,
      basePrice: 100,
    };
    const { getByText, container } = renderComponent({ product });

    const money = getByText(`€ ${product.basePrice.toFixed(2).replace('.', ',')}`);
    expect(money).toHaveProperty('tagName', expect.stringMatching(/del/i));
    expect(money.parentElement).toHaveClass('money', 'money--old');

    const discount = container.querySelector('.product-discount-label');
    expect(discount).toBeInTheDocument();
    expect(discount).toHaveTextContent('-50%');
  });

  it('should not render a base price and discount if present and lower than or equal to price', () => {
    const product = {
      ...generateProduct(),
      price: 50,
      basePrice: 50,
    };
    const { container } = renderComponent({ product });

    const moneyOld = container.querySelector('.money--old');
    expect(moneyOld).not.toBeInTheDocument();

    const discount = container.querySelector('.product-discount-label');
    expect(discount).not.toBeInTheDocument();
  });

  it('should render in stock badge if product is stocked', () => {
    const product = {
      ...generateProduct(),
      stocked: true,
    };
    const { getByText } = renderComponent({ product });

    const stockBadge = getByText(/in stock/i);
    expect(stockBadge).toHaveClass('badge', 'badge-success');
  });

  it('should be able to add a product on click to state (redux)', () => {
    const product = {
      ...generateProduct(),
      stocked: true,
    };

    const { getByRole, store } = renderComponent({ product });
    const button = getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(store.getState()).toHaveProperty('cartProducts', { [product.id]: { ...product, count: 2 } });
  });

  it("should not add a product if it's out of stock", () => {
    const product: IProduct = {
      ...generateProduct(),
      stocked: false,
    };

    const { getByRole, store } = renderComponent({ product });

    const button = getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(store.getState()).not.toHaveProperty('cartProducts', { [product.id]: { ...product, count: 1 } });
  });
});
