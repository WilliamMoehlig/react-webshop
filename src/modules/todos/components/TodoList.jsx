import React from 'react';
import { arrayOf, number, string, bool, shape, func } from 'prop-types';

function TodoList({ todos, onComplete }) {
  return (
    <ul className="list-unstyled todos__list">
      {todos.map(todo => (
        <li className="todos__list-item" key={todo.id}>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={() => onComplete(todo.id)}
                checked={false}
              />
              {todo.name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: arrayOf(
    shape({
      id: number.isRequired,
      name: string,
      completed: bool,
    })
  ).isRequired,
  onComplete: func.isRequired,
};

export default TodoList;
