import React from 'react';
import { renderWithRouter } from '../../../test/render-utils';
import IdentityContext from '../../contexts/IdentityContext';
import Logout from './Logout';

describe('Login Module', () => {
  function renderComponent(initialUser = 'johndoe') {
    const identityProviderValue = {
      current: initialUser,
    };

    identityProviderValue.setCurrent = user => {
      identityProviderValue.current = user;
    };

    const result = renderWithRouter(
      <IdentityContext.Provider value={identityProviderValue}>
        <Logout />
      </IdentityContext.Provider>,
      { route: '/logout' }
    );

    return {
      ...result,
      identityProviderValue,
    };
  }

  test('it clears the current user and redirects to home', () => {
    const { identityProviderValue, history } = renderComponent();

    expect(identityProviderValue).toHaveProperty('current', undefined);

    expect(history).toHaveProperty(
      'location',
      expect.objectContaining({
        pathname: '/',
        hash: '',
        search: '',
        state: undefined,
      })
    );
  });
});
