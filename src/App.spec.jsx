import '@testing-library/jest-dom/extend-expect';
import React, { useContext } from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../test/render-utils';

import { App } from './App';

import NavBarMock from './components/NavBar/NavBar';
import IdentityContext from './contexts/IdentityContext';

function MockHome() {
  const { current, setCurrent } = useContext(IdentityContext);

  return (
    <div data-testid="home-module">
      <input data-testid="current-user" type="text" value={current || ''} onChange={e => setCurrent(e.target.value)} />
    </div>
  );
}

jest.mock('./modules/home/Home', () => () => <MockHome />);
jest.mock('./modules/users/Users', () => () => <div data-testid="users-module" />);
jest.mock('./modules/todos/Todos', () => () => <div data-testid="todos-module" />);
jest.mock('./modules/login/Login', () => () => <div data-testid="login-module" />);
jest.mock('./modules/logout/Logout', () => () => <div data-testid="logout-module" />);
jest.mock('./pages/NotFound', () => () => <div data-testid="page-not-found" />);
jest.mock('./components/NavBar/NavBar', () => jest.fn().mockReturnValue(<div data-testid="navbar-mock" />));

describe('App', () => {
  function render(route) {
    const renderResult = renderWithRouter(<App />, { route });

    const guardAgainstRenderingPageNotFound = () =>
      expect(renderResult.queryByTestId('page-not-found')).not.toBeInTheDocument();

    return {
      ...renderResult,
      guardAgainstRenderingPageNotFound,
    };
  }

  test('it renders by default', () => {
    const { getByTestId } = render();

    getByTestId('navbar-mock');

    expect(NavBarMock).toHaveBeenCalledWith({}, {});
  });

  describe('routing', () => {
    test('it renders Home by default (/)', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render();

      getByTestId('home-module');
      guardAgainstRenderingPageNotFound();
    });

    test('ensure we provide the value of the IdentityContext', () => {
      const { getByTestId } = render();

      const input = getByTestId('current-user');

      // We did not specify a user by default
      expect(input).toHaveValue('');

      fireEvent.change(input, { target: { value: 'johnd' } });

      expect(input).toHaveValue('johnd');
    });

    test('it renders the login module on /login ', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/login');

      getByTestId('login-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the logout module on /logout ', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/logout');

      getByTestId('logout-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the users module on /users ', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/users');

      getByTestId('users-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the todos module on /todos ', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/todos');

      getByTestId('todos-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the not found page for an unknown url', () => {
      const { getByTestId, queryByTestId } = render('/unknown');

      getByTestId('page-not-found');

      expect(queryByTestId('home-module')).not.toBeInTheDocument();
    });
  });
});
