import React, { useState, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import IdentityContext from './contexts/IdentityContext';
import Login from './modules/login/Login';
import Home from './modules/home/Home';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar/NavBar';
import Logout from './modules/logout/Logout';
import Users from './modules/users/Users';
import Todos from './modules/todos/Todos';

export function App() {
  const [currentIdentity, setCurrentIdentity] = useState();

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
          <Route path="/logout" component={Logout} />
          <Route path="/users" component={Users} />
          <Route path="/todos" component={Todos} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </IdentityContext.Provider>
  );
}

function RuntimeApp() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default hot(RuntimeApp);
