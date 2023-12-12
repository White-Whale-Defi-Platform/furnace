'use client'
import React, { createContext, useContext, useState, type PropsWithChildren, type FC } from 'react'
import Modal from '@mui/material/Modal'

// Todo: Comment
interface ModalContextType {
  open: (content: JSX.Element) => void
  close: () => void
}

// Todo: Comment
const ModalContext = createContext<ModalContextType>({
  open: () => undefined,
  close: () => undefined
})

// Todo: Comment
export const useModal = (): ModalContextType => useContext(ModalContext)

// Todo: Comment
export const ModalProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>)
  const [isVisible, changeVisibility] = useState(false)

  const open = (content: JSX.Element): void => {
    setModalContent(content)
    changeVisibility(true)
  }

  const close = (): void => changeVisibility(false)

  return (
    <ModalContext.Provider
      value={{ open, close }}
    >
      {children}
      <Modal
        open={isVisible}
        onClose={close}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}
