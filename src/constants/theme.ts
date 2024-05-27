'use client'
import { createTheme } from '@mui/material'

export const darkTheme = createTheme({  
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff94',
    },
    secondary: {
      main: '#8A91A3',
    },
    background: {
      default: '#0a0c12',
      paper: '#10131a',
    },  
},
components: { 
  MuiDialog: {
  styleOverrides: {
    paper: {
     background: "#10131A",
     borderRadius: "5px",
     border: "2px solid #2E3443",
    },
  },
 },
 MuiCard: {
  styleOverrides: {
    root: {
      border: "2px solid #2E3443",
    },
  },
 },
}
})
