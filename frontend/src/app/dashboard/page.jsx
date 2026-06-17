'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import ChatAssistant from './ChatAssistant'
import RecommendedSchemesButton from '../../components/dashboard/RecommendedSchemesButton'

export default function Dashboard() {
  const [profile, setProfile] = useState({ full_name: '', preferred_language: '' })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

      const { data, error } = await supabase
          .from('profiles')
          .select('full_name, preferred_language')
          .eq('id', user.id)
          .single()

        if (error) {
          console.warn('Profile read error:', error.message)
        }

        setProfile({
          full_name: data?.full_name || user.user_metadata?.full_name || user.email || 'User',
          preferred_language: data?.preferred_language || user.user_metadata?.preferred_language || 'en',
        })
      } catch (e) {
        console.error('Failed to load profile', e)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [router])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('Logout failed', e)
    }
    router.push('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)', padding: 24, fontFamily: 'Inter, system-ui, -apple-system' }}>
      <header style={{ maxWidth: 'var(--container)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>OneTap<span style={{ color: '#2563EB' }}>GOV</span></div>
          <div style={{ color: '#64748B', fontSize: 13 }}>{loading ? '' : `Welcome back, ${profile.full_name}`}</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>Dashboard</button>
          <button onClick={() => router.push('/profile')} style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: 10 }}>Profile</button>
          <button onClick={handleLogout} style={{ background: '#EF4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 10, cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <main style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        {/* Left column: concise panels */}
        <section>
          <div style={{ background: '#fff', border: '1px solid #E6EEF8', borderRadius: 12, padding: 20, boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0F172A' }}>Overview</h2>
            <p style={{ color: '#64748B', marginTop: 8 }}>Quick access to your recommendations and assistant.</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <div style={{ flex: 1, background: '#FAFEFB', borderRadius: 10, padding: 12, border: '1px solid #E6F6EE' }}>
                <div style={{ fontSize: 13, color: '#0F172A', fontWeight: 600 }}>Profile</div>
                <div style={{ color: '#475569', marginTop: 6 }}>{profile.full_name || '—'}</div>
              </div>

              <div style={{ width: 140, background: '#FFF7ED', borderRadius: 10, padding: 12, border: '1px solid #FEEBC8' }}>
                <div style={{ fontSize: 13, color: '#92400E', fontWeight: 600 }}>Language</div>
                <div style={{ color: '#92400E', marginTop: 6, textTransform: 'capitalize' }}>{profile.preferred_language}</div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <RecommendedSchemesButton />
            </div>
          </div>

          {/* Chat assistant panel - compact height */}
          <div style={{ marginTop: 20 }}>
            <ChatAssistant />
          </div>
        </section>

        {/* Right column: minimal card */}
        <aside>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 18, boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Next steps</h3>
            <ul style={{ marginTop: 12, color: '#64748B', paddingLeft: 18 }}>
              <li>Review recommended schemes</li>
              <li>Complete any missing profile details</li>
              <li>Use chat assistant for guidance</li>
            </ul>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button onClick={() => router.push('/profile')} style={{ flex: 1, padding: '10px 12px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 10 }}>Edit Profile</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
