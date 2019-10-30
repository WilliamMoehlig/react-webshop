import ProductCollection from './ProductCollection';

export interface State {
  todos?: Record<number, any>;
  notifications?: Record<number, any>;
  cartProducts?: Record<number, ProductCollection>;
}
