import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ContinueButton = () => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 20 }}>
    <Button component={RouterLink} to="/input" variant="contained" color="primary">
      Continue
    </Button>
  </Box>
);

export default ContinueButton;
