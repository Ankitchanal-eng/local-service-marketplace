import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Service Platform</h1>
            <p>This is the homepage.</p>
            <Link to="/browse">View All Services</Link>
        </div>
    );
};

export default Home;