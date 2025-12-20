import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('userToken');
  const role = user?.role; // 'customer' or 'provider'

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="app-header">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse Services</Link>

        {/* CUSTOMER LINKS */}
        {isLoggedIn && role === 'customer' && (
          <Link to="/my-requests">My Requests</Link>
        )}

        {/* PROVIDER LINKS */}
        {isLoggedIn && role === 'provider' && (
          <>
            <Link to="/create-service">Create Service</Link>
            <Link to="/provider/requests">Provider Requests</Link>
          </>
        )}

        {/* AUTH */}
        {!isLoggedIn ? (
          <span className="auth-hint">Login required to request services</span>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
