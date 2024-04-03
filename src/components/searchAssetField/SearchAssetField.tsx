import React, { type FC, useState } from 'react'
import { assets } from 'chain-registry'
import { Avatar, Button, Box, InputAdornment, Stack, Dialog, TextField, Typography, DialogContent, Chip } from '@mui/material'
import { Search } from '@mui/icons-material'

// This is dummy data to display the assets on the search select drop down
const getAssetInfo = {
  migaloo: [{
    from: assets.find(({ chain_name }) => chain_name === 'migaloo')?.assets.find(({ symbol }) => symbol === 'WHALE'),
    to: assets.find(({ chain_name }) => chain_name === 'migaloo')?.assets.find(({ symbol }) => symbol === 'ASH')
  },
  {
    from: assets.find(({ chain_name }) => chain_name === 'migaloo')?.assets.find(({ symbol }) => symbol === 'GUPPY'),
    // I used the FABLE as a filler since there is no GASH in the chain registry
    to: assets.find(({ chain_name }) => chain_name === 'migaloo')?.assets.find(({ symbol }) => symbol === 'FABLE')
  }],
  chihuahua: [{
    from: assets.find(({ chain_name }) => chain_name === 'chihuahua')?.assets.find(({ symbol }) => symbol === 'HUAHUA'),
    to: assets.find(({ chain_name }) => chain_name === 'chihuahua')?.assets.find(({ symbol }) => symbol === 'PUPPY')
  }]
}

const SearchAssetField: FC = () => {
  // format the getAssetInfo into array then flatten every asset info into one arry
  const assetOptions = Object.entries(getAssetInfo).flatMap(([chain, chainInfo]) => chainInfo.map((asset) => ({ ...asset, chain })))
  const [open, setOpen] = useState(false)
  const [searchString, setSearchString] = useState('')

  // if searchString is set then do the filtering otherwise just use all assets
  const filteredAssetOptions = (searchString.length > 0)
    ? assetOptions.filter(({ from, to, chain }) => {
      return (
        // check if search string matches with from asset symbol
        Boolean(from?.symbol.toLowerCase().includes(searchString)) ||
        // check if search string matches with to asset symbol
        Boolean(to?.symbol.toLowerCase().includes(searchString)) ||
        // check if search string matches with chain name
            chain.toLowerCase().includes(searchString)
      )
    })
    : assetOptions
  return (
    <Stack sx={{ width: '40%' }}>
      <Button
      focusRipple
      sx={{ border: 'unset', background: '#18181b', color: 'white', '&:hover': { bgcolor: 'black' } }}
        component="label"
        role={undefined}
        variant="outlined"
        startIcon={<Search />}
        onClick={() => setOpen(true)}
      >
        Search Assets
      </Button>
       <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)} >
            <DialogContent>
                <Stack gap={2}>
                <TextField focused fullWidth id="outlined-basic" label="Search for Assets" variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                           <Search />
                         </InputAdornment>
                      )
                    }}
                    onChange={(e) => setSearchString(e.target.value.toLowerCase())}
                />
                {filteredAssetOptions.length > 0
                  ? filteredAssetOptions.map((option) => (
                    <Button href={`/${option.chain}/${(option.from?.symbol)?.toLowerCase()}`} key={`${option.from?.symbol}${option.to?.symbol}`} sx={{ justifyContent: 'space-between' }}>
                      <Stack direction="row"><Box display={'flex'}key={`${option.from?.symbol}${option.to?.symbol}`}>
      <Stack direction="row">
        <Avatar alt="token img" sx={{ width: 24, height: 24, mr: 1 }} src={option.from?.logo_URIs?.png ?? option.from?.logo_URIs?.svg}/>

      <Avatar alt="token img" sx={{ width: 24, height: 24, mr: 0.5, left: '-10px', display: 'absolute' }} src={option.to?.logo_URIs?.png ?? option.to?.logo_URIs?.svg}/>
      </Stack>
      <Typography color='white'>{`${option.from?.symbol} / ${option.to?.symbol}`}</Typography>
      </Box></Stack> <Chip variant="outlined" size="small" label={option.chain}/></Button>))
                  : 'No Furnace Found'}

                 <Stack>
                 </Stack>
                </Stack>
            </DialogContent>
      </Dialog>
    </Stack>

  )
}

export default SearchAssetField
