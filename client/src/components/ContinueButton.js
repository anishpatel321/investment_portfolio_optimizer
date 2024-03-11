import { Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledButton = styled(Button)({
  background: 'white',
  borderRadius: '30px',
  padding: '0.5% 1%',
  color: '#2b2b6e',
  '&:hover': {
    backgroundColor: 'white',
  },
});

const ArrowIcon = styled(ArrowForwardIosIcon)({
  color: 'white',
});

const Circle = styled(Box)({
  borderRadius: '50%',
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#2b2b6e',
});

const ContinueButton = () => (
  <StyledButton component={RouterLink} to="/input" variant="contained" endIcon={
    <Circle>
      <ArrowIcon />
    </Circle>
  } style={{fontWeight: 'bold', fontSize:'120%', marginRight: '7px'}}>
    Continue
  </StyledButton>
);

export default ContinueButton;
