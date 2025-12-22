import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Local Services, Trusted Pros</div>
          <h1 className="hero-title">
            Find & Offer Services
            <span className="highlight">Near You</span>
          </h1>
          <p className="hero-subtitle">
            Connect with verified professionals for home services, repairs, beauty, 
            cleaning & more. Fast booking, secure payments, local experts.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Services Booked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Verified Pros</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/browse" className="primary-cta">
              <span className="cta-icon">🔍</span>
              Browse Services
            </Link>
            <Link to="/create-service" className="secondary-cta">
              <span className="cta-icon">➕</span>
              Offer Service
            </Link>
          </div>

          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              Verified Professionals
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              Instant Booking
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              Secure Payments
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="service-preview">
            <div className="service-card plumber"></div>
            <div className="service-card cleaner"></div>
            <div className="service-card beauty"></div>
          </div>
        </div>
      </section>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default Home;
