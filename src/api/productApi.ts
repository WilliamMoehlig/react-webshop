/* eslint-disable import/prefer-default-export */

import api from './api';

import Product from '../models/Product';

export async function getProducts({ limit = 12, page = 1, sort = 'title', order = 'asc' } = {}): Promise<{
  products: Product[];
  total: number;
}> {
  const { data, headers } = await api.get('/products', {
    params: {
      _limit: limit,
      _page: page,
      _sort: sort,
      _order: order,
    },
  });

  return { products: data as Product[], total: Number(headers['x-total-count']) };
}
