import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, logout = () => false }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav">
      <li className="navbar-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="nav-link" to="/list/">
          All Places
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="nav-link" to="/search/">
          Search
        </Link>
      </li>
      {!isLoggedIn && (
        <li className="navbar-item">
          <Link className="nav-link" to="/login/">
            Login
          </Link>
        </li>
      )}
      {isLoggedIn && (
        <li className="navbar-item" onClick={() => logout()}>
          <a className="nav-link" style={{ cursor: 'pointer' }}>
            Logout
          </a>
        </li>
      )}
    </ul>
  </nav>
);

export default Nav;
