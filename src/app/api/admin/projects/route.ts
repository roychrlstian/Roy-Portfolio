import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

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

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabaseServer
      .from('projects')
      .select('id, title, image_url, github_url, is_published, order_index')
      .order('order_index', { ascending: true })
    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const user = await getUserFromToken(token)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const title = body.title?.trim()
    const image_url = body.image_url?.trim() ?? null
    const github_url = body.github_url?.trim() ?? null
    const is_published = !!body.is_published
    const order_index = body.order_index ?? null

    if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })

    const { data, error } = await supabaseServer
      .from('projects')
      .insert([{ title, image_url, github_url, is_published, order_index }])
      .select('id, title, image_url, github_url, is_published, order_index')

    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const id = body.id
    const title = body.title?.trim()
    const image_url = body.image_url?.trim() ?? null
    const github_url = body.github_url?.trim() ?? null
    const is_published = body.is_published ?? false
    const order_index = body.order_index ?? null

    if (!id || !title) return NextResponse.json({ error: 'Missing id or title' }, { status: 400 })

    const { data, error } = await supabaseServer
      .from('projects')
      .update({ title, image_url, github_url, is_published, order_index })
      .eq('id', id)
      .select('id, title, image_url, github_url, is_published, order_index')

    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const id = body.id
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { data, error } = await supabaseServer.from('projects').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}
