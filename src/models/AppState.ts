import ProductCollection from './ProductCollection';

export interface AppState {
  todos: Record<number, unknown>;
  notifications: Record<number, unknown>;
  cartProducts: Record<number, ProductCollection>;
}
