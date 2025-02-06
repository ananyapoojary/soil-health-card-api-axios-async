import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' }, // Green
    secondary: { main: '#FF9800' }, // Orange
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;
