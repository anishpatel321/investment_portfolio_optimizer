import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import NumberPill from './NumberPill'; 
import ContinueButton from './ContinueButton';

const StyledCard = styled(Card)(({ height, hasTransition }) => ({
  background: '#163A5F',
  color: 'white',
  borderRadius: '33px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  margin: '7px',
  height: height, 
  position: 'relative', // Added to position the NumberPill component
  transition: hasTransition ? 'background' : 'none',
  '&:hover': {
    background: hasTransition ? 'linear-gradient(40deg, #163A5F, #1D566E, #21ABA5)' : '#163A5F', // Gradient on hover
  },
}));

const StyledCardContent = styled(CardContent)({
    paddingTop: '15%', 
});

const CardComponent = ({ title, subtitle, body, height, hasButton, hasNumberPill, hasTransition, children }) => {
  return (
    <StyledCard height={height} hasTransition={hasTransition}>
      {hasNumberPill && <NumberPill>{title}</NumberPill>}
      <StyledCardContent>
        <Typography variant="h1" component="p" style={{fontSize: '350%', fontWeight: 'bold', paddingTop: '10%',paddingBottom: '3%', margin: '4%'}}>
          {subtitle}
        </Typography>
        <Typography variant="body1" component="p" style={{fontSize: '150%', margin: '4%'}}>
          {body}
        </Typography>
        {children}
        {hasButton && <Box sx={{ position: 'absolute', bottom: '3.1vh', right: '1vh' }}><ContinueButton /></Box>}
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardComponent;
