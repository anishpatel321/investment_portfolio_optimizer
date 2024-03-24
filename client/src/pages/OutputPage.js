import React from 'react';
import TopBar from '../components/TopBar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import PieChartGraph from '../components/PieChartGraph';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const OutputPage = () => {
  const initialInvestmentAmount = 10000; // Placeholder value
  const projectedInvestmentAmount = 15000; // Placeholder value

  return (
    <>
      <TopBar />
      <Grid sx={{ width: '95%', mx: 'auto', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{ marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%' }}>
          Your Portfolio Overview
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} md={4} style={{ padding: '0 10px' }}>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Initial Investment Amount</Typography>
            <Typography variant="h4">${initialInvestmentAmount}</Typography>
          </StyledBox>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Projected Investment Amount</Typography>
            <Typography variant="h4">${projectedInvestmentAmount}</Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: '0 10px' }}>
          <StyledBox>
            <div>
              <PieChartGraph />
            </div>
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: '0 10px' }}>
          <StyledBox>
            <PieChartGraph /> 
            {/* this is the box under the invest and porj amounts, has another pie chart for now */}
          </StyledBox>
          <StyledBox style={{height: '40vh'}}>
            {/* another box under 2nd pie chart */}

          </StyledBox>
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: '0 10px' }}>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Initial Investment Amount</Typography>
            <Typography variant="h4">${initialInvestmentAmount}</Typography>
            {/* This box has just 2 typography (text) elements, can also add more than just text */}
          </StyledBox>
          <StyledBox style={{height: '30vh', alignItems: 'center'}}>
            {/* another box with mismatched height, change as needed */}
            <PieChartGraph /> 
          </StyledBox>
          <StyledBox style={{height: '17vh'}}>
            {/* another box under 3nd pie chart */}

          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default OutputPage;