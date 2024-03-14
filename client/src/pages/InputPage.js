import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Box, TextField, Typography, Grid, InputAdornment, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import CardComponent from '../components/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '25vw',
  borderRadius: '20px',
  border: 'none',
  outline: 'none',
  '& label.Mui-focused': {
    color: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    // fontSize: '2.4vh',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-error fieldset': {
      borderColor: 'transparent',
    },
  },
});

const InputPage = () => {
  const [tickers, setTickers] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [riskThreshold, setRiskThreshold] = useState('');
  const [lookBackDate, setLookBackDate] = useState(null);
  const [minAllocationBound, setMinAllocationBound] = useState('');
  const [maxAllocationBound, setMaxAllocationBound] = useState('');

  const validateAllocation = (value) => {
    return value >= 0 && value <= 1;
  };

  const validateInvestAndRisk = (value) => {
    if (value.trim() === '') {
      return true; // No error if the field is empty
    }
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0 && numValue.toString() === value;
  };

  const validateLookBackDate = (selectedDate) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return selectedDate instanceof Date && selectedDate < oneWeekAgo;
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
          <CardComponent title="Definitions" subtitle="Define your inputs" body="Pick your favorite stocks, and lookback period. Don’t worry you can also specify the amount of risk you are willing to take!" height={'67.5vh'} hasTransition={true}/>
        </Grid>
        <Grid item xs={12} sm={6} md={8} style={{padding: 0}}>
          <CardComponent title="Inputs" height={'67.5vh'} hasButton={true} hasInputs={true}>
            <Box sx={{ position: 'absolute', top: '10vh', left: '4vw'}}>
              <Typography variant='h6' style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '2vw'}} >Tickers</Typography>
              <StyledTextField
                value={tickers}
                onChange={(e) => setTickers(e.target.value)}
              />
            </Box>
            <Box sx={{ position: 'absolute', top: '25vh', left: '4vw' }}>
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '2vw'}} >Investment Amount</Typography>
              <StyledTextField
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                error={!validateInvestAndRisk(investmentAmount)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h5" style={{fontWeight: 'bold'}} >$</Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {!validateInvestAndRisk(investmentAmount) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.8vh'}}>Value must be a number greater than 0</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top: '40vh', left: '4vw' }}>
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '2vw'}} >Risk Threshold</Typography>
              <StyledTextField
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(e.target.value)}
                error={!validateInvestAndRisk(riskThreshold)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant='h4' style={{fontWeight: 'bold', fontSize: '190%'}} >%</Typography>
                    </InputAdornment>
                  ), 
                }}
              />
              {!validateInvestAndRisk(riskThreshold) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.8vh'}}>Value must be a number greater than 0</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top:'10vh', left: '33.5vw' }}>
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '2vw'}} >Look-Back Date</Typography>
              <DatePicker
                selected={lookBackDate}
                onChange={(date) => setLookBackDate(date)}
                error={!validateLookBackDate(lookBackDate)}
                dateFormat="yyyy-MM-dd"
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
                popperPlacement='top'
                customInput={
                  <StyledTextField
                    sx={{
                      backgroundColor: 'white',
                      width: '25vw',
                    }}
                  />
                }
              />
              {!validateLookBackDate(lookBackDate) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.8vh'}}>Date must be at least a week before today</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top:'25vh', left: '33.5vw' }}>
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '2vw'}} >Min. Allocation Bound</Typography>
              <StyledTextField
                value={minAllocationBound}
                onChange={(e) => setMinAllocationBound(e.target.value)}
                error={!validateAllocation(minAllocationBound)}
              />
              {!validateAllocation(minAllocationBound) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.8vh'}}>Value must be between 0 and 1</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top: '40vh', left: '33.5vw' }}>
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '2vw'}} >Max. Allocation Bound</Typography>
              <StyledTextField
                value={maxAllocationBound}
                onChange={(e) => setMaxAllocationBound(e.target.value)}
                error={!validateAllocation(maxAllocationBound)}
              />
              {!validateAllocation(maxAllocationBound) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.8vh'}}>Value must be between 0 and 1</FormHelperText>}
            </Box>
          </CardComponent>
        </Grid>
      </Grid>
    </>
  );
};

export default InputPage;