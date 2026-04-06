import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

const CRON_SECRET = process.env.CRON_SECRET ?? process.env.SUPABASE_CRON_SECRET ?? ''
const DEFAULT_TABLE = process.env.SUPABASE_PING_TABLE ?? 'skills'

function isAuthorized(request: Request) {
  if (!CRON_SECRET) return true

  const headerSecret = request.headers.get('x-cron-secret')
  const bearerSecret = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const querySecret = new URL(request.url).searchParams.get('secret')

  return headerSecret === CRON_SECRET || bearerSecret === CRON_SECRET || querySecret === CRON_SECRET
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabaseServer.from(DEFAULT_TABLE).select('id', { head: true, count: 'exact' }).limit(1)

    if (error) {
      return NextResponse.json({ error: error.message ?? String(error) }, { status: 500 })
    }

    return NextResponse.json({ ok: true, table: DEFAULT_TABLE, pingedAt: new Date().toISOString() })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  return GET(request)
}