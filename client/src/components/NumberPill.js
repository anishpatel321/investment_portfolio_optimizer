import { Typography, responsiveFontSizes } from '@mui/material';
import { styled } from '@mui/system';

const StyledNumberPill = styled(Typography)({
  background: 'white',
  borderRadius: '30px',
  padding: '0.3vh 0.8vw',
  display: 'inline-block',
  position: 'absolute',
  top: '1vw',
  left: '1vw',
  color: '#192435'
});

const NumberPill = ({ children }) => (
  <StyledNumberPill variant="h4" component="h3">
    {children}
  </StyledNumberPill>
);

export default NumberPill;
