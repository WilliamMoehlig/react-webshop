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
jest.mock('./modules/todos/Todos', () => () => <div data-testid="todos-module" />);
jest.mock('./modules/products/Products', () => () => <div data-testid="products-module" />);
jest.mock('./modules/login/Login', () => () => <div data-testid="login-module" />);
jest.mock('./modules/logout/Logout', () => () => <div data-testid="logout-module" />);
jest.mock('./pages/NotFound', () => () => <div data-testid="page-not-found" />);
jest.mock('./modules/checkout/Checkout', () => () => <div data-testid="checkout-module" />);
jest.mock('./components/NavBar/NavBar', () => jest.fn().mockReturnValue(<div data-testid="navbar-mock" />));

describe('App', () => {
  function render(route, initialUser = '') {
    const renderResult = renderWithRouter(<App initialUser={initialUser} />, { route });

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
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/logout', 'bob');

      getByTestId('logout-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the todos module on /todos ', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/todos', 'bob');

      getByTestId('todos-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the products module on /products ', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/products');

      getByTestId('products-module');

      guardAgainstRenderingPageNotFound();
    });

    test('it renders the not found page for an unknown url', () => {
      const { getByTestId, queryByTestId } = render('/unknown');

      getByTestId('page-not-found');

      expect(queryByTestId('home-module')).not.toBeInTheDocument();
    });

    test('protectedRoute /todos renders login if not logged in', () => {
      const { getByTestId, queryByTestId } = render('/todos', null);
      getByTestId('login-module');
      expect(queryByTestId('todos-module')).not.toBeInTheDocument();
    });

    test('protectedRoute /todos renders from path if logged in', () => {
      const { queryByTestId } = render('/todos', 'bob');
      expect(queryByTestId('todos-module')).toBeInTheDocument();
    });

    test('protectedRoute /logout renders login if not logged in', () => {
      const { getByTestId, queryByTestId } = render('/logout', null);
      getByTestId('login-module');
      expect(queryByTestId('logout-module')).not.toBeInTheDocument();
    });

    test('protectedRoute /logout renders from path if logged in', () => {
      const { queryByTestId } = render('/logout', 'bob');
      expect(queryByTestId('logout-module')).toBeInTheDocument();
    });

    test('protectedRoute /checkout renders path if logged in', () => {
      const { getByTestId, guardAgainstRenderingPageNotFound } = render('/checkout', 'unclebob');
      guardAgainstRenderingPageNotFound();
      expect(getByTestId('checkout-module')).toBeInTheDocument();
    });

    test('protectedRoute /checkout does not render path if not logged in', () => {
      const { queryByTestId, guardAgainstRenderingPageNotFound } = render('/checkout', null);
      guardAgainstRenderingPageNotFound();

      expect(queryByTestId('checkout-module')).not.toBeInTheDocument();
    });
  });
});
