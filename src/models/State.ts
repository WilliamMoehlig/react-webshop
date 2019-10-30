export interface State<T> {
  [propName: string]: Record<number, T>;
}
