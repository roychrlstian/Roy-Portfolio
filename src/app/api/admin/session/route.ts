import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

async function getUserFromToken(token?: string | null) {
  if (!token) return null
  const url = `${SUPABASE_URL}/auth/v1/user`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: ANON_KEY,
    },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data
}

// POST: { token } -> set httpOnly cookie
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = body?.token
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const res = NextResponse.json({ ok: true })
    // Set a HttpOnly cookie with the token for server-side checks
    const cookieOptions: { httpOnly: boolean; path: string; sameSite: 'lax' | 'strict' | 'none'; secure?: boolean } = {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    }
    // In production we want Secure=true
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
    res.cookies.set('sb_admin_token', token, cookieOptions)
    return res
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

// DELETE: clear cookie
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('sb_admin_token', '', { path: '/', maxAge: 0 })
  return res
}
