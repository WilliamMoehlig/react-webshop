import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import IdentityContext from '../../contexts/IdentityContext';

function Login() {
  const { current: currentIdentity, setCurrent: setCurrentIdentity } = useContext(IdentityContext);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = username => {
    setSubmitted(true);
    setCurrentIdentity(username);
  };

  if (currentIdentity) return <Redirect to="/" />;

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

export default Login;
