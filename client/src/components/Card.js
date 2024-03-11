import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import NumberPill from './NumberPill'; 

const StyledCard = styled(Card)({
    background: '#2b2b6e',
    color: 'white',
    padding: '1.2%',
    borderRadius: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    margin: '7px',
    height: '100%', 
    position: 'relative', // Added to position the NumberPill component
  });

const StyledCardContent = styled(CardContent)({
    paddingTop: '15%', // Adjust this value as needed
});

const CardComponent = ({ title, subtitle, body }) => (
    <StyledCard>
      <NumberPill>{title}</NumberPill>
      <StyledCardContent>
        <Typography variant="h1" component="p" style={{fontSize: '350%', fontWeight: 'bold', paddingTop: '10%',paddingBottom: '3%', margin: '4%'}}>
          {subtitle}
        </Typography>
        <Typography variant="body1" component="p" style={{fontSize: '150%', margin: '4%'}}>
          {body}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );

export default CardComponent;
