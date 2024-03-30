import React from 'react';
import TopBar from '../components/TopBar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
//piechart inputs
import PieChartGraph from '../components/PieChartGraph';
//heatmap inputs
import { Heatmap } from '../components/Heatmap';
//get values for investment amount
import { useSelector } from 'react-redux';
import MEFScatter from '../components/MEFScatter';
import HistScatter from '../components/HistScatter';
import PortScatter from '../components/PortScatter';



const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const OutputPage = () => {

  const investmentAmount = useSelector(state => state.inputs.investmentAmount);
  const formattedInvestmentAmount = parseFloat(investmentAmount).toFixed(2);
  const projectedAmount = useSelector(state => state.outputs.sixmonth_projected_amount);
  const formattedProjectedAmount = parseFloat(projectedAmount).toFixed(2);
  const sent = useSelector(state => state.outputs.senti);

  //const initialInvestmentAmount = 10000; // Placeholder value
  //const projectedInvestmentAmount = 15000; // Placeholder value

  return (
    <>
      <TopBar />
      <Grid sx={{ width: '95%', mx: 'auto', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{ marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%' }}>
          Your Optimal Portfolio!
        </Typography>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px', flex: 1}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white'}}>Initial Investment Amount</Typography>
            <Typography variant="h1" style={{ marginTop: '1vh', fontSize: '7vh', fontWeight: 'bold', color: 'white'}}>${formattedInvestmentAmount}</Typography>
            <Typography variant="body1" style={{ marginTop: '2vh', fontSize: '1.5vh',color: '#FFECB3' }}>This amount is the inital investment capital alloted to this calculation.</Typography>
          </StyledBox>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px', flex: 1}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white' }}>Projected Investment Amount</Typography>
            <Typography variant="h1" style={{ marginTop: '1vh', fontSize: '7vh', fontWeight: 'bold', color: 'white' }}>${formattedProjectedAmount}</Typography>
            <Typography variant="body1" style={{ marginTop: '2vh', fontSize: '1.5vh',color: '#FFECB3' }}>This is the current projected amount for the optimal portfolio suggested for a 6-month period.</Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={8} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white'}}>Optimal Allocation</Typography>
            <PieChartGraph />
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white'}}>Correlation Matrix</Typography>
            <Heatmap width={900} height={600}/>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white'}}>Markowitz Efficient Frontier (MEF)</Typography>
            {/* add MEF plot */}
            <MEFScatter/> 
              
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white'}}>Historical Trend</Typography>
            {/* add Historical Data plot */}

            <HistScatter />
            
          </StyledBox>

        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white'}}>Portfolio</Typography>
            {/* add Historical Data plot */}

            <PortScatter />
            
          </StyledBox>

        </Grid>
      </Grid>
    </>
  );
};

export default OutputPage;