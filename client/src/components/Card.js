// src/components/Card.js
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
    height: '170%', 
    position: 'relative', // Added to position the NumberPill component
  });

const StyledCardContent = styled(CardContent)({
    paddingTop: '15%', // Adjust this value as needed
});

const CardComponent = ({ title, subtitle, body }) => (
    <StyledCard>
      <NumberPill>{title}</NumberPill> {/* Use the NumberPill component */}
      <StyledCardContent>
        <Typography variant="h6" component="p">
          {subtitle}
        </Typography>
        <Typography variant="body1" component="p">
          {body}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );

export default CardComponent;
