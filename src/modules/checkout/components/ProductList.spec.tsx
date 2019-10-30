import React from 'react';
import { within, fireEvent } from '@testing-library/react';

import { renderWithRedux } from '../../../../test/render-utils';
import ProductList from './ProductList';

import { getUtProduct, getPellentesqueProduct } from '../../../../test/helper-objects';

describe('ProductList', () => {
  const renderComponent = ({ initialState = {} } = {}) => {
    const result = renderWithRedux(<ProductList />, { initialState });
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

    const { getByText } = within(getTableHeader());

    expect(getByText(/product/i)).toBeInTheDocument();
    expect(getByText(/price/i)).toBeInTheDocument();
    expect(getByText(/quantity/i)).toBeInTheDocument();
    expect(getByText(/remove/i)).toBeInTheDocument();
  });

  it('renders the list of products', () => {
    const ut = getUtProduct();
    const pellentesque = getPellentesqueProduct();

    const { queryByAltText } = renderComponent({
      initialState: {
        cartProducts: {
          [ut.id]: {
            ...ut,
            count: 2,
          },
          [pellentesque.id]: {
            ...pellentesque,
            count: 3,
          },
        },
      },
    });

    expect(queryByAltText(ut.title)).toBeInTheDocument();
    expect(queryByAltText(pellentesque.title)).toBeInTheDocument();
  });

  it('deletes an item when the remove button is clicked', () => {
    const product = getUtProduct();

    const { getByLabelText, queryByAltText } = renderComponent({
      initialState: {
        cartProducts: {
          [product.id]: {
            ...product,
            count: 2,
          },
        },
      },
    });

    const button = getByLabelText(/remove/i);

    fireEvent.click(button);

    expect(queryByAltText(product.title)).not.toBeInTheDocument();
  });
});
