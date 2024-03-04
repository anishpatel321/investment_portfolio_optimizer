import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InputPage = () => {
  const [formData, setFormData] = useState({
    tickers: [],
    lookback_start: '',
    risk_tolerance: '',
    investment_amount: '',
    min_bound: '',
    max_bound: '',
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
    if (name === 'tickers') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.split(',').map(ticker => ticker.trim()),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await fetch('http://localhost:5000/process_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response Data:', data);
      // Now you can use this data to update your state and render it in your component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main-page">
      <h1>Time to make money!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tickers"
          placeholder="Enter tickers separated by commas"
          value={formData.tickers.join(', ')}
          onChange={handleChange}
        />
        <input
          type="date"
          name="lookback_start"
          placeholder="Lookback Start Date"
          value={formData.lookback_start}
          onChange={handleChange}
        />
        <input
          type="text"
          name="risk_tolerance"
          placeholder="Risk Tolerance"
          value={formData.risk_tolerance}
          onChange={handleChange}
        />
        <input
          type="number"
          name="investment_amount"
          placeholder="Investment Amount"
          value={formData.investment_amount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="min_bound"
          placeholder="Minimum Bound"
          value={formData.min_bound}
          onChange={handleChange}
        />
        <input
          type="number"
          name="max_bound"
          placeholder="Maximum Bound"
          value={formData.max_bound}
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
