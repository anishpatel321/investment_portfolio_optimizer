import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { Box, TextField, Typography, Grid, InputAdornment, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import CardComponent from '../components/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MuiChipsInput } from 'mui-chips-input'
import { useDispatch } from 'react-redux';
import { addTicker, removeTicker, setInvestment,  setRisk,  setLookBack,  setMinAllocation,  setMaxAllocation, packageData, setError} from '../redux/inputs';
import { setData } from '../redux/outputs';
import { Link as RouterLink } from 'react-router-dom'; // Import Link
import OutputPage from './OutputPage'; // Import OutputPage

import { useNavigate } from 'react-router-dom';


const StyledTextField = styled(TextField)(({ transform }) => ({
  backgroundColor: 'white', width: '25vw', borderRadius: '20px',
  border: 'none', outline: 'none', 
  '& label.Mui-focused': {color: 'transparent'},
  '& .MuiInput-underline:after': {borderBottomColor: 'transparent'},
  '& .MuiOutlinedInput-root': {textTransform: transform, fontWeight: 'bold',
                               fontSize: '3vh',
                               '& fieldset': {borderColor: 'transparent'},
                               '&:hover fieldset': {borderColor: 'transparent'},
                               '&.Mui-focused fieldset': {borderColor: 'transparent'},
                               '&.Mui-error fieldset': {borderColor: 'transparent'},
                              },
  '& .MuiOutlinedInput-input': {paddingTop: '0.7vh', paddingBottom: '0.7vh'},
}));

const StyledMuiChipsInput = styled(MuiChipsInput)(({ theme }) => ({
  backgroundColor: 'white', width: '25vw', height: '32.5vh', borderRadius: '20px',
  border: 'none', outline: 'none', '& label.Mui-focused': {color: 'transparent'},
  '& .MuiInput-underline:after': {borderBottomColor: 'transparent'},
  '& .MuiOutlinedInput-root': {textTransform: 'uppercase', height: '10vh',
                               '& fieldset': {borderColor: 'transparent'},
                               '&:hover fieldset': {borderColor: 'transparent'},
                               '&.Mui-focused fieldset': {borderColor: 'transparent'},
                               '&.Mui-error fieldset': {borderColor: 'transparent'}
                              },
  '& .MuiChip-label': {fontSize: '2.8vh', fontWeight: 'bold', padding: '1.3vh'},
  '& .MuiInputBase-root': {height: 'auto', overflowY: 'auto',
                           '&::-webkit-scrollbar': {width: '0'},
                           '&::-webkit-scrollbar-thumb': {backgroundColor: 'transparent'},
                           '&::-webkit-scrollbar-track': {backgroundColor: 'transparent'},
                           },
  '& .MuiButtonBase-root': {marginTop: '1vh'},
}));

const InputPage = () => {
  const [tickers, setTickers] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [riskThreshold, setRiskThreshold] = useState('');
  const [lookBackDate, setLookBackDate] = useState(null);
  const [minAllocationBound, setMinAllocationBound] = useState('');
  const [maxAllocationBound, setMaxAllocationBound] = useState('');
  const [description, setDescription] = useState("");
  const [title_desc, setTitleDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return tickers.length > 0 && investmentAmount && riskThreshold && lookBackDate && minAllocationBound && maxAllocationBound;
  };

  const dispatch = useDispatch(); //dispatch to add or remove tickers
  //const history = useHistory(); // Use useHistory hook to navigate
  const navigate = useNavigate();

  function handleMouseEnter(subtitle, description) {
    setTitleDesc(subtitle)
    setDescription(description);
  }

  function handleMouseLeave() {
    setDescription("");
    setTitleDesc("");
  }

  const validateAllocation = (value) => {
    return value >= 0 && value <= 1;
  };

  const validateInvestAndRisk = (value) => {
    if (value.trim() === '') {
      return true; // No error if the field is empty
    }
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0 && /^-?\d+(\.\d+)?$/.test(value);
  };

  const validateLookBackDate = (selectedDate) => {
    if (!selectedDate) {
      return true; // No error if the field is empty
    }
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return selectedDate instanceof Date && selectedDate < oneWeekAgo;
  };
  

  const handleChipChange = (newChips) => {
    // Convert all new chips to uppercase
    const uppercaseNewChips = newChips.map(chip => chip.toUpperCase());
  
    // Determine if a chip was added or removed by comparing lengths
    if (newChips.length < tickers.length) {
      // A chip was removed
      const removedChips = tickers.filter(ticker => !uppercaseNewChips.includes(ticker));
      if (removedChips.length > 0) {
        const removedTicker = removedChips[0]; // Assuming only one chip is removed at a time
        dispatch(removeTicker(removedTicker));
        console.log("Chip removed:", removedTicker);
      }
    } else {
      // A chip was added
      const addedTicker = uppercaseNewChips.find(chip => !tickers.includes(chip));
      if (addedTicker) {
        dispatch(addTicker(addedTicker));
        console.log("Chip added:", addedTicker);
      }
    }
  
    // Update the tickers state
    setTickers(uppercaseNewChips);
  };
 
  useEffect(() => {
    if (isSubmitting) {
      navigate('/loading');
    }
  }, [isSubmitting]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(setInvestment(investmentAmount));
      dispatch(setRisk(riskThreshold));
      dispatch(setLookBack(new Date().toISOString())); // convert to string
      dispatch(setMinAllocation(minAllocationBound));
      dispatch(setMaxAllocation(maxAllocationBound));
      //dispatch(packageData());

      // FFS const packagedData = useSelector(state => state.inputs.package);

      const data = {
        tickers,
        investmentAmount,
        riskThreshold,
        lookBackDate: lookBackDate.toISOString().split('T')[0],
        minAllocationBound,
        maxAllocationBound,
      };

      console.log("datas ending:", data);

      // navigate('/loading') //nav to loading page while waiting 
      setIsSubmitting(true);

      setTimeout(async () => {
        const response = await fetch('/process_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorResponse = await response.json();
          console.log("Error response:", errorResponse);
          // navigate('/loading')
          dispatch(setError(errorResponse.error))
          return;
        }
        
        console.log("Send successful. Packaged data:", data);
    
        const result = await response.json();
    
        console.log('Algorithm results:', result);  // Log the raw data to the console
    
          // Dispatch an action to update the Redux store with the fetched data
          //dispatch(updateAlgoResults(data));
        dispatch(setData(result)); //set the data that comes from algo
        setIsSubmitting(false);
        navigate('/output');
      }, 2000);
    }
  };  
    
  return (
    <>
      <TopBar home/>
      <Grid sx={{ width: '95%', mx: 'auto', color:'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%'}}>
          Define your portfolio, your way
        </Typography>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} sm={6} md={4} style={{padding: 0}}>
          <CardComponent title="Definitions" subtitle={title_desc || "Input Definitions"} body={description || "Hover over each input item to find out more about what each input means!"} height={'67.5vh'} hastransition={true}/>
        </Grid>
        <Grid item xs={12} sm={6} md={8} style={{padding: 0}}>
          <CardComponent title="Inputs" height={'67.5vh'} hasButton={true} onClick={handleSubmit} hasInputs={true} isDisabled={!isFormValid()}>
            <Box sx={{ position: 'absolute', top: '4.5vh', left: '4vw'}}
              onMouseEnter={() => handleMouseEnter("Tickers", "The Tickers field is where the identifier for each stock is inputted. Type in any stock and press enter to add it to the list. The calculations will be done only on the tickers specified here.")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <Typography variant='h6' style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '1.7vw'}} >Tickers</Typography>
              <StyledMuiChipsInput
                  value={tickers}
                  onChange={handleChipChange}
              />
            </Box>
            <Box sx={{ position: 'absolute', top: '45vh', left: '4vw' }}
              onMouseEnter={() => handleMouseEnter("Investment Amount", "This is the total capital amount you want to invest, please specify a number greater than 0!")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <Typography 
                variant="h6" 
                style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '1.7vw'}} 
              >
                Investment Amount
              </Typography>
              <StyledTextField
                value={investmentAmount}
                onChange={(e) => (setInvestmentAmount(e.target.value))}
                error={!validateInvestAndRisk(investmentAmount)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h5" style={{fontWeight: 'bold'}} >$</Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {!validateInvestAndRisk(investmentAmount) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.7vh'}}>Value must be a number greater than 0</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top: '4.5vh', left: '33.5vw' }}
              onMouseEnter={() => handleMouseEnter("Risk Threshold", "This is the amount of risk you are willing to take! Please enter a positive percentage amount. The Optimal portfolio weights will take this value into account.")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '1.7vw'}} >Risk Threshold</Typography>
              <StyledTextField
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(e.target.value)}
                error={!validateInvestAndRisk(riskThreshold)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant='h4' style={{fontWeight: 'bold', fontSize: '1.7vw'}} >%</Typography>
                    </InputAdornment>
                  ), 
                }}
              />
              {!validateInvestAndRisk(riskThreshold) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.7vh'}}>Value must be a number greater than 0</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top:'18vh', left: '33.5vw' }}
              onMouseEnter={() => handleMouseEnter("Look-Back Date", "The Look-Back Date is the cutoff date for how far back the algorithm pulls the raw adjusted closing prices. This will determine, how much historical data affects the calculation and how far you want to look back.")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '1.7vw'}} >Look-Back Date</Typography>
              <DatePicker
                selected={lookBackDate}
                onChange={(date) => setLookBackDate(date)}
                error={!validateLookBackDate(lookBackDate)}
                dateFormat="yyyy-MM-dd"
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
                popperPlacement='top'
                customInput={
                  <StyledTextField
                    sx={{
                      backgroundColor: 'white',
                      width: '25vw',
                    }}
                  />
                }
              />
              {!validateLookBackDate(lookBackDate) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.7vh'}}>Date must be at least a week before today</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top:'31.5vh', left: '33.5vw' }}
              onMouseEnter={() => handleMouseEnter("Minimum Allocation Bound", "This is the Minimum allocation each stock must take. Make sure to pick a valid minimum amount. For example, if you have 5 stocks, the minimum amount cannot be 0.3 (30%) as we cannot assign each stock a 0.3 of the allocation as the total allocation cannot exceed 1 (100%)")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '1.7vw'}} >Min. Allocation Bound</Typography>
              <StyledTextField
                value={minAllocationBound}
                onChange={(e) => setMinAllocationBound(e.target.value)}
                error={!validateAllocation(minAllocationBound)}
              />
              {!validateAllocation(minAllocationBound) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.7vh'}}>Value must be between 0 and 1</FormHelperText>}
            </Box>
            <Box sx={{ position: 'absolute', top: '45vh', left: '33.5vw' }}
              onMouseEnter={() => handleMouseEnter("Maximum Allocation Bound", "This is the Maximum allocation a stock can have. This number can be whatever you choose, but it cannot me less than or equal to the Minimum amount.")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <Typography variant="h6" style={{ marginLeft: '0.5vw', fontWeight: 'bold', fontSize: '1.7vw'}} >Max. Allocation Bound</Typography>
              <StyledTextField
                value={maxAllocationBound}
                onChange={(e) => setMaxAllocationBound(e.target.value)}
                error={!validateAllocation(maxAllocationBound)}
              />
              {!validateAllocation(maxAllocationBound) && <FormHelperText error style={{marginLeft: '1vw', fontWeight: 'bolder', color:'palevioletred', fontSize: '1.7vh'}}>Value must be between 0 and 1</FormHelperText>}
            </Box>
          </CardComponent>
        </Grid>
      </Grid>
    </>
  );
};

export default InputPage;





