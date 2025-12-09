"use client"
import React from 'react'

export type ToastType = 'success' | 'error' | 'info'
export type ToastItem = { id: string; message: string; type?: ToastType }

const ToastContext = React.createContext<{ push: (t: { message: string; type?: ToastType }) => void } | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const push = React.useCallback((t: { message: string; type?: ToastType }) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 9)
    const item: ToastItem = { id, message: t.message, type: t.type ?? 'info' }
    setToasts((s) => [item, ...s])
    // auto remove after 4s
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id))
    }, 4000)
  }, [])

  const remove = React.useCallback((id: string) => {
    setToasts((s) => s.filter((x) => x.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div aria-live="polite" className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div key={t.id} className={`rounded p-3 shadow-lg border ${t.type === 'success' ? 'bg-emerald-600/95' : t.type === 'error' ? 'bg-rose-600/95' : 'bg-sky-600/95'} text-white`}> 
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm">{t.message}</div>
              <button onClick={() => remove(t.id)} className="ml-2 text-xs opacity-90">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
