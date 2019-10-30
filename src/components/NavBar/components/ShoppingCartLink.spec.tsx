import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithReduxRouter } from '../../../../test/render-utils';
import { getUtProduct } from '../../../../test/helper-objects';

import ShoppingCartLink from './ShoppingCartLink';

describe('Shopping cart notification link', () => {
  function renderComponent(initialState = {}, route = '/', className = '') {
    const result = renderWithReduxRouter(<ShoppingCartLink className={className} />, { route }, { initialState });

    return {
      ...result,
    };
  }

  test('it renders with the text 0', () => {
    const { container, getByText } = renderComponent();

    const cart = container.getElementsByTagName('a')[0];
    getByText(/(0)/);

    expect(cart).toBeInTheDocument();
  });

  test('it adds one to cart when product is added', () => {
    const utProduct = getUtProduct();
    const initState = {
      cartProducts: {
        [utProduct.id]: { ...utProduct, count: 1 },
      },
    };

    const { getByText } = renderComponent(initState);
    getByText(/(1)/);
  });

  test('it displays the total amount of products in the cart', () => {
    const utProduct = getUtProduct();
    const initState = {
      cartProducts: {
        [utProduct.id]: { ...utProduct, count: 2 },
      },
    };

    const { getByText } = renderComponent(initState);
    getByText(/(2)/);
  });

  test('it renders an icon', () => {
    const { container } = renderComponent();
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fa', 'fa-shopping-cart');
  });

  test('it navigates to /checkout after clicking', () => {
    const { history, container } = renderComponent();

    const link = container.querySelector('a');
    fireEvent.click(link);

    expect(history.location).toEqual(
      expect.objectContaining({
        pathname: '/checkout',
      })
    );
  });

  test('it passes a className prop as an attribute', () => {
    const className = 'test';
    const { container } = renderComponent({}, '/', className);

    const link = container.querySelector('div');

    expect(link).toHaveClass(className);
  });
});
