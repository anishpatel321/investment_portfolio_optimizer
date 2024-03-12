import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ContinueButton from '../components/ContinueButton';
import { Box, TextField, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Card from '../components/Card';

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
    <>
      <TopBar home/>
      <Grid sx={{ width: '95%', mx: 'auto', color:'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%'}}>
          Define your portfolio, your way
        </Typography>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
          <Card title="Definitions" subtitle="Define your inputs" body="Pick your favorite stocks, and lookback period. Don’t worry you can also specify the amount of risk you are willing to take!" height={'67.5vh'}/>
        </Grid>
        <Grid item xs={12} sm={6} md={8} style={{padding: 0}}>
          <Card title="Inputs" height={'67.5vh'} hasButton={true} textFields={true}/>
        </Grid>
      </Grid>
    </>
);

};

export default InputPage;
