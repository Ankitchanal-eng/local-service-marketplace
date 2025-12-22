import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      {/* Animated Background */}
      <div className="floating-globes">
        <div className="globe globe-1"></div>
        <div className="globe globe-2"></div>
        <div className="globe globe-3"></div>
      </div>

      <div className="not-found-container">
        <div className="error-card">
          <div className="error-visual">
            <div className="error-number">404</div>
            <div className="error-icon">🚀</div>
            <div className="error-path">
              <span className="path-segment"></span>
              <span className="path-segment"></span>
              <span className="path-segment"></span>
            </div>
          </div>

          <div className="error-content">
            <h1 className="error-title">Oops! Page Not Found</h1>
            <p className="error-subtitle">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="error-message">
              Don't worry, you can continue exploring our services!
            </p>

            <Link to="/browse" className="back-button">
              <span className="button-icon">🏠</span>
              Back to Services
            </Link>

            <div className="quick-links">
              <Link to="/" className="quick-link">Home</Link>
              <Link to="/browse" className="quick-link">Browse Services</Link>
              <Link to="/create-service" className="quick-link">Offer Service</Link>
            </div>
          </div>
        </div>

        <div className="error-footer">
          <p>Need help? <a href="/contact">Contact support</a></p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
