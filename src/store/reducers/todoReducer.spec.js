import reducer from './todoReducer';
import { addTodo, completeTodo } from '../actions/todoActions';

describe('Todo reducer', () => {
  test('it is initially an empty object', () => {
    const state = reducer();
    expect(state).toStrictEqual({});
  });

  test('it reduces ADD_TODO', () => {
    const initialState = {
      1: { id: 1, name: 'Wash the dishes' },
    };

    const newTodo = { id: 2, name: 'Feed the fishes' };

    const state = reducer(initialState, addTodo(newTodo));

    expect(state).toStrictEqual({
      1: { id: 1, name: 'Wash the dishes' },
      2: { id: 2, name: 'Feed the fishes' },
    });
  });

  test('it reduces COMPLETE_TODO', () => {
    const initialState = {
      1: { id: 1, name: 'Wash the dishes' },
      2: { id: 2, name: 'Feed the fishes' },
    };

    const state = reducer(initialState, completeTodo(2));

    expect(state).toStrictEqual({
      1: { id: 1, name: 'Wash the dishes' },
      2: { id: 2, name: 'Feed the fishes', completed: true },
    });
  });
});
