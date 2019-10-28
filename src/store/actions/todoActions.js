/* eslint-disable import/prefer-default-export */
import { ADD_TODO, COMPLETE_TODO } from '../actionTypes';

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    payload: id,
  };
}
