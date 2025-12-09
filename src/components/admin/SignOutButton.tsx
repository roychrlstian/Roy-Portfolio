"use client"
import React from 'react'
import { supabaseClient } from '@/lib/supabaseClient'

export default function SignOutButton() {
  const handleSignOut = async () => {
    await supabaseClient.auth.signOut()
    if (typeof window !== 'undefined') window.location.href = '/login'
  }
  return (
    <button onClick={handleSignOut} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded">Sign out</button>
  )
}
