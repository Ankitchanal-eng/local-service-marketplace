import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/browse">
            <button>
                Back to Browse Services
            </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
