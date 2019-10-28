import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import { validateUser as validateUserMock } from './services/authService';
import Login from './Login';
import IdentityContext from '../../contexts/IdentityContext';
import { renderWithRouter } from '../../../test/render-utils';

jest.mock('./services/authService');

describe('Login Module', () => {
  function renderComponent(initialUser) {
    const identityProviderValue = {
      current: initialUser,
    };

    identityProviderValue.setCurrent = user => {
      identityProviderValue.current = user;
    };

    const result = renderWithRouter(
      <IdentityContext.Provider value={identityProviderValue}>
        <Login />
      </IdentityContext.Provider>,
      { route: 'not-home' }
    );

    return {
      ...result,
      getUsernameInput: result.getByLabelText.bind(null, /your username/i),
      getPasswordInput: result.getByLabelText.bind(null, /your password/i),
      getLoginButton: result.getByText.bind(null, /login/i),
      getAlert: result.getByRole.bind(null, 'alert'),
      queryAlert: result.queryByRole.bind(null, 'alert'),
      identityProviderValue,
    };
  }

  function toBeALocation({ hash = '', pathname = '/', search = '' } = {}) {
    return expect.objectContaining({
      hash,
      pathname,
      search,
    });
  }

  test('ensure it redirects to home when the user is already authenticated', () => {
    const { history } = renderComponent('johndoe');

    expect(history).toHaveProperty('location', toBeALocation());
  });

  test('it renders the form as expected', () => {
    const { getByRole, getUsernameInput, getPasswordInput, getLoginButton, queryAlert } = renderComponent();

    expect(getByRole('heading')).toHaveTextContent(/sign in/i);

    const userName = getUsernameInput();
    expect(userName).toHaveAttribute('placeholder', 'username');
    expect(userName).toHaveFocus();

    const password = getPasswordInput();
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('placeholder', '******');

    const loginButton = getLoginButton();
    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(loginButton).toHaveClass('btn-primary', 'btn-block');

    expect(queryAlert()).not.toBeInTheDocument();
  });

  describe('when logging in', () => {
    test('it resets the form and informs the user when invalid credentials', () => {
      const givenUsername = 'john';
      const givenPassword = 'broke';

      const { getUsernameInput, getPasswordInput, getLoginButton, getAlert } = renderComponent();

      const username = getUsernameInput();
      const password = getPasswordInput();
      const loginButton = getLoginButton();

      fireEvent.change(username, { target: { value: givenUsername } });
      fireEvent.change(password, { target: { value: givenPassword } });

      // let's pretend we actually click the button, normally button gets focussed here
      loginButton.focus();
      fireEvent.click(loginButton);

      const alert = getAlert();
      expect(alert).toHaveTextContent(/unknown user or password/i);
      expect(alert).toHaveClass('text-danger');

      // ensure we called our mock
      expect(validateUserMock).toHaveBeenCalledWith(givenUsername, givenPassword);

      // it clears the inputs
      expect(username).toHaveValue('');
      expect(password).toHaveValue('');

      // it restores the focus
      expect(username).toHaveFocus();
    });

    test('it sets the current identity when successful and redirects to home', () => {
      const givenUsername = 'john';
      const givenPassword = 'broke';

      validateUserMock.mockReturnValue(true);

      const { getUsernameInput, getPasswordInput, getLoginButton, identityProviderValue, history } = renderComponent();

      const username = getUsernameInput();
      const password = getPasswordInput();
      const loginButton = getLoginButton();

      fireEvent.change(username, { target: { value: givenUsername } });
      fireEvent.change(password, { target: { value: givenPassword } });

      fireEvent.click(loginButton);

      expect(identityProviderValue).toHaveProperty('current', givenUsername);

      expect(history).toHaveProperty('location', toBeALocation());
    });
  });
});
