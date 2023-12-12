'use client'
import { useChainContext } from '@/hooks'
import { WalletStatus } from '@cosmos-kit/core'
import { AccountBox, Campaign, Feedback, Logout, Newspaper, Settings, Support } from '@mui/icons-material'
import { Avatar, Button, Divider, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { useSnackbar } from './provider'

const LogInButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}))

const ProfileAvatar = styled(Avatar)({
  cursor: 'pointer'
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
  const { status, connect, disconnect } = useChainContext()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget)
  const closeMenu = (): void => setAnchorEl(null)

  const snackbar = useSnackbar()

  const onConnect = (): void => {
    snackbar.open('Logging In', 'info')
    void connect()
      .then(() => ({}))
      .catch(() => snackbar.open('Login Failed', 'error'))
      .finally(() => snackbar.open('Logged In', 'success'))
  }
  const onDisconnect = (): void => {
    void disconnect()
      .then(() => snackbar.open('Logged Out', 'success'))
      .catch(() => snackbar.open('Logout Failed', 'error'))
  }
  return (
    <>
      {status === WalletStatus.Connected &&
        <>
          <Tooltip
            title="Account"
            arrow
            enterDelay={3000}>
            <ProfileAvatar
              src="/default-avatar.webp"
              onClick={openMenu}
            />
          </Tooltip>
          <AccountDropDownMenu
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            onClick={closeMenu}
          >
            <MenuItem
              disableRipple
              sx={{ '&:hover': { backgroundColor: 'transparent' }, cursor: 'default' }}
            >
              <Avatar src="/default-avatar.webp" />
              <Typography>Anon</Typography>
            </MenuItem>
            <Divider />

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
      }
      {(status === WalletStatus.Disconnected || status === WalletStatus.Rejected) &&
        <LogInButton
          variant="contained"
          onClick={onConnect}
        >
          Log In
        </LogInButton>
      }
    </>
  )
}
