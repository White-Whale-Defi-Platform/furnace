import { fetchState } from '@/app/apps/eris-protocol/amplifier/queries'

export const GET = async (): Promise<Response> => await fetchState().then(response => new Response(JSON.stringify(response)))
