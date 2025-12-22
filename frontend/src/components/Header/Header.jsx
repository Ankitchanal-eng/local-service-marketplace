import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const user = userData.user || userData;
  const isLoggedIn = !!user && !!user.role;
  const role = user.role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ✅ FIXED: Safe user display name
  const getUserDisplayName = () => {
    return user.username || user.email || 'User';
  };

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <Link to="/" className="header-logo">
          <div className="logo-mark">LS</div>
          <div className="logo-text">
            Local<span className="logo-highlight">Serve</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse" className="nav-link">Browse Services</Link>
          
          {/* CUSTOMER LINKS */}
          {isLoggedIn && role === 'customer' && (
            <Link to="/my-requests" className="nav-link">
              My Requests
            </Link>
          )}

          {/* PROVIDER LINKS */}
          {isLoggedIn && role === 'provider' && (
            <>
              <Link to="/create-service" className="nav-link">
                Create Service
              </Link>
              <Link to="/provider/requests" className="nav-link">
                Provider Requests
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth Actions */}
        <div className="desktop-auth">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="auth-link login-link">
                Login
              </Link>
              <Link to="/register" className="cta-button">
                Get Started
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" aria-label="Menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* ✅ FIXED User Info Badge */}
      {isLoggedIn && (
        <div className="user-badge">
          <span className="user-role">{role?.charAt(0).toUpperCase() + (role?.slice(1) || '')}</span>
          <span className="user-divider">|</span>
          <span className="user-name">{getUserDisplayName()}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
