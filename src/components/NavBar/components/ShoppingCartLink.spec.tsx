import React from 'react';
import { renderWithRedux } from '../../../../test/render-utils';
import { getUtProduct, getPellentesqueProduct } from '../../../../test/helper-objects';

import ShoppingCartLink from './ShoppingCartLink';

describe('Shopping cart notification link', () => {
  function renderComponent(initialState = {}) {
    const result = renderWithRedux(<ShoppingCartLink />, { initialState });

    return {
      ...result,
    };
  }
  test('it renders with the text 0', () => {
    const { container, getByText } = renderComponent();

    const cart = container.getElementsByTagName('a')[0];
    const cartCount = getByText(/(0)/);

    expect(cart).toBeInTheDocument();
    expect(cartCount).toBeInTheDocument();
  });

  test('it adds one to cart when product is added', () => {
    const utProduct = getUtProduct();
    const initState = {
      cartProducts: {
        [utProduct.id]: utProduct,
      },
    };

    const { getByText } = renderComponent(initState);
    const cartCount = getByText(/(1)/);

    expect(cartCount).toBeInTheDocument();
  });
});
