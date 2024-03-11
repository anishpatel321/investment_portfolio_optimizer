// // src/components/TopBar.js
// import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import Logo from '../logo.svg';

// const TopBar = () => (
//   <AppBar position="static" color="transparent" elevation={0}>
//     <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
//       <IconButton edge="start" color="inherit" aria-label="logo">
//         <img src={Logo} alt="Logo" />
//       </IconButton>
//       <Box>
//         <Button color="inherit" component={RouterLink} to="/begin">Begin</Button>
//         <Button color="inherit" component={RouterLink} to="/top5">Top 5 picks</Button>
//         <Button color="inherit" component={RouterLink} to="/about">About</Button>
//       </Box>
//     </Toolbar>
//   </AppBar>
// );

// export default TopBar;

// src/components/TopBar.js
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../logo.svg';

const TopBar = () => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton edge="start" color="inherit" aria-label="logo">
        <img src={Logo} alt="Logo" />
      </IconButton>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button color="inherit" component={RouterLink} to="/begin">Begin</Button>
        <Button color="inherit" component={RouterLink} to="/top5">Top 5 picks</Button>
        <Button color="inherit" component={RouterLink} to="/about">About</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default TopBar;
