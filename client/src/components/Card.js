import { Card, CardContent, Typography, Box, TextField, OutlinedInput } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import NumberPill from './NumberPill'; 
import ContinueButton from './ContinueButton';

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
  margin: '10px 10px', 
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

const CardComponent = ({ title, subtitle, body, height, hasButton, textFields }) => (
  <StyledCard height={height}>
    <NumberPill>{title}</NumberPill>
    <StyledCardContent>
      {!textFields && <Typography variant="h1" component="p" style={{fontSize: '350%', fontWeight: 'bold', paddingTop: '10%',paddingBottom: '3%', margin: '4%'}}>
        {subtitle}
      </Typography>}
      {!textFields && <Typography variant="body1" component="p" style={{fontSize: '150%', margin: '4%'}}>
        {body}
      </Typography>}
      {textFields && Array(6).fill().map((_, i) => (
        <StyledTextField key={i} label={`Input ${i+1}`} variant='outlined' InputProps={{ component: StyledOutlinedInput }}/>
      ))}
      {hasButton && <Box sx={{ position: 'absolute', bottom: '2.6vh', right: '0.4vw' }}><ContinueButton /></Box>}
    </StyledCardContent>
  </StyledCard>
);

export default CardComponent;
