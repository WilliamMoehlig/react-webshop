import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { object } from 'prop-types';
import LoginForm from './components/LoginForm';
import IdentityContext from '../../contexts/IdentityContext';

function Login({ location: { state } }) {
  const { current: currentIdentity, setCurrent: setCurrentIdentity } = useContext(IdentityContext);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = username => {
    setSubmitted(true);
    setCurrentIdentity(username);
  };

  const { from = { pathname: '/' } } = state || {};
  if (currentIdentity) return <Redirect to={from} />;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="card col-sm-6">
          <div className="card-body">
            <h4 className="card-title">Sign in</h4>
            {submitted && (
              <p className="text-center text-danger" role="alert">
                Unknown user or password
              </p>
            )}
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  location: object.isRequired,
};

export default Login;
