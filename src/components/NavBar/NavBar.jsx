import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import jsLogo from '../../public/images/js-logo.png';
import IdentityContext from '../../contexts/IdentityContext';
import NotificationCount from './components/NotificationCount';
import ShoppingCartLink from './components/ShoppingCartLink';

function NavBar() {
  const { current: currentUser } = useContext(IdentityContext);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={jsLogo} alt="Bootcamp Logo" height={30} width={30} className="d-inline-block align-top" /> Bootcamp
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/todos">
            Todos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">
            Shop
          </NavLink>
        </li>
      </ul>

      <ShoppingCartLink className="mr-3" />

      {currentUser ? (
        <>
          <NotificationCount currentIdentity={currentUser} />
          <Link to="/logout">Log Out</Link>
        </>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </nav>
  );
}

export default NavBar;
