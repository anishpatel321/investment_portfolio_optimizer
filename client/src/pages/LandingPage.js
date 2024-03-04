import React, { useEffect } from 'react';
//import './InputPage.css';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('/api/resetSession'); 
        console.log('API call successful');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to financial freedom!</h1>
      <div className="card-container">
        <div className="card">
        <h3 class="card-title">#one</h3>
          <p class="card-subtitle">Define your inputs</p>
          <p class="card-body">Pick your favorite stocks, and lookback period. Don’t worry you can also specify the amount of risk you are willing to take!</p>
        </div>
        <div className="card">
          <h3 class="card-title">#two</h3>
          <p class="card-subtitle">Review your results</p>
          <p class="card-body">Go to the dashboard to view the most optimal portfolio distribution, based on your inputs.</p>
        </div>
        <div className="card">
          <h3 class="card-title">#three</h3>
          <p class="card-subtitle">Invest in your future</p>
          <p class="card-body">Implement the White Whale portfolio recommendations to see your wallet grow</p>
        </div>
      </div>
      <Link to="/input" className="button">Continue</Link>
    </div>
  );
};

export default LandingPage;