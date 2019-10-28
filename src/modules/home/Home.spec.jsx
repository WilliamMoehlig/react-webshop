import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render as renderRtl } from '@testing-library/react';
import Home from './Home';
import IdentityContext from '../../contexts/IdentityContext';

describe('Home module', () => {
  function renderComponent(user) {
    const result = renderRtl(
      <IdentityContext.Provider value={{ current: user }}>
        <Home />
      </IdentityContext.Provider>
    );

    return {
      ...result,
      getHeader: result.getByRole.bind(null, 'heading'),
    };
  }

  describe('when user is anonymous', () => {
    test('it renders a welcome message', () => {
      const { getHeader } = renderComponent();

      const header = getHeader();
      expect(header).toHaveTextContent(/welcome, please log in/i);
    });
  });

  describe('when user is authenticated', () => {
    test('it greets the user', () => {
      const { getHeader } = renderComponent('johndoe');

      const header = getHeader();
      expect(header).toHaveTextContent(/hello johndoe/i);
    });
  });
});
