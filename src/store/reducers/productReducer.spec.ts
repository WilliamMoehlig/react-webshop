import reducer from './productReducer';
import { addProduct, deleteProduct } from '../actions/productActions';
import Product from '../../models/Product';

describe('Product reducer', () => {
  function getPellentesqueProduct(): Product {
    return {
      id: 1,
      sku: '254267942-8',
      title: 'pellentesque',
      desc: 'Donec posuere metus vitae ipsum.',
      stocked: true,
      basePrice: 16.63,
      price: 16.63,
    };
  }

  function getUtProduct(): Product {
    return {
      id: 2,
      sku: '253267343-5',
      title: 'ut',
      desc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere ácubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
      image: 'https://dummyimage.com/300x300.png/cc0000/ffffff',
      stocked: false,
      basePrice: 13.72,
      price: 6.31,
    };
  }

  test('it is empty by default', () => {
    const state = reducer();

    expect(state).toStrictEqual({});
  });

  test('it reduces ADD_PRODUCT', () => {
    const initialState = {};
    const product = getPellentesqueProduct();

    const state = reducer(initialState, addProduct(product));

    expect(state).toEqual({
      [product.id]: product,
    });
    expect(initialState).toEqual({});
  });

  test('it reduces ADD_PRODUCT with existing state', () => {
    const ut = getUtProduct();
    const pellentesque = getPellentesqueProduct();

    const initialState = {
      [ut.id]: ut,
    };

    const state = reducer(initialState, addProduct(pellentesque));

    expect(state).toEqual({
      ...initialState,
      [pellentesque.id]: pellentesque,
    });
  });

  test('it reduces DELETE_PRODUCT with existing state', () => {
    const ut = getUtProduct();
    const pellentesque = getPellentesqueProduct();

    const initialState = {
      [ut.id]: ut,
      [pellentesque.id]: pellentesque,
    };

    const state = reducer(initialState, deleteProduct(pellentesque.id));

    expect(state).toEqual({
      [ut.id]: ut,
    });
    expect(initialState).toEqual({ [ut.id]: ut, [pellentesque.id]: pellentesque });
  });
});
