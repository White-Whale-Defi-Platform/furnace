import { fetchState } from '@/app/apps/backbone-labs/gravedigger/queries'

export const GET = async (): Promise<Response> => await fetchState().then(response => new Response(JSON.stringify(response)))
