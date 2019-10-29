import React from 'react';
import { waitForDomChange, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from '../../../test/render-utils';

import Products from './Products';

import { getProducts } from '../../api/productApi';
import IProduct from '../../models/Product';

jest.mock('../../api/productApi');

describe('Products module', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  function generateProducts(count = 12): IProduct[] {
    return [...Array(count + 1).keys()].slice(1).map(id => ({
      id,
      sku: `sku-${id}`,
      title: `Test ${id}`,
      price: 2 + id,
    }));
  }

  function renderComponent({ route = '/products' } = {}) {
    const result = renderWithRouter(<Products />, { route });

    return { ...result };
  }

  function toBeALocation({ hash = '', pathname = '/', search = '', state = undefined } = {}) {
    return expect.objectContaining({
      hash,
      pathname,
      search,
      state,
    });
  }

  it('should render by default', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length,
    });

    const { getByText, queryByText } = renderComponent();

    await waitForDomChange();

    const title = getByText('Web Shop');
    expect(title).toHaveProperty('tagName', expect.stringMatching(/h1/i));

    const prev = getByText(/previous/i);
    expect(prev).toHaveClass('disabled');
    const next = getByText(/next/i);
    expect(next).toHaveClass('disabled');

    products.forEach(product => {
      expect(queryByText(product.title)).toBeInTheDocument();
    });
  });

  it('should enable the previous button if page is > 1', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length * 2,
    });

    const { getByText } = renderComponent({ route: '/products?page=2' });

    await waitForDomChange();

    const prev = getByText(/previous/i);
    expect(prev).not.toHaveClass('disabled');
    expect(prev).toHaveAttribute('href', expect.stringMatching(/\/products\?page=1/i));
  });

  it('should enable the next button if there are more pages', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length * 2,
    });

    const { getByText } = renderComponent({ route: '/products?page=1' });

    await waitForDomChange();

    const next = getByText(/next/i);
    expect(next).not.toHaveClass('disabled');
    expect(next).toHaveAttribute('href', expect.stringMatching(/\/products\?page=2/i));
  });

  it('should retrieve the correct products', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length * 2,
    });

    renderComponent({ route: '/products?page=2' });

    await waitForDomChange();

    expect(mock).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));
  });

  it('should redirect to a not found page if the page is below 1', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length,
    });

    const { history } = renderComponent({ route: '/products?page=0' });

    await waitForDomChange();

    expect(history).toHaveProperty(
      'location',
      toBeALocation({
        pathname: '/404',
      })
    );
  });

  it('should redirect to a not found page if the page is above the total amount of pages', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length * 2,
    });

    const { history } = renderComponent({ route: '/products?page=3' });

    await waitForDomChange();

    expect(history).toHaveProperty(
      'location',
      toBeALocation({
        pathname: '/404',
      })
    );
  });

  it('should navigate to the previous page if previous button is clicked', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length * 2,
    });

    const { getByText, history } = renderComponent({ route: '/products?page=2' });

    await wait(() => {
      const prev = getByText(/previous/i);
      fireEvent.click(prev);

      expect(history).toHaveProperty(
        'location',
        toBeALocation({
          pathname: '/products',
          search: '?page=1',
        })
      );
    });
  });

  it('should navigate to the next page if next button is clicked', async () => {
    const products = generateProducts();

    const mock = getProducts as jest.Mock;
    mock.mockResolvedValue({
      products,
      total: products.length * 2,
    });

    const { getByText, history } = renderComponent({ route: '/products?page=1' });

    await wait(() => {
      const next = getByText(/next/i);
      fireEvent.click(next);

      expect(history).toHaveProperty(
        'location',
        toBeALocation({
          pathname: '/products',
          search: '?page=2',
        })
      );
    });
  });
});
