import Product from './Product';

export interface State {
  todos?: Record<number, any>;
  notifications?: Record<number, any>;
  cartProducts?: Record<number, Product>;
}
