import React, { useState, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { string } from 'prop-types';

import store from './store/store';
import IdentityContext from './contexts/IdentityContext';
import Login from './modules/login/Login';
import Home from './modules/home/Home';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar/NavBar';
import Logout from './modules/logout/Logout';
import Todos from './modules/todos/Todos';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './modules/checkout/Checkout';
import Products from './modules/products/Products';

export function App({ initialUser }) {
  const [currentIdentity, setCurrentIdentity] = useState(initialUser);

  const identityContextValue = useMemo(
    () => ({
      current: currentIdentity,
      setCurrent: setCurrentIdentity,
    }),
    [currentIdentity]
  );

  return (
    <IdentityContext.Provider value={identityContextValue}>
      <NavBar />
      <div className="container-fluid main">
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/todos" component={Todos} />
          <ProtectedRoute path="/checkout" component={Checkout} />
          <Route path="/products" component={Products} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </IdentityContext.Provider>
  );
}

/* istanbul ignore next */
function RuntimeApp() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

App.propTypes = {
  initialUser: string,
};

App.defaultProps = {
  initialUser: undefined,
};

export default hot(RuntimeApp);
