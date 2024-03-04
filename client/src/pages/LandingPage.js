import React, { useEffect } from 'react';
//import './InputPage.css';
import { Link } from 'react-router-dom';

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
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div> {/* Added a <div> to wrap the content */}
      <h1>Time to make money!</h1>
      <Link to="/input">
        <button>Let's get Started!</button>
      </Link>
    </div>  // Corrected closing </div> tag
  );
};

export default LandingPage;