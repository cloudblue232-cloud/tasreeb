'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6 text-right">⚠️ {error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr" placeholder="admin@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
          <input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required dir="ltr" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
          <button id="login-submit-btn" type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
