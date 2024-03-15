import { Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledButton = styled(Button)({
  background: 'white',
  borderRadius: '30px',
  padding: '0.3vw 0.8vw',
  color: '#163A5F',
  '&:hover': {
    backgroundColor: 'white',
    transform: 'scale(1.05)', // Scale up on hover
  },
  transition: 'transform 0.3s ease-in-out', // Smooth transition
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
  background: '#163A5F',
});

const ContinueButton = ({ onClick}) => (
  <StyledButton component={RouterLink} to="/input" variant="contained" endIcon={
    <Circle>
      <ArrowIcon />
    </Circle>
  } style={{fontWeight: 'bold', fontSize:'120%', marginRight: '7px', top: '1vh'}}
    onClick={onClick}
  >
    Continue
  </StyledButton>
);

export default ContinueButton;
