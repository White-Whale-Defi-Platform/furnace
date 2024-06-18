'use client'

import createTheme from '@mui/material/styles/createTheme'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c4825a',
    },
    secondary: {
      main: '#FFFF',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#e88741',
    },
    success: {
      main: '#00FF94',
    },
    background: {
      paper: '#2B2626',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#271f1b',
          borderRadius: '5px',
          border: '1px solid #271f1b',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #2E3443',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          background: '#e58946',
          color: 'white',
        },
        colorSecondary: {
          background: '#6f6868',
          color: 'white',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          opacity: '0.9',
          backgroundColor: '#1d1818',
        },
      },
    },
  },
})
