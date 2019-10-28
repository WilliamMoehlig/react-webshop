import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { func, string, bool } from 'prop-types';
import IdentityContext from '../contexts/IdentityContext';

function ProtectedRoute({ component: Component, render, path, exact }) {
  const { current } = useContext(IdentityContext);

  return (
    <Route
      render={({ location, history, match }) => {
        if (!current) return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
        return Component ? (
          <Component location={location} history={history} match={match} />
        ) : (
          render({
            location,
            history,
            match,
          })
        );
      }}
      path={path}
      exact={exact}
    />
  );
}

ProtectedRoute.propTypes = {
  component: func,
  render: func,
  path: string,
  exact: bool,
};

ProtectedRoute.defaultProps = {
  component: undefined,
  render: undefined,
  path: undefined,
  exact: undefined,
};

export default ProtectedRoute;
