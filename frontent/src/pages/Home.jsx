import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      <section className="home-hero">
        <h1>Welcome to the Service Platform</h1>
        <p>
          Find trusted professionals or offer your services to customers near you.
        </p>

        <div className="home-actions">
            <Link to="/browse" className="primary-btn">
                Browse Services
            </Link>
                <br></br>
            <Link to="/create-service" className="secondary-btn">
                Offer a Service
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
