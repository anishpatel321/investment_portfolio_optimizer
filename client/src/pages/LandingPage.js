import '../index.css';
import React, { useEffect } from 'react';
import {Typography, Grid } from '@mui/material';
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
      <Grid sx={{ width: '95%', mx: 'auto', color:'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%'}}>
          Welcome to financial freedom!
        </Typography>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
          <Card title="#one" subtitle="Define your inputs" body="Pick your favorite stocks, and lookback period. Don’t worry you can also specify the amount of risk you are willing to take!" height={'60vh'} hasNumberPill={true} hasTransition={true}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
          <Card title="#two" subtitle="Review your results" body="Go to the dashboard to view the most optimal portfolio distribution, based on your inputs." height={'60vh'} hasNumberPill={true} hasTransition={true}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
          <Card title="#three" subtitle="Invest in your future" body="Implement the White Whale portfolio recommendations to see your wallet grow" height={'60vh'} hasNumberPill={true} hasTransition={true}/>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', width: '95%', mx: 'auto', justifyContent: 'flex-end', marginTop: '0%'}}>
          <ContinueButton/>
      </Grid>
    </>
  );
};

export default LandingPage;
