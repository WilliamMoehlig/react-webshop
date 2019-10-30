import Product from './Product';

export interface State<T> {
  [propName: string]: Record<number, T>;
}
