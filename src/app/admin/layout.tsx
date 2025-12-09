import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Read HttpOnly cookie set by /api/admin/session
  const ck = (await cookies()).get('sb_admin_token')
  const token = ck?.value ?? null
  if (!token) {
    // Not authenticated — redirect to login
    redirect('/login')
  }

  const user = await getUserFromToken(token)
  if (!user) {
    // Invalid token — clear cookie by redirecting to login where client will clear as well
    redirect('/login')
  }

  return <>{children}</>
}
