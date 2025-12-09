"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import SignOutButton from '@/components/admin/SignOutButton'
import { ToastProvider, useToast } from '@/components/ui/toast'
import { supabaseClient } from '@/lib/supabaseClient'

// Upload file to server-side endpoint which will use the service-role key to store the file
async function uploadFileToServer(file: File) {
  const sessionResp = await supabaseClient.auth.getSession()
  const token = sessionResp?.data?.session?.access_token
  if (!token) throw new Error('Not authenticated')

  const fd = new FormData()
  fd.append('file', file, file.name)

  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd, headers: { Authorization: `Bearer ${token}` } })
  const payload = await res.json()
  if (!res.ok) throw new Error(payload?.error ?? 'Upload failed')
  return payload.publicUrl as string
}

type Skill = { id: string; name: string; category?: string | null }
type Experience = {
  id: string
  company: string
  role: string
  date_start?: string | null
  date_end?: string | null
  order_index?: number | null
}

type Project = {
  id: string
  title: string
  image_url?: string | null
  github_url?: string | null
  is_published?: boolean
  order_index?: number | null
}

export default function AdminPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const sessionResp = await supabaseClient.auth.getSession()
        const token = sessionResp?.data?.session?.access_token
        if (!token) {
          router.replace('/login')
          return
        }
        if (mounted) setCheckingAuth(false)
      } catch {
        router.replace('/login')
      }
    })()
    return () => { mounted = false }
  }, [router])

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1724] text-white">Checking authentication…</div>
    )
  }

  return (
    <ToastProvider>
      <AdminContent />
    </ToastProvider>
  )
}

function AdminContent() {
  const { push } = useToast()
  const [skills, setSkills] = React.useState<Skill[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // form state
  const [newName, setNewName] = React.useState('')
  const [newCategory, setNewCategory] = React.useState('dev')
  // experience state
  const [experiences, setExperiences] = React.useState<Experience[]>([])
  const [expLoading, setExpLoading] = React.useState(false)
  const [expError, setExpError] = React.useState<string | null>(null)

  // projects state
  const [projects, setProjects] = React.useState<Project[]>([])
  const [projLoading, setProjLoading] = React.useState(false)
  const [projError, setProjError] = React.useState<string | null>(null)

  // design assets state
  const [designPrefix, setDesignPrefix] = React.useState('triad/announcement')
  const [designImages, setDesignImages] = React.useState<{ name: string; path: string; publicUrl?: string | null }[]>([])
  const [designLoading, setDesignLoading] = React.useState(false)
  const [designError, setDesignError] = React.useState<string | null>(null)

  // experience form
  const [newCompany, setNewCompany] = React.useState('')
  const [newRole, setNewRole] = React.useState('')
  const [newDateStart, setNewDateStart] = React.useState('')
  const [newDateEnd, setNewDateEnd] = React.useState('')
  const [newOrderIndex, setNewOrderIndex] = React.useState<number | undefined>(undefined)

  // project form
  const [newTitle, setNewTitle] = React.useState('')
  const [newImageUrl, setNewImageUrl] = React.useState('')
  const [newImageFile, setNewImageFile] = React.useState<File | null>(null)
  const [newGithubUrl, setNewGithubUrl] = React.useState('')
  const [newIsPublished, setNewIsPublished] = React.useState(false)
  const [newProjOrderIndex, setNewProjOrderIndex] = React.useState<number | undefined>(undefined)

  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) return err.message
    try {
      const s = String(err)
      // Map common DB permission error to a friendlier message
      if (/permission denied/i.test(s)) {
        return 'Permission denied: your Supabase user does not have permission to modify the "skills" table. Check Row Level Security (RLS) policies or perform this operation from a server-side endpoint using the service role key.'
      }
      return s
    } catch {
      return 'Unknown error'
    }
  }

  const loadSkills = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabaseClient
        .from('skills')
        .select('id, name, category')
        .order('name', { ascending: true })

      if (error) throw error
      setSkills((data ?? []) as Skill[])
    } catch (err: unknown) {
      console.error('Failed to load skills', err)
      setError(getErrorMessage(err))
      push({ message: getErrorMessage(err), type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [push])

  React.useEffect(() => {
    loadSkills()
  }, [loadSkills])

  const loadExperiences = React.useCallback(async () => {
    setExpLoading(true)
    setExpError(null)
    try {
      const { data, error } = await supabaseClient
        .from('experience')
        .select('id, company, role, date_start, date_end, order_index')
        .order('order_index', { ascending: true })

      if (error) throw error
      setExperiences((data ?? []) as Experience[])
    } catch (err: unknown) {
      console.error('Failed to load experience', err)
      setExpError(getErrorMessage(err))
      push({ message: getErrorMessage(err), type: 'error' })
    } finally {
      setExpLoading(false)
    }
  }, [push])

  React.useEffect(() => {
    loadExperiences()
  }, [loadExperiences])

  const loadProjects = React.useCallback(async () => {
    setProjLoading(true)
    setProjError(null)
    try {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('id, title, image_url, github_url, is_published, order_index')
        .order('order_index', { ascending: true })

      if (error) throw error
      setProjects((data ?? []) as Project[])
    } catch (err: unknown) {
      console.error('Failed to load projects', err)
      setProjError(getErrorMessage(err))
      push({ message: getErrorMessage(err), type: 'error' })
    } finally {
      setProjLoading(false)
    }
  }, [push])

  React.useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const designPrefixes = [
    { label: 'Triad — Announcements', value: 'triad/announcement' },
    { label: 'Triad — Events', value: 'triad/event' },
    { label: 'LCUP — Public', value: 'lcup' },
    { label: 'Freelance — Logo', value: 'freelance/logo' },
    { label: 'Freelance — Banner', value: 'freelance/banner' },
  ]

  const loadDesignImages = React.useCallback(async (prefix?: string) => {
    const p = prefix ?? designPrefix
    setDesignLoading(true)
    setDesignError(null)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) throw new Error('Not authenticated')

      const res = await fetch(`/api/admin/design?prefix=${encodeURIComponent(p)}`, { headers: { Authorization: `Bearer ${token}` } })
  const payload = await res.json()
  if (!res.ok) throw new Error(payload?.error ?? 'Failed to list design images')

  setDesignImages((payload.data ?? []) as { name: string; path: string; publicUrl?: string | null }[])
    } catch (err: unknown) {
      console.error('Failed to load design images', err)
      const msg = getErrorMessage(err)
      setDesignError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setDesignLoading(false)
    }
  }, [designPrefix, push])

  React.useEffect(() => {
    loadDesignImages(designPrefix)
  }, [designPrefix, loadDesignImages])

  async function handleUploadDesign(file?: File) {
    if (!file) return
    setDesignLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) throw new Error('Not authenticated')

      const fd = new FormData()
      fd.append('file', file, file.name)
      fd.append('prefix', designPrefix)

      const res = await fetch('/api/admin/design', { method: 'POST', body: fd, headers: { Authorization: `Bearer ${token}` } })
  const payload = await res.json()
  if (!res.ok) throw new Error(payload?.error ?? 'Upload failed')

  const item = payload.data as { name: string; path: string; publicUrl?: string | null }
  setDesignImages((s) => [...(s ?? []), item])
      push({ message: 'Image uploaded', type: 'success' })
    } catch (err: unknown) {
      console.error('Upload failed', err)
      const msg = getErrorMessage(err)
      setDesignError(msg)
      push({ message: `Upload failed: ${msg}`, type: 'error' })
    } finally {
      setDesignLoading(false)
    }
  }

  async function handleDeleteDesign(path: string) {
    if (!confirm('Delete this image?')) return
    setDesignLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) throw new Error('Not authenticated')

      const res = await fetch('/api/admin/design', { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ path }) })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload?.error ?? 'Delete failed')

      setDesignImages((s) => s.filter((x) => x.path !== path))
      push({ message: 'Image deleted', type: 'success' })
    } catch (err: unknown) {
      console.error('Delete failed', err)
      const msg = getErrorMessage(err)
      setDesignError(msg)
      push({ message: `Delete failed: ${msg}`, type: 'error' })
    } finally {
      setDesignLoading(false)
    }
  }

  // uploadImageToBucket is defined at module scope above so ProjectRow can reuse it

  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault()
    if (!newName.trim()) return
    setLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newName.trim(), category: newCategory }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to add skill'
        setError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      // append new skill(s)
      setSkills((s) => [...(s ?? []), ...(payload.data ?? []) as Skill[]])
      setNewName('')
      push({ message: 'Skill added', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to add skill', err)
      const msg = getErrorMessage(err)
      setError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function handleAddExperience(e?: React.FormEvent) {
    e?.preventDefault()
    if (!newCompany.trim() || !newRole.trim()) return
    setExpLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setExpError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ company: newCompany.trim(), role: newRole.trim(), date_start: newDateStart || null, date_end: newDateEnd || null, order_index: newOrderIndex ?? null }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to add experience'
        setExpError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setExperiences((s) => [...(s ?? []), ...(payload.data ?? []) as Experience[]])
      setNewCompany('')
      setNewRole('')
      setNewDateStart('')
      setNewDateEnd('')
      setNewOrderIndex(undefined)
      push({ message: 'Experience added', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to add experience', err)
      const msg = getErrorMessage(err)
      setExpError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setExpLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this skill?')) return
    setLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/skills', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to delete skill'
        setError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setSkills((s) => s.filter((x) => x.id !== id))
      push({ message: 'Skill deleted', type: 'success' })
    } catch (err: unknown) {
      // Fallback: log and show stringified error
      console.error('Failed to delete skill', err)
      try {
        const json = JSON.stringify(err)
        setError(json)
        push({ message: json, type: 'error' })
      } catch {
        const msg = getErrorMessage(err)
        setError(msg)
        push({ message: msg, type: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteExperience(id: string) {
    if (!confirm('Delete this experience entry?')) return
    setExpLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setExpError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/experience', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to delete experience'
        setExpError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setExperiences((s) => s.filter((x) => x.id !== id))
      push({ message: 'Experience deleted', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to delete experience', err)
      const msg = getErrorMessage(err)
      setExpError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setExpLoading(false)
    }
  }

  async function handleUpdate(id: string, name: string, category?: string | null) {
    if (!name.trim()) return
    setLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/skills', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, name: name.trim(), category }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to update skill'
        setError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setSkills((s) => s.map((sk) => (sk.id === id ? ((payload.data ?? [])[0] as Skill) ?? sk : sk)))
      push({ message: 'Skill updated', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to update skill', err)
      const msg = getErrorMessage(err)
      setError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateExperience(id: string, company: string, role: string, date_start?: string | null, date_end?: string | null, order_index?: number | null) {
    if (!company.trim() || !role.trim()) return
    setExpLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setExpError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/experience', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, company: company.trim(), role: role.trim(), date_start: date_start ?? null, date_end: date_end ?? null, order_index: order_index ?? null }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to update experience'
        setExpError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setExperiences((s) => s.map((sk) => (sk.id === id ? ((payload.data ?? [])[0] as Experience) ?? sk : sk)))
      push({ message: 'Experience updated', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to update experience', err)
      const msg = getErrorMessage(err)
      setExpError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setExpLoading(false)
    }
  }

  async function handleAddProject(e?: React.FormEvent) {
    e?.preventDefault()
    if (!newTitle.trim()) return
    setProjLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setProjError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      // If a file was provided, upload it first and get public URL
      let imageUrl: string | null = newImageUrl || null
      if (newImageFile) {
        try {
          imageUrl = await uploadFileToServer(newImageFile)
        } catch (uploadErr: unknown) {
          const msg = getErrorMessage(uploadErr)
          setProjError(msg)
          push({ message: `Image upload failed: ${msg}`, type: 'error' })
          return
        }
      }

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: newTitle.trim(), image_url: imageUrl ?? null, github_url: newGithubUrl || null, is_published: newIsPublished, order_index: newProjOrderIndex ?? null }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to add project'
        setProjError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setProjects((s) => [...(s ?? []), ...(payload.data ?? []) as Project[]])
      setNewTitle('')
  setNewImageUrl('')
  setNewImageFile(null)
      setNewGithubUrl('')
      setNewIsPublished(false)
      setNewProjOrderIndex(undefined)
      push({ message: 'Project added', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to add project', err)
      const msg = getErrorMessage(err)
      setProjError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setProjLoading(false)
    }
  }

  async function handleUpdateProject(id: string, title: string, image_url?: string | null, github_url?: string | null, is_published?: boolean, order_index?: number | null) {
    if (!title.trim()) return
    setProjLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setProjError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      // If caller passed a File via the image_url param (we'll allow callers to upload separately),
      // the ProjectRow will instead call uploadImageToBucket and pass a string URL here. So just forward.
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, title: title.trim(), image_url: image_url ?? null, github_url: github_url ?? null, is_published: is_published ?? false, order_index: order_index ?? null }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to update project'
        setProjError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setProjects((s) => s.map((p) => (p.id === id ? ((payload.data ?? [])[0] as Project) ?? p : p)))
      push({ message: 'Project updated', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to update project', err)
      const msg = getErrorMessage(err)
      setProjError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setProjLoading(false)
    }
  }

  async function handleDeleteProject(id: string) {
    if (!confirm('Delete this project?')) return
    setProjLoading(true)
    try {
      const sessionResp = await supabaseClient.auth.getSession()
      const token = sessionResp?.data?.session?.access_token
      if (!token) {
        setProjError('Not authenticated')
        push({ message: 'Not authenticated', type: 'error' })
        return
      }

      const res = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      })

      const payload = await res.json()
      if (!res.ok) {
        const msg = payload?.error ?? 'Failed to delete project'
        setProjError(msg)
        push({ message: msg, type: 'error' })
        return
      }

      setProjects((s) => s.filter((x) => x.id !== id))
      push({ message: 'Project deleted', type: 'success' })
    } catch (err: unknown) {
      console.error('Failed to delete project', err)
      const msg = getErrorMessage(err)
      setProjError(msg)
      push({ message: msg, type: 'error' })
    } finally {
      setProjLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1724] text-white">
      <main className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-4">Admin</h1>
        <p className="mb-6">This area is protected — only authenticated users can access it.</p>
        <SignOutButton />

        <section className="mt-8 bg-[#08121a] border border-white/5 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <form onSubmit={handleAdd} className="flex gap-2 mb-4">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Skill name" className="flex-1 p-2 rounded bg-[#07101a] border border-white/10" />
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="p-2 rounded bg-[#07101a] border border-white/10">
              <option value="dev">dev</option>
              <option value="design">design</option>
            </select>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded">Add</button>
          </form>

          {loading && <div className="text-sm text-white/60">Loading…</div>}
          {error && <div className="text-sm text-rose-400">{error}</div>}

          <div className="space-y-3">
            {skills.map((s) => (
              <SkillRow key={s.id} skill={s} onDelete={() => handleDelete(s.id)} onUpdate={handleUpdate} />
            ))}
            {skills.length === 0 && !loading && <div className="text-sm text-white/60">No skills found</div>}
          </div>
        </section>
        
        <section className="mt-8 bg-[#08121a] border border-white/5 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Design Assets (storage)</h2>
          <div className="mb-4 flex items-center gap-3">
            <label className="text-sm text-white/60">Folder:</label>
            <select value={designPrefix} onChange={(e) => setDesignPrefix(e.target.value)} className="p-2 rounded bg-[#07101a] border border-white/10">
              {designPrefixes.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadDesign(f) }} className="ml-auto" />
          </div>

          {designLoading && <div className="text-sm text-white/60">Loading…</div>}
          {designError && <div className="text-sm text-rose-400">{designError}</div>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {designImages.map((img) => (
              <div key={img.path} className="bg-[#071018] p-2 rounded flex flex-col items-center">
                {img.publicUrl ? <img src={img.publicUrl} alt={img.name} className="max-h-28 mb-2" /> : <div className="text-xs text-white/60 mb-2">No preview</div>}
                <div className="text-xs text-white/60 mb-2 truncate">{img.name}</div>
                <div className="flex gap-2">
                  <a href={img.publicUrl ?? '#'} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 bg-white/5 rounded">Open</a>
                  <button onClick={() => handleDeleteDesign(img.path)} className="text-xs px-2 py-1 bg-rose-600/30 rounded">Delete</button>
                </div>
              </div>
            ))}
            {designImages.length === 0 && !designLoading && <div className="text-sm text-white/60">No images found in this folder</div>}
          </div>
        </section>

        
        <section className="mt-8 bg-[#08121a] border border-white/5 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded bg-[#07101a] border border-white/10" />
            <div className="w-full p-2 rounded bg-[#07101a] border border-white/10">
              <div className="mb-2 text-xs text-white/60">Project image (upload)</div>
              {newImageFile ? (
                <img src={URL.createObjectURL(newImageFile)} alt="preview" className="max-h-28 mb-2" />
              ) : newImageUrl ? (
                <img src={newImageUrl} alt="preview" className="max-h-28 mb-2" />
              ) : null}
              <input type="file" accept="image/*" onChange={(e) => setNewImageFile(e.target.files?.[0] ?? null)} className="w-full" />
            </div>
            <div className="flex gap-2 md:col-span-2">
              <input value={newGithubUrl} onChange={(e) => setNewGithubUrl(e.target.value)} placeholder="GitHub URL" className="w-1/2 p-2 rounded bg-[#07101a] border border-white/10" />
              <label className="flex items-center gap-2 p-2">
                <input type="checkbox" checked={newIsPublished} onChange={(e) => setNewIsPublished(e.target.checked)} /> Published
              </label>
            </div>
            <input value={newProjOrderIndex ?? ''} onChange={(e) => setNewProjOrderIndex(e.target.value ? Number(e.target.value) : undefined)} placeholder="Order index" className="w-full p-2 rounded bg-[#07101a] border border-white/10 md:col-span-1" />
            <div className="md:col-span-2 flex items-center">
              <button type="submit" disabled={projLoading} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded">Add project</button>
            </div>
          </form>

          {projLoading && <div className="text-sm text-white/60">Loading…</div>}
          {projError && <div className="text-sm text-rose-400">{projError}</div>}

          <div className="space-y-3">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} onDelete={() => handleDeleteProject(p.id)} onUpdate={handleUpdateProject} />
            ))}
            {projects.length === 0 && !projLoading && <div className="text-sm text-white/60">No projects found</div>}
          </div>
        </section>
        
        <section className="mt-8 bg-[#08121a] border border-white/5 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          <form onSubmit={handleAddExperience} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} placeholder="Company" className="w-full p-2 rounded bg-[#07101a] border border-white/10" />
            <input value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Role" className="w-full p-2 rounded bg-[#07101a] border border-white/10" />
            <div className="flex gap-2 md:col-span-2">
              <input value={newDateStart} onChange={(e) => setNewDateStart(e.target.value)} placeholder="Start" className="w-1/2 p-2 rounded bg-[#07101a] border border-white/10" />
              <input value={newDateEnd} onChange={(e) => setNewDateEnd(e.target.value)} placeholder="End" className="w-1/2 p-2 rounded bg-[#07101a] border border-white/10" />
            </div>
            <input value={newOrderIndex ?? ''} onChange={(e) => setNewOrderIndex(e.target.value ? Number(e.target.value) : undefined)} placeholder="Order index" className="w-full p-2 rounded bg-[#07101a] border border-white/10 md:col-span-1" />
            <div className="md:col-span-2 flex items-center">
              <button type="submit" disabled={expLoading} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded">Add experience</button>
            </div>
          </form>

          {expLoading && <div className="text-sm text-white/60">Loading…</div>}
          {expError && <div className="text-sm text-rose-400">{expError}</div>}

          <div className="space-y-3">
            {experiences.map((ex) => (
              <ExperienceRow key={ex.id} exp={ex} onDelete={() => handleDeleteExperience(ex.id)} onUpdate={handleUpdateExperience} />
            ))}
            {experiences.length === 0 && !expLoading && <div className="text-sm text-white/60">No experience entries found</div>}
          </div>
        </section>
      </main>
    </div>
  )
}

function SkillRow({ skill, onDelete, onUpdate }: { skill: Skill; onDelete: () => void; onUpdate: (id: string, name: string, category?: string | null) => void }) {
  const [editing, setEditing] = React.useState(false)
  const [name, setName] = React.useState(skill.name)
  const [category, setCategory] = React.useState(skill.category ?? 'dev')

  return (
    <div className="flex items-center gap-3 bg-[#071018] p-3 rounded">
      {editing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 p-2 rounded bg-[#061018] border border-white/10" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded bg-[#061018] border border-white/10">
            <option value="dev">dev</option>
            <option value="design">design</option>
          </select>
          <button onClick={() => { onUpdate(skill.id, name, category); setEditing(false) }} className="px-3 py-1 bg-white/10 rounded">Save</button>
          <button onClick={() => { setEditing(false); setName(skill.name); setCategory(skill.category ?? 'dev') }} className="px-3 py-1 text-sm">Cancel</button>
        </>
      ) : (
        <>
          <div className="flex-1">
            <div className="font-medium">{skill.name}</div>
            <div className="text-xs text-white/60">{skill.category}</div>
          </div>
          <button onClick={() => setEditing(true)} className="px-3 py-1 bg-white/5 rounded">Edit</button>
          <button onClick={onDelete} className="px-3 py-1 bg-rose-600/30 rounded">Delete</button>
        </>
      )}
    </div>
  )
}

function ExperienceRow({ exp, onDelete, onUpdate }: { exp: Experience; onDelete: () => void; onUpdate: (id: string, company: string, role: string, date_start?: string | null, date_end?: string | null, order_index?: number | null) => void }) {
  const [editing, setEditing] = React.useState(false)
  const [company, setCompany] = React.useState(exp.company)
  const [role, setRole] = React.useState(exp.role)
  const [dateStart, setDateStart] = React.useState(exp.date_start ?? '')
  const [dateEnd, setDateEnd] = React.useState(exp.date_end ?? '')
  const [orderIndex, setOrderIndex] = React.useState<number | undefined>(exp.order_index ?? undefined)

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-[#071018] p-3 rounded">
      {editing ? (
        <>
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="flex-1 p-2 rounded bg-[#061018] border border-white/10" />
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="flex-1 p-2 rounded bg-[#061018] border border-white/10" />
          <input value={dateStart} onChange={(e) => setDateStart(e.target.value)} placeholder="Start" className="p-2 rounded bg-[#061018] border border-white/10" />
          <input value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} placeholder="End" className="p-2 rounded bg-[#061018] border border-white/10" />
          <input value={orderIndex ?? ''} onChange={(e) => setOrderIndex(e.target.value ? Number(e.target.value) : undefined)} placeholder="Order" className="w-24 p-2 rounded bg-[#061018] border border-white/10" />
          <div className="flex gap-2">
            <button onClick={() => { onUpdate(exp.id, company, role, dateStart || null, dateEnd || null, orderIndex ?? null); setEditing(false) }} className="px-3 py-1 bg-white/10 rounded">Save</button>
            <button onClick={() => { setEditing(false); setCompany(exp.company); setRole(exp.role); setDateStart(exp.date_start ?? ''); setDateEnd(exp.date_end ?? ''); setOrderIndex(exp.order_index ?? undefined) }} className="px-3 py-1 text-sm">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <div className="font-medium">{exp.company} — {exp.role}</div>
            <div className="text-xs text-white/60">{exp.date_start}{exp.date_end ? ` — ${exp.date_end}` : ''}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} className="px-3 py-1 bg-white/5 rounded">Edit</button>
            <button onClick={onDelete} className="px-3 py-1 bg-rose-600/30 rounded">Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

function ProjectRow({ project, onDelete, onUpdate }: { project: Project; onDelete: () => void; onUpdate: (id: string, title: string, image_url?: string | null, github_url?: string | null, is_published?: boolean, order_index?: number | null) => void }) {
  const [editing, setEditing] = React.useState(false)
  const [title, setTitle] = React.useState(project.title)
  const [imageUrl, setImageUrl] = React.useState(project.image_url ?? '')
  const [newFile, setNewFile] = React.useState<File | null>(null)
  const [githubUrl, setGithubUrl] = React.useState(project.github_url ?? '')
  const [isPublished, setIsPublished] = React.useState(Boolean(project.is_published))
  const [orderIndex, setOrderIndex] = React.useState<number | undefined>(project.order_index ?? undefined)
  const { push } = useToast()

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-[#071018] p-3 rounded">
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="flex-1 p-2 rounded bg-[#061018] border border-white/10" />
          <div className="flex-1">
            <div className="mb-2 text-xs text-white/60">Current image:</div>
            {imageUrl ? <img src={imageUrl} alt="preview" className="max-h-24 mb-2" /> : <div className="text-xs text-white/60 mb-2">No image</div>}
            <input type="file" accept="image/*" onChange={(e) => setNewFile(e.target.files?.[0] ?? null)} className="w-full p-2 rounded bg-[#061018] border border-white/10" />
          </div>
          <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="GitHub URL" className="flex-1 p-2 rounded bg-[#061018] border border-white/10" />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} /> Published
          </label>
          <input value={orderIndex ?? ''} onChange={(e) => setOrderIndex(e.target.value ? Number(e.target.value) : undefined)} placeholder="Order" className="w-24 p-2 rounded bg-[#061018] border border-white/10" />
          <div className="flex gap-2">
            <button onClick={async () => {
              // if a new file was picked, upload and get public url first
              try {
                let finalImageUrl = imageUrl || null
                if (newFile) {
                  const url = await uploadFileToServer(newFile)
                  finalImageUrl = url
                  setImageUrl(url)
                  setNewFile(null)
                }
                await onUpdate(project.id, title, finalImageUrl ?? null, githubUrl || null, isPublished, orderIndex ?? null)
                push({ message: 'Project saved', type: 'success' })
                setEditing(false)
              } catch (err) {
                console.error('Failed to save project', err)
                push({ message: `Save failed: ${String(err)}`, type: 'error' })
              }
            }} className="px-3 py-1 bg-white/10 rounded">Save</button>
            <button onClick={() => { setEditing(false); setTitle(project.title); setImageUrl(project.image_url ?? ''); setGithubUrl(project.github_url ?? ''); setIsPublished(Boolean(project.is_published)); setOrderIndex(project.order_index ?? undefined) }} className="px-3 py-1 text-sm">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <div className="font-medium">{project.title}</div>
            <div className="text-xs text-white/60">{project.github_url ?? project.image_url}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} className="px-3 py-1 bg-white/5 rounded">Edit</button>
            <button onClick={onDelete} className="px-3 py-1 bg-rose-600/30 rounded">Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
