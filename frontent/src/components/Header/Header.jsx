import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional: if you want basic styling

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/browse">Browse Services</Link> |{' '}
        <Link to="/create-service">Create Service</Link>
      </nav>
    </header>
  );
};

export default Header;
