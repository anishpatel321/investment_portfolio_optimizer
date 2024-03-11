import '../index.css';
import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Card from '../components/Card';
import TopBar from '../components/TopBar';
import ContinueButton from '../components/ContinueButton';

const LandingPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('/api/resetSession'); 
        console.log('API call successful');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      <TopBar />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', 
        color: 'white', 
        m: 0, // Remove margin
        width: '100%', // Full width
      }}>
        <Box sx={{ width: '95%', mx: 'auto' }}>
          <Typography variant="h3" component="h1" gutterBottom align="left"
                      style={{marginLeft: '7px', marginRight: '7px', marginBottom: '30px', fontWeight: 'bold'}}>
            Welcome to financial freedom!
          </Typography>
        </Box>
        <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
          <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
            <Card title="#one" subtitle="Define your inputs" body="Pick your favorite stocks, and lookback period. Don’t worry you can also specify the amount of risk you are willing to take!" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
            <Card title="#two" subtitle="Review your results" body="Go to the dashboard to view the most optimal portfolio distribution, based on your inputs." />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
            <Card title="#three" subtitle="Invest in your future" body="Implement the White Whale portfolio recommendations to see your wallet grow" />
          </Grid>
        </Grid>
        <Box sx={{justifyContent: 'right', width: '100%'}}>
          <ContinueButton />
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
