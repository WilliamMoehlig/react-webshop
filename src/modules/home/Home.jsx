import React, { useContext } from 'react';
import IdentityContext from '../../contexts/IdentityContext';

function Home() {
  const { current: currentUser } = useContext(IdentityContext);

  return <h1>{currentUser ? `Hello ${currentUser}` : 'Welcome, please log in'}</h1>;
}

export default Home;
