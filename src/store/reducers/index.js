import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  notifications: notificationReducer,
});

export default rootReducer;
