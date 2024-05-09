'use client'
import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#4bd170',
      main: '#3CCD64',
      dark: '#31c259',
      contrastText: '#000000'
    },
    success: {
      light: '#4bd170',
      main: '#3CCD64',
      dark: '#31c259',
      contrastText: '#000000'
    },
    secondary: {
      light: '#3CCD64',
      main: '#8f2972',
      dark: '#194325',
      contrastText: '#000000'
    },
    background: {
      default: '#18181b',
      paper: '#18181b'
    }
  }
})
