import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
//piechart inputs
import PieChartGraph from '../components/PieChartGraph';
//heatmap inputs
import { Heatmap } from '../components/Heatmap';
//get values for investment amount
import { useSelector } from 'react-redux';
import MEFScatter from '../components/MEFScatter';
import HistScatter from '../components/HistScatter';
import PortScatter from '../components/PortScatter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

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
  const six_mo_projectedAmount = useSelector(state => state.outputs.sixmonth_projected_amount);
  const twelve_mo_projectedAmount = useSelector(state => state.outputs.twelvemonth_projected_amount);
  const formatted_six_ProjectedAmount = parseFloat(six_mo_projectedAmount).toFixed(2);
  const formatted_twelve_ProjectedAmount = parseFloat(twelve_mo_projectedAmount).toFixed(2);
  const sent = useSelector(state => state.outputs.senti);
  const corr_text = useSelector(state => state.outputs.dynamic_corr);
  const pie_text = useSelector(state => state.outputs.dynamic_pie);
  const sentiment = useSelector(state => state.outputs.senti);
  const hist_price_text = "";
  const [value, setValue] = useState('six');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <Grid sx={{ width: '95%', mx: 'auto', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{ marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%' }}>
          Your Optimal Portfolio!
        </Typography>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px', flex: 0.85}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Initial Investment Amount</Typography>
            <Typography variant="h1" style={{ marginTop: '2vh', fontSize: '7.5vh', fontWeight: 'bold', color: 'white'}}>${formattedInvestmentAmount}</Typography>
            <Typography variant="body1" style={{ marginTop: '2vh', fontSize: '2vh',color: '#FFECB3' }}>This amount is the inital investment capital alloted to this calculation.</Typography>
          </StyledBox>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px', flex: 1.15}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block' }}>Projected Investment Amount</Typography>
            <Typography variant="h1" style={{ marginTop: '2vh', fontSize: '7.5vh', fontWeight: 'bold', color: 'white' }}>
              ${value === 'six' ? formatted_six_ProjectedAmount : formatted_twelve_ProjectedAmount}
            </Typography>
            <Typography variant="body1" style={{ marginTop: '2vh', fontSize: '2vh',color: '#FFECB3', paddingBottom: '1vh' }}>This is the current projected amount for the optimal portfolio suggested for a {value === 'six' ? '6-month' : '12-month'} period.</Typography>
            <Box display="flex" justifyContent="center" marginTop={'2vh'}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
                  <FormControlLabel style={{color: 'white'}}
                    value="six"
                    control={<Radio color="primary" style={{color: 'white'}} />}
                    label="6 Months"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel style={{color: 'white'}}
                    value="twelve"
                    control={<Radio color="primary" style={{color: 'white'}} />}
                    label="12 Months"
                    labelPlacement="bottom"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={8} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px', minHeight: '65vh'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Optimal Allocation</Typography>
              <PieChartGraph />
              <div style={{ marginTop: '2vh', padding: '1vw', overflow: 'auto', maxHeight: '25vh'}}>
                <Typography variant="body1" style={{color: 'white', fontSize: '2vh'}}
                  dangerouslySetInnerHTML={{ __html: pie_text || "Filler text to explain this pie chart."}}>
                </Typography>
              </div>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Correlation Matrix</Typography>
            <Heatmap width={650} height={450} text={corr_text}/>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Markowitz Efficient Frontier (MEF)</Typography>
            {/* add MEF plot */}
            <MEFScatter/> 
            <Typography variant="h5" style={{ color: 'white', overflow: 'auto', maxHeight: '20vh', fontSize: '2vh', paddingLeft: '1vw', paddingRight: '0.5vw', paddingBottom: '1vw'}}
              dangerouslySetInnerHTML={{ __html: hist_price_text || "The MEF is a curve that represents the set of portfolios that maximize expected return for each level of risk. The CAL, on the other hand, is a line that shows the best risk-adjusted return for a given level of risk. The CML is a special case of the CAL, drawn through the market portfolio, which includes all risky assets in the market.<br/><br/>To construct the MEF, we generate many random portfolios, each with a different combination of assets. By plotting these portfolios, we can visualize the risk-return trade-off and identify the efficient frontier, which represents the set of optimal portfolios."}}>
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Historical Trend</Typography>
            {/* add Historical Data plot */}
            <HistScatter />
            <Typography variant="h5" style={{ color: 'white', overflow: 'auto', maxHeight: '10vh', fontSize: '2vh', paddingLeft: '1vw', paddingRight: '0.5vw', paddingBottom: '1vw'}}
              dangerouslySetInnerHTML={{ __html: hist_price_text || "This graph shows the historical price data for the lookback period defined. The scale has been adjusted to logscale to make it easier to view to overall price trend for all of the stock tickers historically."}}>
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Portfolio</Typography>
            <PortScatter />
            <Typography variant="h5" style={{ color: 'white', overflow: 'auto', maxHeight: '10vh', fontSize: '2vh', paddingLeft: '1vw', paddingRight: '0.5vw', paddingBottom: '1vw'}}
              dangerouslySetInnerHTML={{ __html: hist_price_text || "This graph shows the historical returns of the portfolio for the lookback period defined. It also shows a linear trendline across to give an overall positive or negative growth indication."}}>
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6} md={12} style={{ padding: 0}}>
          <StyledBox style={{background: '#163A5F', borderRadius: '33px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', margin: '7px'}}>
            <Typography variant="h4" style={{ fontSize: '3vh', fontWeight: 'bold', color: 'white', background: '#192435', borderRadius: '30px', padding: '0.6vh 1vw', display: 'inline-block'}}>Sentiment</Typography>           
            <div style={{ padding: '1vw', paddingRight: '0.5vw', overflow: 'auto'}}>
              <Typography variant="body1" style={{color: 'white', fontSize: '2vh'}}
                dangerouslySetInnerHTML={{ __html: sentiment || "Filler text to explain sentiments."}}>
              </Typography>
            </div>
          </StyledBox>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default OutputPage;