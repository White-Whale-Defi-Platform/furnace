import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ENDPOINTS } from './constants'

export function middleware (request: NextRequest): NextResponse | undefined {
  const pathSections = request.nextUrl.pathname.split('/')
  if (pathSections.length === 3 && !(pathSections[1] in ENDPOINTS) && !pathSections[2].includes('.')) { return NextResponse.redirect(new URL('/', request.url)) }
}
