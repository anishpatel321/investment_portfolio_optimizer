import React from 'react';
import TopBar from '../components/TopBar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Placeholder for pie chart and correlation graph imports
// import PieChart from './PieChart';
// import CorrelationGraph from './CorrelationGraph';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const OutputPage = () => {
  // Placeholder for initial investment amount and projected investment amount
  const initialInvestmentAmount = 10000; // Placeholder value
  const projectedInvestmentAmount = 15000; // Placeholder value

  return (
    <>
      <TopBar />
      <Grid sx={{ width: '95%', mx: 'auto', color:'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%'}}>
          Your Portfolio Overview
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} md={4} style={{padding: '0 10px'}}>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Initial Investment Amount</Typography>
            <Typography variant="h4">${initialInvestmentAmount}</Typography>
          </StyledBox>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Projected Investment Amount</Typography>
            <Typography variant="h4">${projectedInvestmentAmount}</Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={8} style={{padding: '0 10px'}}>
          <StyledBox>
            {/* Placeholder for Pie Chart */}
            {/* <PieChart /> */}
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Pie Chart</Typography>
            {/* Placeholder for pie chart */}
          </StyledBox>
          <StyledBox>
            {/* Placeholder for Correlation Graph */}
            {/* <CorrelationGraph /> */}
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Correlation Graph</Typography>
            {/* Placeholder for correlation graph */}
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default OutputPage;
