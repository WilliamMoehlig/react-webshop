import './todos.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import { completeTodo, addTodo } from '../../store/actions/todoActions';

import Footer from './components/TodoFooter';
import List from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const filteredTodosSelector = createSelector(
  state => state.todos,
  todoState => Object.values(todoState).filter(x => !x.completed)
);

function Todos() {
  const todos = useSelector(filteredTodosSelector);

  const dispatch = useDispatch();

  const handleSubmit = ({ name }) => {
    const newTodo = {
      // We use this for the moment to create an unique id
      id: Date.now(),
      name,
    };
    dispatch(addTodo(newTodo));
  };

  const handleCompleteTodo = id => {
    dispatch(completeTodo(id));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="todos col-4">
          <h1>Todos</h1>

          <AddTodoForm onSubmit={handleSubmit} />
          <hr />
          <List todos={todos} onComplete={handleCompleteTodo} />
          <hr />
          <Footer remaining={todos.length} />
        </div>
      </div>
    </div>
  );
}

export default Todos;
