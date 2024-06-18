import React, { type FC, useState } from 'react'
import {
  Avatar,
  Button,
  Box,
  InputAdornment,
  Stack,
  Dialog,
  TextField,
  Typography,
  DialogContent,
  Chip,
  Link,
} from '@mui/material'
import { LocalFireDepartment } from '@mui/icons-material'
import { useRecoilValueLoadable } from 'recoil'
import { allChainAssetsSelector } from '@/state'
import { formatPrettyName } from '@/util'

const FurnaceSearchBar: FC = () => {
  const [open, setOpen] = useState(false)
  const [searchString, setSearchString] = useState('')

  const pair = useRecoilValueLoadable(allChainAssetsSelector)

  // format the getAssetInfo into array then flatten every asset info into one arry
  const assetOptions = Object.entries(pair.valueMaybe() ?? {}).flatMap(
    ([chain, chainInfo]) => chainInfo.map(asset => ({ ...asset, chain }))
  )

  const filteredAssetOptions
    // if searchString is set then do the filtering otherwise just use all assets
    = searchString.length > 0
      ? assetOptions.filter(({ burnAsset, mintAsset, chain }) => {
        return (
        // check if search string matches with from asset symbol
          Boolean(burnAsset.name.toLowerCase().includes(searchString))
          // check if search string matches with to asset symbol
          || Boolean(mintAsset.name.toLowerCase().includes(searchString))
          // check if search string matches with chain name
          || chain.toLowerCase().includes(searchString)
        )
      })
      : assetOptions

  return (
    <Stack>
      <Button
        disabled={pair.state !== 'hasValue'}
        focusRipple
        sx={{
          border: '1px solid #c4825a',
          borderRadius: '7px',
          color: 'primary',
          width: { md: 350, lg: 380 },
          justifyContent: 'start',
          textTransform: 'none',
        }}
        component="label"
        startIcon={<LocalFireDepartment fontSize="large" />}
        onClick={() => { setOpen(true) }}
      >
        Search Asset to burn
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={() => { setOpen(false) }}
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogContent>
          <Stack gap={2}>
            <TextField
              focused
              color="primary"
              fullWidth
              id="outlined-basic"
              label="Search asset to burn"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LocalFireDepartment color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => { setSearchString(e.target.value.toLowerCase()) }}
            />
            <Stack>
              {filteredAssetOptions.length > 0
                ? filteredAssetOptions.map(
                  ({ chain, burnAsset, mintAsset }) => {
                    const fromSymbol = burnAsset.name
                    const toSymbol = mintAsset.name
                    const fromLogo = burnAsset.logo
                    const toLogo = mintAsset.logo
                    return (
                      <Button
                        component={Link}
                        href={`/${chain}/${fromSymbol.toLowerCase()}`}
                        key={`${fromSymbol}${toSymbol}`}
                        sx={{
                          justifyContent: 'space-between',
                          textTransform: 'none',
                        }}
                      >
                        <Stack direction="row">
                          <Box display="flex">
                            <Stack direction="row">
                              <Avatar
                                alt="token img"
                                sx={{ width: 26, height: 26, mr: 1, bgcolor: '#271f1b' }}
                                src={fromLogo}
                              />
                              <Avatar
                                alt="token img"
                                sx={{
                                  width: 26,
                                  height: 26,
                                  mr: 0.5,
                                  left: '-10px',
                                  display: 'absolute',
                                  bgcolor: '#271f1b',
                                }}
                                src={toLogo}
                              />
                            </Stack>
                            <Typography color="white">{`${fromSymbol} / ${toSymbol}`}</Typography>
                          </Box>
                        </Stack>
                        <Chip
                          variant="outlined"
                          size="small"
                          label={formatPrettyName(chain)}
                          sx={{ borderColor: '#d67329', color: '#da813e' }}
                        />
                      </Button>
                    )
                  }
                )
                : 'No Furnace Found'}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default FurnaceSearchBar
