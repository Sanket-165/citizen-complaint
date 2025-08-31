import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to CivicReporter</h1>
      <p>Your platform to report and resolve civic issues in our community.</p>
      <Link to="/register">
        <button type="submit" style={{maxWidth: '200px', marginTop: '1rem'}}>Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;