import React from 'react';
import { within } from '@testing-library/react';
import Overview from './Overview';
import { renderWithRedux } from '../../../../test/render-utils';
import ProductCollection from '../../../models/ProductCollection';

describe('Overview', () => {
  function renderComponent(initialState = {}) {
    const renderResult = renderWithRedux(<Overview />, { initialState });

    return {
      ...renderResult,
    };
  }

  test('it renders by default', () => {
    const { getByText, getByRole, getByTestId } = renderComponent();

    const title = getByText(/order summary/i);
    expect(title).toBeInTheDocument();

    const subtotal = getByTestId('subtotal');
    const { getByText: getByTextWithinSubtotal } = within(subtotal);
    getByTextWithinSubtotal(/order subtotal/i);
    getByTextWithinSubtotal('€ 0,00');

    const shippingHandling = getByTestId('shipping-handling');
    const { getByText: getByTextWithinShippingHandling } = within(shippingHandling);
    getByTextWithinShippingHandling(/shipping and handling/i);
    getByTextWithinShippingHandling('€ 10,00');
    getByTextWithinShippingHandling((_, element) => element.tagName.toLowerCase() === 'del');

    const total = getByTestId('total');
    const { getByText: getByTextWithinTotal } = within(total);
    getByTextWithinTotal(/total/i);
    getByTextWithinTotal('€ 0,00');

    const checkoutButton = getByRole('button');
    expect(checkoutButton).toHaveTextContent(/proceed to checkout/i);
  });

  test('it renders the correct prices when subtotal is lower than € 40', () => {
    const product1: ProductCollection = {
      id: 1,
      sku: '12345',
      title: 'Zwierige-Pret-Boulet',
      price: 3.9,
      count: 1,
    };
    const product2: ProductCollection = {
      id: 2,
      sku: '54321',
      title: 'Hollands Kippetje De Luxe',
      price: 3.0,
      count: 2,
    };
    const initialState = {
      cartProducts: {
        1: product1,
        2: product2,
      },
    };
    const { getByTestId } = renderComponent(initialState);

    const subtotal = getByTestId('subtotal');
    const { getByText: getByTextWithinSubtotal } = within(subtotal);
    getByTextWithinSubtotal('€ 9,90');

    const shippingHandling = getByTestId('shipping-handling');
    const { getByText: getByTextWithinShippingHandling, queryByText: queryByTextWithinShippingHandling } = within(
      shippingHandling
    );
    getByTextWithinShippingHandling('€ 10,00');
    expect(
      queryByTextWithinShippingHandling((_, element) => element.tagName.toLowerCase() === 'del')
    ).not.toBeInTheDocument();

    const total = getByTestId('total');
    const { getByText: getByTextWithinTotal } = within(total);
    getByTextWithinTotal('€ 19,90');
  });

  test('it renders the correct prices when subtotal is higher than € 40', () => {
    const product1: ProductCollection = {
      id: 1,
      sku: '12345',
      title: 'Ultra Super Mega Maxi Zwierige-Pret-Boulet',
      price: 30.9,
      count: 1,
    };
    const product2: ProductCollection = {
      id: 2,
      sku: '54321',
      title: 'Ultra Super Mega Maxi Hollands Kippetje De Luxe',
      price: 30.0,
      count: 2,
    };
    const initialState = {
      cartProducts: {
        1: product1,
        2: product2,
      },
    };
    const { getByTestId } = renderComponent(initialState);

    const subtotal = getByTestId('subtotal');
    const { getByText: getByTextWithinSubtotal } = within(subtotal);
    getByTextWithinSubtotal('€ 90,90');

    const shippingHandling = getByTestId('shipping-handling');
    const { getByText: getByTextWithinShippingHandling } = within(shippingHandling);
    getByTextWithinShippingHandling('€ 10,00');
    getByTextWithinShippingHandling((_, element) => element.tagName.toLowerCase() === 'del');

    const total = getByTestId('total');
    const { getByText: getByTextWithinTotal } = within(total);
    getByTextWithinTotal('€ 90,90');
  });
});
