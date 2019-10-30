import { ADD_PRODUCT, DELETE_PRODUCT } from '../actionTypes';
import Product from '../../models/Product';
import { ActionWithPayload } from '../../models/Action';

export function addProduct(product: Product): ActionWithPayload<Product> {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export function deleteProduct(id: number): ActionWithPayload<number> {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
}
