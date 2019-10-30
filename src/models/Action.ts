export interface Action {
  type: string;
}

export interface ActionWithPayload<T> extends Action {
  payload: T;
}
