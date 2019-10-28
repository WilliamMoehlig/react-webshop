import { ADD_PRODUCT, DELETE_PRODUCT } from '../actionTypes';
import { Action, ActionWithPayload } from '../../models/Action';
import Product from '../../models/Product';

function productReducer(previousState: Record<number, Product> = {}, action?: Action) {
  switch (action && action.type) {
    case ADD_PRODUCT: {
      const { payload: product } = action as ActionWithPayload<Product>;
      return {
        ...previousState,
        [product.id]: product,
      };
    }
    case DELETE_PRODUCT: {
      const { payload: id } = action as ActionWithPayload<number>;
      const { [id]: _, ...wantToKeep } = previousState;

      return {
        ...wantToKeep,
      };
    }
    default:
      return previousState;
  }
}

export default productReducer;
