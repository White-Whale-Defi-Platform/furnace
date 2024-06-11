'use client'
import {
  AccountBox,
  Campaign,
  Feedback,
  Logout,
  Newspaper,
  Settings,
  Support,
  Paid
} from '@mui/icons-material'
import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useModal, useSnackbar } from './provider'
import { KadoModal } from './modals/KadoModal'
import { chainIds } from '@/constants'
import { useConnect, useAccount, useDisconnect } from 'graz'

const LogInButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}))

const ProfileAvatar = styled(Avatar)({
  cursor: 'pointer',
  background: '#e98741',
  color: 'white'
})

const AccountDropDownMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 176,
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32
    },
    '& .MuiSvgIcon-root': {
      width: 24,
      height: 24
    },
    '& .MuiTypography-root': {
      fontSize: theme.typography.body2.fontSize,
      fontWeight: theme.typography.body2.fontWeight
    },
    '& .MuiMenuItem-root': {
      padding: theme.spacing(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }
}))

export const AccountMenu = (): JSX.Element => {
  const { data: isConnected } = useAccount({
    chainId: chainIds,
    multiChain: true
  })
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget)
  const closeMenu = (): void => setAnchorEl(null)
  const snackbar = useSnackbar()
  const onConnect = (): void => {
    void connectAsync({ chainId: chainIds })
      .then(() => ({}))
      .then(() => snackbar.open('Logged In', 'success'))
      .catch(() => snackbar.open('Login Failed', 'error'))
  }
  const onDisconnect = (): void => {
    void disconnectAsync({ chainId: chainIds })
      .then(() => snackbar.open('Logged Out', 'success'))
      .catch(() => snackbar.open('Logout Failed', 'error'))
  }

  const modal = useModal()
  return (
    <>
      {isConnected != null && (
        <>
          <Tooltip title="Account" arrow enterDelay={3000}>
            <ProfileAvatar src="/default-avatar.webp" onClick={openMenu} />
          </Tooltip>
          <AccountDropDownMenu
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            onClick={closeMenu}
          >
            <MenuItem
              disableRipple
              sx={{
                '&:hover': { backgroundColor: 'transparent' },
                cursor: 'default'
              }}
            >
              <Avatar src="/default-avatar.webp" />
              <Typography>Anon</Typography>
            </MenuItem>
            <Divider />

            <MenuItem
              sx={{ display: { md: 'none' } }}
              onClick={() => modal.open(<KadoModal />)}
            >
              <Paid />
              <Typography>Buy Whale</Typography>
            </MenuItem>
            <MenuItem disabled>
              <AccountBox />
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Settings />
              <Typography>Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem disabled>
              <Newspaper />
              <Typography>News</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Campaign />
              <Typography>Referrals</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Feedback />
              <Typography>Feedback</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Support />
              <Typography>Support</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={onDisconnect}>
              <Logout />
              <Typography>Log Out</Typography>
            </MenuItem>
          </AccountDropDownMenu>
        </>
      )}
      {isConnected == null && (
        <LogInButton variant="contained" onClick={onConnect}>
          Log In
        </LogInButton>
      )}
    </>
  )
}
