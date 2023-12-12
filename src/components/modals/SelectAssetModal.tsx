import { type FC, useState } from 'react'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { formatAmount } from '@/util'
import type { Asset } from '@/types'

export interface SelectAssetModalProps {
  assets: Asset[]
  callback: (asset: Asset) => void
}

export const SelectAssetModal: FC<SelectAssetModalProps> = ({ assets, callback }): JSX.Element => {
  const [input, setInput] = useState('')

  return (
    <Card sx={{ width: '100%', maxWidth: 512 }}>
      <CardHeader title="Select Asset" />
      <CardContent >
        <TextField
          fullWidth
          label="Search"
          size="small"
          onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setInput(value)}
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </CardContent>
      <CardContent sx={{ maxHeight: '30vh', overflow: 'auto' }}>
        <Stack direction="column" spacing={1}>
          {
            assets
              .filter((asset) => asset.name.startsWith(input))
              .map((asset, i) => (
                <Button key={i} color="inherit" onClick={() => callback(asset)}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" width='100%'>
                    <Avatar src={asset.logo} sx={{ width: 24, height: 24 }} />
                    <Typography sx={{ textTransform: 'none' }}>
                      {formatAmount(asset)} {asset.name}
                    </Typography>
                  </Stack>
                </Button>
              ))
          }
        </Stack>
      </CardContent>
    </Card>
  )
}
