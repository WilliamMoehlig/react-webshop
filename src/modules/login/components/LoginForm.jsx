import React, { useEffect, useRef, useState } from 'react';
import { func } from 'prop-types';

import Button from '../../../components/Button';
import { validateUser } from '../services/authService';

function LoginForm({ onLogin }) {
  const [submitCount, setSubmitCount] = useState(0);
  const userNameInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    userNameInput.current.focus();
  }, [submitCount]);

  const handleSubmit = e => {
    e.preventDefault();

    const username = userNameInput.current.value;
    const password = passwordInput.current.value;

    const isValid = validateUser(username, password);
    onLogin(isValid ? username : undefined);

    e.target.reset();
    setSubmitCount(i => i + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Your username</label>
        <input className="form-control" placeholder="username" type="text" id="username" ref={userNameInput} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Your password</label>
        <input id="password" className="form-control" type="password" placeholder="******" ref={passwordInput} />
      </div>

      <div className="form-group">
        <Button type="submit" block>Login</Button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: func.isRequired,
};

export default LoginForm;
