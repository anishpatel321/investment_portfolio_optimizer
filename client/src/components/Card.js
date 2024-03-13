import React from 'react';
import { Card, CardContent, Typography, Box, TextField, OutlinedInput } from '@mui/material';
import { styled } from '@mui/system';
import NumberPill from './NumberPill'; 
import ContinueButton from './ContinueButton';
import InputAdornment from '@mui/material/InputAdornment';

const StyledCard = styled(Card)(({ height }) => ({
  background: '#163A5F',
  color: 'white',
  borderRadius: '33px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  margin: '7px',
  height: height, 
  position: 'relative', // Added to position the NumberPill component
  transition: 'background',
  '&:hover': {
    background: 'linear-gradient(40deg, #163A5F, #1D566E, #21ABA5)', // Gradient on hover
  },
}));

const StyledCardContent = styled(CardContent)({
    paddingTop: '15%', 
});

const StyledTextField = styled(TextField)({
  background: 'white', // White background
  borderRadius: '20px', // Rounded edges
  margin: '10px 25px', 
});

const StyledOutlinedInput = styled(OutlinedInput)({
  '& fieldset': {
    border: 'none', // Remove the border
  },
  '&:hover fieldset': {
    border: 'none', // Remove the border on hover
  },
  '&.Mui-focused fieldset': {
    border: 'none', // Remove the border when focused
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove the notched outline
  },
});

const CardComponent = ({ title, subtitle, body, height, hasButton, textFields }) => {
  const [values, setValues] = React.useState({
    riskThreshold: '',
    investmentAmount: '',
    minBound: '',
    maxBound: '',
    lookbackPeriod: '', 
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validateInput = (value, min, max) => {
    return value >= min && value <= max;
  };

  return (
    <StyledCard height={height}>
      <NumberPill>{title}</NumberPill>
      <StyledCardContent>
        {!textFields && <Typography variant="h1" component="p" style={{fontSize: '350%', fontWeight: 'bold', paddingTop: '10%',paddingBottom: '3%', margin: '4%'}}>
          {subtitle}
        </Typography>}
        {!textFields && <Typography variant="body1" component="p" style={{fontSize: '150%', margin: '4%'}}>
          {body}
        </Typography>}
        {textFields && (
          <>
            <StyledTextField label="Tickers" variant='filled' InputProps={{ component: StyledOutlinedInput }} />
            <StyledTextField label="Lookback Period" variant='filled' InputProps={{ component: StyledOutlinedInput }} type="date" InputLabelProps={{ shrink: true }} />
            <StyledTextField 
              label="Risk Threshold" 
              variant='filled' 
              InputProps={{ component: StyledOutlinedInput }} 
              type="number" 
              value={values.riskThreshold}
              onChange={handleChange('riskThreshold')}
              error={!validateInput(values.riskThreshold, 0, 1)}
              
            />
            <StyledTextField 
              label="Investment amount" 
              variant='filled' 
              InputProps={{ 
                component: StyledOutlinedInput,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }} 
              type="number" 
              value={values.investmentAmount}
              onChange={handleChange('investmentAmount')}
              error={!validateInput(values.investmentAmount, 0, Infinity)}
            />
            <StyledTextField 
              label="Minimum Bound" 
              variant='filled' 
              InputProps={{ component: StyledOutlinedInput }} 
              type="number" 
              value={values.minBound}
              onChange={handleChange('minBound')}
              error={!validateInput(values.minBound, 0, 1)}
            />
            <StyledTextField 
              label="Max Bound" 
              variant='filled' 
              InputProps={{ component: StyledOutlinedInput }} 
              type="number" 
              value={values.maxBound}
              onChange={handleChange('maxBound')}
              error={!validateInput(values.maxBound, 0, 1)}
            />
          </>
        )}
        {hasButton && <Box sx={{ position: 'absolute', bottom: '2.6vh', right: '0.4vw' }}><ContinueButton /></Box>}
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardComponent;
