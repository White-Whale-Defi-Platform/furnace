'use client'
import { Avatar, Button, InputAdornment, TextField, Typography } from '@mui/material'
import type { FC } from 'react'
import type { Asset } from '@/types'
import { useModal } from '../provider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SelectAssetModal } from '../modals/SelectAssetModal'

export interface AssetInputProps {
  asset: Asset
  value: string
  label: string
  helperText: string
  assets?: Asset[]
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  onAssetChange?: (asset: Asset) => void
  invalidAmount?: boolean
  prefillClick?: () => void
}

export const AssetInput: FC<AssetInputProps> = ({ asset, prefillClick, value, label, disabled, onChange, helperText, invalidAmount, assets = Array<Asset>(), onAssetChange = () => undefined }) => {
  const modal = useModal()

  const isMultiAsset = assets.length > 1

  return (
    <TextField
      sx={{ cursor: 'pointer' }}
      color={(invalidAmount ?? false) ? 'error' : 'primary'}
      fullWidth
      disabled={disabled}
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      FormHelperTextProps={
        {
          onClick: prefillClick
        }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              color="inherit"
              disabled={!isMultiAsset}
              startIcon={<Avatar src={asset.logo} sx={{ width: 24, height: 24 }} />}
              endIcon={isMultiAsset && <KeyboardArrowDownIcon />}
              onClick={() => modal.open(<SelectAssetModal assets={assets} callback={onAssetChange} />)}
            >
              <Typography
                sx={{
                  textTransform: 'none'
                }}
              >
                {asset.name}
              </Typography>
            </Button>
          </InputAdornment>
        )
      }}
    />
  )
}
