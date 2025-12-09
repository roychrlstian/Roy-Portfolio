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

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const fileUnk = formData.get('file')
    if (!fileUnk || !(fileUnk instanceof File)) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    const file = fileUnk as File

    const bucket = 'design-assets/project'
    const fileName = `${Date.now()}_${(file.name ?? 'upload').toString().replace(/\s+/g, '_')}`

    // Node/Edge File -> Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, error } = await supabaseServer.storage.from(bucket).upload(fileName, buffer, { contentType: file.type })
    if (error) return NextResponse.json({ error: error.message ?? error }, { status: 500 })

  // get public url
  const urlData = supabaseServer.storage.from(bucket).getPublicUrl(fileName).data
  const publicUrl = urlData?.publicUrl ?? null
    if (!publicUrl) return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 })

    return NextResponse.json({ publicUrl })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message ?? String(err) }, { status: 500 })
  }
}
