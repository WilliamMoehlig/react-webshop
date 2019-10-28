import { ADD_TODO, COMPLETE_TODO } from '../actionTypes';

function todoReducer(previousState = {}, action) {
  switch (action && action.type) {
    case ADD_TODO: {
      const { payload: newTodo } = action;

      return {
        ...previousState,
        [newTodo.id]: newTodo,
      };
    }
    case COMPLETE_TODO: {
      const { payload: todoId } = action;

      return {
        ...previousState,
        [todoId]: {
          ...previousState[todoId],
          completed: true,
        },
      };
    }
    default:
      return previousState;
  }
}

export default todoReducer;
