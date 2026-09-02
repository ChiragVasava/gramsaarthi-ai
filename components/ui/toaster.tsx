"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

const ToastContext = React.createContext<{
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...toast, id }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    // Fallback when used outside provider
    return {
      toast: (props: Omit<ToastProps, "id">) => console.log('Toast:', props),
      toasts: [] as ToastProps[],
    }
  }
  return {
    toast: ctx.addToast,
    toasts: ctx.toasts,
  }
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  React.useEffect(() => {
    const handler = (e: CustomEvent) => {
      const id = Math.random().toString(36).slice(2)
      setToasts(prev => [...prev, { ...e.detail, id }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
    }
    window.addEventListener('toast' as never, handler as EventListener)
    return () => window.removeEventListener('toast' as never, handler as EventListener)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg text-sm max-w-sm",
            "animate-in slide-in-from-bottom-2 fade-in",
            toast.variant === "destructive"
              ? "bg-red-50 border-red-200 text-red-800"
              : toast.variant === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-white border-gray-200 text-gray-800"
          )}
        >
          <div>
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-xs opacity-80 mt-0.5">{toast.description}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// Simple toast function for global use
export function toast(props: { title?: string; description?: string; variant?: "default" | "destructive" | "success" }) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('toast', { detail: props }))
  }
}
