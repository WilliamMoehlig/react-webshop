import React from 'react';
import { fireEvent, within } from '@testing-library/react';
import { renderWithRedux } from '../../../test/render-utils';
import Todos from './Todos';

describe('Todos module', () => {
  function renderComponent(...todos) {
    const todoMap = (todos || []).reduce((acc, todo) => {
      acc[todo.id] = todo;
      return acc;
    }, {});

    const result = renderWithRedux(<Todos />, { initialState: { todos: todoMap } });

    return {
      ...result,
      getFooter: result.getByTestId.bind(null, 'amount-of-remaining-todos'),
      getTodoNameInput: result.getByLabelText.bind(null, 'newTodoName'),
    };
  }

  test('it renders the header', () => {
    const { getByRole } = renderComponent();

    const header = getByRole('heading');
    expect(header).toHaveTextContent(/todos/i);
  });

  describe('form', () => {
    test('it adds a new todo when filled in completely', () => {
      const { getByLabelText, getTodoNameInput } = renderComponent({ id: 1, name: 'Wash the dishes' });

      const input = getTodoNameInput();
      expect(input).toHaveAttribute('placeholder', 'Add todo');

      fireEvent.change(input, { target: { value: 'new todo' } });
      fireEvent.submit(input.closest('form'));

      // It clears the value
      expect(input).toHaveValue('');

      // 😇 Test the functionality as seen trough the eyes of the user
      getByLabelText(/new todo/i);
    });

    test('guard it does not add a new todo when the input is empty', () => {
      const { queryByRole, getTodoNameInput } = renderComponent();

      const input = getTodoNameInput();

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.submit(input.closest('form'));

      expect(queryByRole('listitem')).toBeNull();
    });
  });

  describe('list', () => {
    test('it renders the list of remaining todos', () => {
      const { getByRole } = renderComponent(
        { id: 1, name: 'Wash the dishes' },
        { id: 2, name: 'Take out the trash' },
        { id: 3, name: 'Should be here', completed: true }
      );

      const { getAllByRole, getByLabelText } = within(getByRole('list'));

      // Verify total amount of items
      const items = getAllByRole('listitem');
      expect(items).toHaveLength(2);

      getByLabelText(/wash the dishes/i);
      getByLabelText(/take out the trash/i);
    });

    test('it completes the todo when the user clicks on it', () => {
      const { getByLabelText, queryByLabelText } = renderComponent({ id: 1, name: 'Wash the dishes' });

      fireEvent.click(getByLabelText(/wash the dishes/i));

      expect(queryByLabelText(/wash the dishes/i)).not.toBeInTheDocument();
    });
  });

  describe('footer', () => {
    test('it renders 0 items remaining if all todos are completed', () => {
      const { getFooter } = renderComponent({ id: 1, completed: true });

      const footer = getFooter();

      expect(footer).toHaveTextContent(/0 items remaining/i);
    });

    test('it renders 1 item remaining if only 1 is not completed', () => {
      const { getFooter } = renderComponent({ id: 1, completed: true }, { id: 2 });

      const footer = getFooter();

      expect(footer).toHaveTextContent(/1 item remaining/i);
    });

    test('it renders x items remaining if x are not completed', () => {
      const { getFooter } = renderComponent({ id: 1, completed: true }, { id: 2 }, { id: 3 });

      const footer = getFooter();

      expect(footer).toHaveTextContent(/2 items remaining/i);
    });
  });
});
