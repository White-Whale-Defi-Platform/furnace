import { type FC, useCallback } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'

export interface LeaveWebsiteModalProps {
  url: string
}

export const LeaveWebsiteModal: FC<LeaveWebsiteModalProps> = ({ url }): JSX.Element => {
  const onProceed = useCallback(() => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [url])

  return (
    <Card sx={{ maxWidth: 640, p: 2 }}>
      <CardHeader title="Be Careful" subheader="You are leaving" />
      <CardContent>
        <Typography variant='body1'>
          By proceeding to <Typography component="span" color="GrayText">{url}</Typography>, you acknowledge that the Furnace makes no representation regarding the quality of the external page and assumes no responsibility for its content or services.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="inherit" onClick={onProceed} sx={{ textTransform: 'none' }}>
          Proceed
        </Button>
      </CardActions>
    </Card >
  )
}
