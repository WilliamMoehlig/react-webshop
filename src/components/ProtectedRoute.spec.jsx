import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from '../../test/render-utils';

import ProtectedRoute from './ProtectedRoute';
import IdentityContext from '../contexts/IdentityContext';

describe('Protected route component', () => {
  function createMockComponent() {
    return jest.fn().mockReturnValue(<div data-testid="fake-component" />);
  }

  function renderComponent({
    //
    route,
    component,
    render,
    exact,
    currentIdentity = 'johndoe',
  } = {}) {
    const result = renderWithRouter(
      <IdentityContext.Provider value={{ current: currentIdentity }}>
        <ProtectedRoute path="/match" exact={exact} component={component} render={render} />
      </IdentityContext.Provider>,
      { route }
    );
    return {
      ...result,
    };
  }

  describe('when we pass a component', () => {
    test('it redirects to /login when anonymous', () => {
      const initialRoute = { pathname: '/match', search: '?huppel=konijntje', hash: '#hoedade' };

      const { history } = renderComponent({
        route: initialRoute,
        component: createMockComponent(),
        currentIdentity: null,
      });

      expect(history).toHaveProperty(
        'location',
        expect.objectContaining({
          pathname: '/login',
          search: '',
          hash: '',
          state: { from: expect.objectContaining(initialRoute) },
        })
      );
    });

    test('it renders the component when the path matches', () => {
      const component = createMockComponent();

      const { getByTestId, history } = renderComponent({
        route: '/match',
        component,
      });

      getByTestId('fake-component');

      expect(component).toHaveBeenCalledWith(
        expect.objectContaining({
          location: history.location,
          match: { isExact: true, params: {}, path: '/match', url: '/match' },
          history,
        }),
        {}
      );
    });

    test('it does not render the component when the path is not matching', () => {
      const { queryByTestId } = renderComponent({ route: '/another', component: createMockComponent() });

      expect(queryByTestId('fake-component')).not.toBeInTheDocument();
    });

    test('it only renders when path is exact', () => {
      const { queryByTestId } = renderComponent({
        route: '/match/another',
        component: createMockComponent(),
        exact: true,
      });

      expect(queryByTestId('fake-component')).not.toBeInTheDocument();
    });
  });

  describe('when we pass a render prop', () => {
    test('it redirects to /login when anonymous', () => {
      const initialRoute = { pathname: '/match', search: '?huppel=konijntje', hash: '#hoedade' };
      const { history } = renderComponent({
        route: initialRoute,
        render: createMockComponent(),
        currentIdentity: null,
      });

      expect(history).toHaveProperty(
        'location',
        expect.objectContaining({
          pathname: '/login',
          search: '',
          hash: '',
          state: { from: expect.objectContaining(initialRoute) },
        })
      );
    });

    test('it renders the component when the path matches', () => {
      const component = createMockComponent();

      const { getByTestId, history } = renderComponent({
        route: '/match',
        render: component,
      });

      getByTestId('fake-component');

      expect(component).toHaveBeenCalledWith(
        expect.objectContaining({
          location: history.location,
          match: { isExact: true, params: {}, path: '/match', url: '/match' },
          history,
        })
      );
    });

    test('it does not render the component when the path is not matching', () => {
      const { queryByTestId } = renderComponent({ route: '/another', render: createMockComponent() });

      expect(queryByTestId('fake-component')).not.toBeInTheDocument();
    });

    test('it only renders when path is exact', () => {
      const { queryByTestId } = renderComponent({
        route: '/match/another',
        render: createMockComponent(),
        exact: true,
      });

      expect(queryByTestId('fake-component')).not.toBeInTheDocument();
    });
  });
});
