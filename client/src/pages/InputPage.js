import React, { useEffect, useState } from 'react';
//import './InputPage.css';
import { Link } from 'react-router-dom';

const InputPage = () => {
  const [formData, setFormData] = useState({
    tickers: '',
    startDate: '',
    riskTolerance: '',
    investmentAmount: '',
    minBound: '',
    maxBound: '',
    
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //for now log it
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    //not yet handled
  };

  return (
    <div className="main-page">
      <h1>Time to make money!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tickers"
          placeholder="Tickers"
          value={formData.tickers}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Lookback Start Date"
          value={formData.startDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="riskTolerance"
          placeholder="Risk Tolerance"
          value={formData.riskTolerance}
          onChange={handleChange}
        />
        <input
          type="number"
          name="investmentAmount"
          placeholder="Investment Amount"
          value={formData.investmentAmount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minBound"
          placeholder="Minimum Bound"
          value={formData.minBound}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxBound"
          placeholder="Maximum Bound"
          value={formData.maxBound}
          onChange={handleChange}
        />
        <div className="button-container">
          <button type="submit">Continue</button>
        </div>
      </form>
      <Link to="/">
        <button>Back to Landing Page</button>
      </Link>
    </div>
  );
};

export default InputPage;