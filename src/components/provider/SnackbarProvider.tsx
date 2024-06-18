'use client'
import React, { createContext, type FC, type PropsWithChildren, useContext, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert, { type AlertColor } from '@mui/material/Alert'

interface SnackbarContextType {
  open: (message: string, severity?: AlertColor) => void
  close: () => void
}

const SnackbarContext = createContext<SnackbarContextType>({
  open: () => undefined,
  close: () => undefined,
})

export const useSnackbar = (): SnackbarContextType => useContext(SnackbarContext)

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [snack, setSnack] = useState({ message: '', severity: 'info' as AlertColor })
  const [isVisible, changeVisibility] = useState(false)

  const open = (message: string, severity: AlertColor = 'info'): void => {
    setSnack({ message, severity })
    changeVisibility(true)
  }

  const close = (): void => { changeVisibility(false) }

  return (
    <SnackbarContext.Provider value={{ open, close }}>
      {children}
      <Snackbar
        open={isVisible}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={close}
      >
        <Alert
          variant="filled"
          onClose={close}
          severity={snack.severity}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
