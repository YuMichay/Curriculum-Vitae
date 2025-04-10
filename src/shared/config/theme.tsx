import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: '"Tektur", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#D3D3D3',
    },
    secondary: {
      main: '#e53935',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    action: {
      hover: '#e53935',
    },
  },
});