"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabaseClient'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
  type SupabaseAuthResponse = { data?: { user?: unknown; session?: unknown }; error?: { message?: string } }
  const res = (await supabaseClient.auth.signInWithPassword({ email, password })) as unknown as SupabaseAuthResponse
  // Res shape: { data, error }
  const data = res.data
  const err = res.error

      if (err) {
        setError(err.message ?? 'Sign in failed')
        return
      }

      const user = data?.user
      const session = data?.session

      if (!user) {
        setError('Authentication succeeded but no user object was returned. Check Supabase settings.')
        return
      }

      if (session) {
        try {
          // Send token to server to set HttpOnly cookie for server-side auth checks
          const sessObj = session as unknown as { access_token?: string; accessToken?: string }
          const tokenToSend = sessObj?.access_token ?? sessObj?.accessToken ?? null
          await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: tokenToSend }) })
        } catch (e) {
          // non-fatal — continue to redirect client-side
          console.error('Failed to set server session cookie', e)
        }
        router.push('/admin')
        return
      }

      setError('Sign in completed but no session was created. If your project requires email confirmation, check your inbox.')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08121a] text-white p-8">
      <div className="w-full max-w-md bg-[#0b1320] border border-white/5 rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-4">Admin login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-transparent border border-white/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-transparent border border-white/10"
              required
            />
          </div>

          {error && <div className="text-rose-400 text-sm">{error}</div>}

          <div className="flex items-center justify-start">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>

        {/* debug panel removed to avoid exposing tokens; use server logs for diagnostics */}
      </div>
    </div>
  )
}

