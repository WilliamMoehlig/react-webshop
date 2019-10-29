import reducer from './productReducer';
import { addProduct, deleteProduct } from '../actions/productActions';
import { getUtProduct, getPellentesqueProduct } from '../../../test/helper-objects';

describe('Product reducer', () => {
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
