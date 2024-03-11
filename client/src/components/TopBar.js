import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../White-Whale-logo.png'; // Make sure this is a white version of your logo
import { styled } from '@mui/system';

const TopBarButton = styled(Button)({
  fontSize: '100%',
  color: 'white',
  textTransform: 'none',
  margin: '0 2.5vw', // Adjust as needed
});

const TopBar = ({ home }) => (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src={Logo} alt="Logo" style={{ width: '5vw', height: '4vw', paddingLeft: '10%', paddingTop: '10%' }} />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TopBarButton color="inherit" component={RouterLink} to={home ? "/" : "/input"}>
            {home ? "Home" : "Begin"}
          </TopBarButton>
          <TopBarButton color="inherit" component={RouterLink} to="/top5">Top 5 picks</TopBarButton>
          <TopBarButton color="inherit" component={RouterLink} to="/about">About</TopBarButton>
        </Box>
      </Toolbar>
    </AppBar>
);

export default TopBar;
