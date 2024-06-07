'use client'
import {
  Avatar,
  Button,
  InputAdornment,
  Skeleton,
  TextField,
  Typography
} from '@mui/material'
import type { FC } from 'react'
import type { Asset } from '@/types'
import { useModal } from '../provider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SelectAssetModal } from '../modals/SelectAssetModal'

export type AssetInputProps = {
  value: string
  label: string
  helperText: string
  asset: Asset
} & (
  | {
    assets?: Asset[]
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    onAssetChange?: (asset: Asset) => void
    invalidAmount?: boolean
    prefillClick?: () => void
    loading?: false
  }
  | {
    loading: true
  }
)

export const AssetInput: FC<AssetInputProps> = ({
  asset,
  label,
  value,
  helperText,
  ...props
}) => {
  const modal = useModal()

  // While the data is still loading
  if (props.loading ?? false) {
    return (
      <TextField
        sx={{ cursor: 'pointer' }}
        fullWidth
        disabled
        label={label}
        value={value}
        onChange={() => undefined}
        helperText={helperText}
        FormHelperTextProps={{
          onClick: () => undefined
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                disabled
                startIcon={
                  <Skeleton variant="circular">
                    <Avatar
                      src=""
                      sx={{ width: 24, height: 24, background: 'none' }}
                    />
                  </Skeleton>
                }
                onClick={() => undefined}
              >
                <Skeleton>
                  <Typography
                    sx={{
                      textTransform: 'none'
                    }}
                  >
                    {asset.name}
                  </Typography>
                </Skeleton>
              </Button>
            </InputAdornment>
          )
        }}
      />
    )
  }

  const { assets, onChange, disabled, onAssetChange, prefillClick } = props
  const isMultiAsset = assets?.length > 1

  return (
    <TextField
      sx={{ cursor: 'pointer' }}
      color={props.invalidAmount ?? false ? 'error' : 'success'}
      fullWidth
      disabled={disabled}
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      FormHelperTextProps={{
        onClick: prefillClick
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              disabled={!isMultiAsset}
              startIcon={
                <Avatar
                  src={asset.logo}
                  sx={{ width: 24, height: 24, background: 'none' }}
                />
              }
              endIcon={isMultiAsset && <KeyboardArrowDownIcon />}
              onClick={() =>
                modal.open(
                  <SelectAssetModal assets={assets} callback={onAssetChange} />
                )
              }
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
