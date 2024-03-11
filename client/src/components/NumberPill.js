// src/components/NumberPill.js
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledNumberPill = styled(Typography)({
  background: 'white',
  borderRadius: '30px',
  padding: '0.5% 3%',
  display: 'inline-block',
  position: 'absolute',
  top: '5%',
  left: '3.6%',
  color: '#2b2b6e'
});

const NumberPill = ({ children }) => (
  <StyledNumberPill variant="h5" component="h3">
    {children}
  </StyledNumberPill>
);

export default NumberPill;
