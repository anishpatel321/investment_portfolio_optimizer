import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Pie } from 'react-chartjs-2';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const OutputPage = () => {
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    // Fetch pie chart data from the Flask server
    fetchPieChartData();
  }, []);

  const fetchPieChartData = () => {
    // Make API call to fetch pie chart data
    fetch('http://localhost:5000/pie-chart-data')
      .then(response => response.json())
      .then(data => setPieChartData(data))
      .catch(error => console.error('Error fetching pie chart data:', error));
  };

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
            {pieChartData && (
              <>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Pie Chart</Typography>
                <Pie
                  data={{
                    labels: Object.keys(pieChartData),
                    datasets: [
                      {
                        data: Object.values(pieChartData),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF5722'], // You can customize the colors
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF5722'], // You can customize the hover colors
                      },
                    ],
                  }}
                />
              </>
            )}
          </StyledBox>
          <StyledBox>
            {/* Placeholder for Correlation Graph */}
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default OutputPage;