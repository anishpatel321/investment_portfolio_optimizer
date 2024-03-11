import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ContinueButton from '../components/ContinueButton';
import { Box, TextField, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  backgroundColor: 'white',
  width: '50%',
});

const InputField = ({ name, placeholder, value, handleChange }) => (
  <StyledTextField
    type={name === 'tickers' ? 'text' : 'number'}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    variant="outlined"
    fullWidth
    margin="normal"
  />
);

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
      <TopBar home />
      <h1>Time to make money!</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          name="tickers"
          placeholder="Enter tickers separated by commas"
          value={formData.tickers.join(', ')}
          handleChange={handleChange}
        />
        <InputField
          name="lookback_start"
          placeholder="Lookback Start Date"
          value={formData.lookback_start}
          handleChange={handleChange}
        />
        <InputField
          name="risk_tolerance"
          placeholder="Risk Tolerance"
          value={formData.risk_tolerance}
          handleChange={handleChange}
        />
        <InputField
          name="investment_amount"
          placeholder="Investment Amount"
          value={formData.investment_amount}
          handleChange={handleChange}
        />
        <InputField
          name="min_bound"
          placeholder="Minimum Bound"
          value={formData.min_bound}
          handleChange={handleChange}
        />
        <InputField
          name="max_bound"
          placeholder="Maximum Bound"
          value={formData.max_bound}
          handleChange={handleChange}
        />
        <Box sx={{ display: 'flex', width: '95%', mx: 'auto', justifyContent: 'flex-end', marginTop: '0%'}}>
          <ContinueButton/>
        </Box>
      </form>
    </div>
  );  
};

export default InputPage;
