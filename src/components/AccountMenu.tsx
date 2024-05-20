'use client'
import { WalletStatus } from '@cosmos-kit/core'
import { AccountBox, Campaign, Feedback, Logout, Newspaper, Settings, Support, Paid } from '@mui/icons-material'
import { Avatar, Button, Divider, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { useModal, useSnackbar } from './provider'
import { KadoModal } from './modals/KadoModal'
import { useChains } from '@cosmos-kit/react'
import { ENDPOINTS } from '@/constants'
import { useChainContext } from '@/hooks'

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
  const { status, disconnect, connect, address, chainWallet } = useChainContext(Object.keys(ENDPOINTS)[0])

  console.log('account menu', { status, disconnect, connect, address })

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget)
  const closeMenu = (): void => setAnchorEl(null)
  const snackbar = useSnackbar()

  const onConnect = (): void => {
    snackbar.open('Logging In', 'info')
    // void (((chainWallet?.client.enable) != null)
    //   ? chainWallet.client.enable(
    //     Object.keys(ENDPOINTS)
    //       .map((furnaceChainName) =>
    //         chains.find(({ chain_name: chainName }) => chainName === furnaceChainName)?.chain_id ?? ''))
    //   : Promise.reject(new Error('Chain wallet not available')))
    //   .then(async () => await connect())
    connect()
      // .then(() => ({}))
      .catch(() => snackbar.open('Login Failed', 'error'))
      .finally(() => snackbar.open('Logged In', 'success'))
  }
  const onDisconnect = (): void => {
    void disconnect()
      .then(() => snackbar.open('Logged Out', 'success'))
      .catch(() => snackbar.open('Logout Failed', 'error'))
  }
  const modal = useModal()
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

            <MenuItem sx={{ display: { md: 'none' } }} onClick={() => modal.open(<KadoModal />)}>
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
      }
      {(status === WalletStatus.Disconnected || status === WalletStatus.Rejected) &&
        <LogInButton
          variant="contained"
          onClick={onConnect}
          // onClick={async () => {
          //   console.log('about to enable')
          //   await chainWallet?.client.enable?.(['osmosis-1', 'chihuahua-1'])
          //   // await connect()
          //   await onConnect
          // }}
        >
          Log In
        </LogInButton>
      }
    </>
  )
}
