import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { within, fireEvent } from '@testing-library/react';

import NavBar from './NavBar';
import { renderWithRouter } from '../../../test/render-utils';
import IdentityContext from '../../contexts/IdentityContext';
import NotificationCountMock from './components/NotificationCount';

jest.mock('./components/NotificationCount', () =>
  jest.fn().mockReturnValue(<div data-testid="notification-count-mock" />)
);

describe('NavBar component', () => {
  function render(route, currentUser) {
    const value = {
      current: currentUser,
    };

    value.setCurrent = user => {
      value.current = user;
    };

    const result = renderWithRouter(
      <IdentityContext.Provider value={value}>
        <NavBar />
      </IdentityContext.Provider>,
      { route }
    );

    return {
      ...result,
      getComponent: result.getByRole.bind(null, 'navigation'),
    };
  }

  function toBeALocation({ hash = '', pathname = '/', search = '', state = undefined } = {}) {
    return expect.objectContaining({
      hash,
      pathname,
      search,
      state,
    });
  }

  test('it renders the nav with a clickable brand logo', () => {
    const { getComponent, history } = render('/not-home');

    const navbar = getComponent();
    expect(navbar).toHaveClass('navbar');

    const { getByAltText, getByText } = within(navbar);

    const logo = getByAltText(/bootcamp logo/i);
    expect(logo).toHaveAttribute('src', expect.stringMatching(/public(\/|\/\/)images(\/|\/\/)js-logo.png/));

    const link = getByText(/bootcamp/i);
    expect(link).toHaveClass('navbar-brand');

    fireEvent.click(link);

    expect(history).toHaveProperty('location', toBeALocation());
  });

  test('it renders a navlink to todos', () => {
    const { getComponent, history } = render();

    const { getByText } = within(getComponent());

    const todosNavLink = getByText(/todos/i);
    expect(todosNavLink).toHaveClass('nav-link');
    expect(todosNavLink).not.toHaveClass('active');

    fireEvent.click(todosNavLink);

    expect(history).toHaveProperty(
      'location',
      toBeALocation({
        //
        pathname: '/todos',
        // 🔥 Apparently only for NavLink, Link have un undefined state
        state: null,
      })
    );
    expect(todosNavLink).toHaveClass('active');
  });

  describe('when anonymous', () => {
    test('it renders a login link', () => {
      const { getComponent, history, queryByText } = render('/not-home');

      const { getByText } = within(getComponent());

      const loginLink = getByText(/log in/i);
      expect(queryByText(/log out/i)).not.toBeInTheDocument();

      fireEvent.click(loginLink);

      expect(history).toHaveProperty('location', toBeALocation({ pathname: '/login' }));
    });

    test('guard it does not render the notification count', () => {
      const { queryByTestId } = render('/not-home');
      expect(queryByTestId('notification-count-mock')).toBeNull();
    });
  });

  describe('when authenticated', () => {
    test('it renders a logout link', () => {
      const { getComponent, history, queryByText } = render('/not-home', 'johnDoe');

      const { getByText } = within(getComponent());

      const logoutLink = getByText(/log out/i);

      expect(queryByText(/log in/i)).not.toBeInTheDocument();

      fireEvent.click(logoutLink);

      expect(history).toHaveProperty('location', toBeALocation({ pathname: '/logout' }));
    });

    test('it renders the notification count', () => {
      const currentIdentity = 'JohnDoe';

      const { getByTestId } = render('/not-home', currentIdentity);

      getByTestId('notification-count-mock');

      expect(NotificationCountMock).toHaveBeenCalledWith(
        {
          currentIdentity,
        },
        {}
      );
    });
  });
});
