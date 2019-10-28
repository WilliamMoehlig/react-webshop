import nock from 'nock';
import { getProducts } from './productApi';
import Product from '../models/Product';

describe('Product API', () => {
  function fakeApi() {
    return nock('http://localhost:3000');
  }

  describe('Get products', () => {
    function getDefaultParameters() {
      return {
        _limit: 12,
        _page: 1,
        _sort: 'title',
        _order: 'asc',
      };
    }

    it('should return product in right shape', async () => {
      const response = [
        {
          id: 1,
          sku: '254267942-8',
          title: 'pellentesque',
          price: 16.63,
        },
        {
          id: 2,
          sku: '253267343-5',
          title: 'ut',
          desc:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere ácubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
          image: 'https://dummyimage.com/300x300.png/cc0000/ffffff',
          stocked: false,
          basePrice: 13.72,
          price: 6.31,
        },
      ];

      fakeApi()
        .get('/products')
        .query({ ...getDefaultParameters() })
        .reply(200, response);

      const returnedProducts = response.map(product => product as Product);

      const products = await getProducts();

      expect(products).toStrictEqual(returnedProducts);
    });

    it('should call the api with the default parameters', async () => {
      fakeApi()
        .get('/products')
        .query({ ...getDefaultParameters() })
        .reply(200, []);

      await getProducts();
    });

    it('should limit the amount of products', async () => {
      fakeApi()
        .get('/products')
        .query({ ...getDefaultParameters(), _limit: 15 })
        .reply(200, []);

      await getProducts({ limit: 15 });
    });

    it('should show items from a specified page', async () => {
      fakeApi()
        .get('/products')
        .query({ ...getDefaultParameters(), _page: 2 })
        .reply(200, []);

      await getProducts({ page: 2 });
    });

    it('sort items by a specified property', async () => {
      fakeApi()
        .get('/products')
        .query({ ...getDefaultParameters(), _sort: 'price', _order: 'desc' })
        .reply(200, []);

      await getProducts({ sort: 'price', order: 'desc' });
    });
  });
});
