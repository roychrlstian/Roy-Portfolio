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

const BUCKET = 'design-assets'

// GET: /api/admin/design?prefix=triad/announcement  -> list public urls
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const url = new URL(req.url)
    const prefix = url.searchParams.get('prefix') ?? ''
    if (!prefix) return NextResponse.json({ error: 'Missing prefix' }, { status: 400 })

    const { data: files, error } = await supabaseServer.storage.from(BUCKET).list(prefix)
    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })

    const urls = (files ?? []).map((f: { name: string }) => {
      const path = `${prefix}/${f.name}`
      const publicData = supabaseServer.storage.from(BUCKET).getPublicUrl(path).data
      return { name: f.name, path, publicUrl: publicData?.publicUrl ?? null }
    })

    return NextResponse.json({ data: urls })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

// POST: form-data { file, prefix }
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const fileUnk = formData.get('file')
  const prefix = formData.get('prefix')
  if (!fileUnk || !(fileUnk instanceof File)) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  if (!prefix || typeof prefix !== 'string') return NextResponse.json({ error: 'Missing prefix' }, { status: 400 })
  const file = fileUnk as File
  const prefixStr = prefix as string

  const fileName = `${Date.now()}_${(file.name ?? 'upload').toString().replace(/\s+/g, '_')}`
  const path = `${prefixStr}/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

  const { data, error } = await supabaseServer.storage.from(BUCKET).upload(path, buffer, { contentType: file.type })
    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })
  const urlData = supabaseServer.storage.from(BUCKET).getPublicUrl(path).data
  const publicUrl = urlData?.publicUrl ?? null
    if (!publicUrl) return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 })

    return NextResponse.json({ data: { name: fileName, path, publicUrl } })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}

// DELETE: JSON { path }
export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const path = body?.path
    if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 })

    const { data, error } = await supabaseServer.storage.from(BUCKET).remove([path])
    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}
