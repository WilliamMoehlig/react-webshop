import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import IdentityContext from '../../contexts/IdentityContext';

function Logout() {
  const { setCurrent } = useContext(IdentityContext);

  setCurrent(undefined);

  return <Redirect to="/" />;
}

export default Logout;
