import { Link } from 'react-router-dom';
import '../styles/Unauthorized.css'; 

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      {/* Security Background */}
      <div className="security-grid">
        <div className="grid-line vertical-line-1"></div>
        <div className="grid-line vertical-line-2"></div>
        <div className="grid-line horizontal-line-1"></div>
        <div className="grid-line horizontal-line-2"></div>
      </div>

      <div className="unauthorized-container">
        <div className="access-denied-card">
          <div className="security-visual">
            <div className="lock-animation">
              <div className="lock-body">🔒</div>
              <div className="lock-shackle"></div>
            </div>
            <div className="error-code">403</div>
            <div className="warning-sign">⚠️</div>
          </div>

          <div className="access-denied-content">
            <h1 className="denied-title">Access Denied</h1>
            <p className="denied-subtitle">
              You don't have permission to access this page.
            </p>
            <p className="denied-message">
              Please check your role or contact support if you believe this is an error.
            </p>

            <div className="action-buttons">
              <Link to="/" className="home-button">
                <span className="btn-icon">🏠</span>
                Go to Home
              </Link>
              <Link to="/browse" className="browse-button">
                <span className="btn-icon">🔍</span>
                Browse Services
              </Link>
            </div>

            <div className="support-info">
              <p>Need help? <a href="/contact">Contact Support</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
