import React from 'react';
import TopBar from '../components/TopBar';
import CardComponent from '../components/Card';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
//piechart inputs
import PieChartGraph from '../components/PieChartGraph';
//heatmap inputs
import ReactDOM from 'react-dom';
import HeatmapChart from '../components/HeatmapChart';
import { Heatmap } from '../components/Heatmap';
//get values for investment amount
import { useSelector } from 'react-redux';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const OutputPage = () => {

  const investmentAmount = useSelector(state => state.inputs.investmentAmount);
  const initialInvestmentAmount = 10000; // Placeholder value
  const projectedInvestmentAmount = 15000; // Placeholder value

  return (
    <>
      <TopBar />
      <Grid sx={{ width: '95%', mx: 'auto', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{ marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%' }}>
          The Optimal Portfolio!
        </Typography>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <CardComponent height={'100vh'}>
            {/* Card component covers the whole page and everything is bound within it for
                consistency, this will make graphs smaller but should be fine */}
            <StyledBox sx={{position: 'absolute', width: '47vh', height: '39vh', top: '3vh', right: '3vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <PieChartGraph />
            </StyledBox>
            <Typography variant='h6' style={{ position: 'absolute', left: '3vh', top: '3vh', fontWeight: 'bold', fontSize: '1.7vw'}} >Initial Investment Amount</Typography>
            <StyledBox sx={{position: 'absolute', width: '40vh', height: '7vh', top: '8vh', left: '3vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/*  */}
            </StyledBox>
            <Typography variant='h6' style={{ position: 'absolute', left: '3vh', top: '22vh', fontWeight: 'bold', fontSize: '1.7vw'}} >Projected Investment Amount</Typography>
            <StyledBox sx={{position: 'absolute', width: '40vh', height: '7vh', top: '27vh', left: '3vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/*  */}
            </StyledBox>
            {/* <Typography variant="h6" style={{ position: 'absolute', fontWeight: 'bold', top: '2vh', color: 'black' }}>Initial Investment Amount</Typography>
            <Typography variant="h4" style={{position: 'absolute', top: '3vh', color: 'black'}} >${initialInvestmentAmount}</Typography> */}

          
          </CardComponent>

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
          {/* bad one <HeatmapChart /> */}
            {/* this is the box under the invest and porj amounts, has another pie chart for now */}
          </StyledBox>
          <StyledBox style={{height: '40vh'}}>
            {/* another box under 2nd pie chart */}
            <Heatmap width={600} height={350}/>
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: '0 10px' }}>
          
          {/* -----------------------use investment amount from redux ------------------------------------------------------------------------------------------------- */}

          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Initial Investment Amount</Typography>
            <Typography variant="h4">${investmentAmount}</Typography>  {/* Use investmentAmount here */}
          </StyledBox>

          <StyledBox style={{height: '30vh', alignItems: 'center'}}>
            {/* another box with mismatched height, change as needed */}
             
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