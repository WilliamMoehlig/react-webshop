import React, { useRef } from 'react';
import { func } from 'prop-types';

function AddTodoForm({ onSubmit }) {
  const nameInput = useRef();

  const handleSubmit = evt => {
    evt.preventDefault();

    const name = nameInput.current.value;

    if (name) {
      onSubmit({ name });
      evt.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameInput} aria-label="newTodoName" className="form-control" placeholder="Add todo" />
    </form>
  );
}

AddTodoForm.propTypes = {
  onSubmit: func.isRequired,
};

export default AddTodoForm;
