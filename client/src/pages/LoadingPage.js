import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { clearError } from '../redux/inputs'; // Import the clearError action
import ContinueButton from '../components/ContinueButton';

const LoadingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(state => state.inputs.error); // Access the error state from your Redux store
  
    // Replace 'gifUrl' with the direct URL of your GIF
    const gifUrl = 'https://media.tenor.com/YgYpuNhzF8gAAAAi/rift_donald-duck_anim.gif';
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Grid sx={{ width: '95%', mx: 'auto', color: 'white' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center"
                      style={{ marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '300%' }}>
            Loading your Optimal Portfolio...
          </Typography>
        </Grid>
        <img src={gifUrl} alt="Loading..." />
        {error && (
          <>
            <p>Error: {error}</p>
            <ContinueButton onClick={() => {
              navigate('/input');
              dispatch(clearError()); // Dispatch the clearError action when the button is clicked
            }}/>
          </>
        )}
      </div>
    );
  };
  
  export default LoadingPage;