import type { ChainName } from '@/constants'
import { exploreTx, formatHash } from '@/util'
import type { DeliverTxResponse } from '@cosmjs/stargate'
import { Button, Card, Divider, Stack, Typography } from '@mui/material'
import type { FC } from 'react'

interface Props {
  deliveryTxResp: DeliverTxResponse
  chainName: ChainName
}
export const TransactionModal: FC<Props> = ({ deliveryTxResp, chainName }): JSX.Element => {
  const { code, height, transactionHash } = deliveryTxResp
  return (
    <Card elevation={1} sx={theme => ({ width: 256, p: theme.spacing(2) })}>
      <Stack direction="column" alignItems="center" justifyContent="center" gap={1}>
        <Typography variant="h6" textAlign="center">{code === 0 ? 'Success' : 'Failure'}</Typography>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography>Height</Typography>
          <Typography>{height}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography>Hash</Typography>
          <Typography>{formatHash(transactionHash)}</Typography>
        </Stack>
        <Divider />
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => window.open(exploreTx(transactionHash, chainName), '_blank')}
        >
          Explore
        </Button>
      </Stack>
    </Card>
  )
}
