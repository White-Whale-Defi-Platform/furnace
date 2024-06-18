import { styled } from '@mui/material/styles'

const url = 'https://app.kado.money/?apiKey=abdcf5be-6ba1-4b81-a86a-929bc74a8899?onRevCurrency=WHALE'

const KadoIframe = styled('iframe')(({ theme }) => ({
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  width: 480,
  height: 620,
}))

export const KadoModal = (): JSX.Element => <KadoIframe src={url} />
