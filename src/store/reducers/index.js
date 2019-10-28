import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import notificationReducer from './notificationReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  notifications: notificationReducer,
  cartProducts: productReducer,
});

export default rootReducer;
