"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { SECTORS } from "../../lib/constants/schemes";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", phone_number: "", sector: "", preferred_language: "en" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('full_name,phone_number,sector,preferred_language')
          .eq('id', user.id)
          .single();

        if (error) {
          console.warn('Profile read error:', error.message);
        }

        setForm({
          full_name: profile?.full_name || user.user_metadata?.full_name || '',
          phone_number: profile?.phone_number || user.user_metadata?.phone_number || '',
          sector: profile?.sector || '',
          preferred_language: profile?.preferred_language || user.user_metadata?.preferred_language || 'en',
        });
      } catch (e) {
        console.error('Failed to load profile', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const upsert = {
        id: user.id,
        full_name: form.full_name,
        phone_number: form.phone_number,
        sector: form.sector,
        preferred_language: form.preferred_language,
      };

      const { error } = await supabase.from('profiles').upsert(upsert, { returning: 'minimal' });
      if (error) throw error;

      setMsg('Profile saved successfully.');
    } catch (err) {
      console.error('Save failed', err);
      setMsg(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (<div style={{ padding: 24 }}>Loading profile...</div>);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)', padding: 24, fontFamily: 'Inter, system-ui, -apple-system' }}>
      <header style={{ maxWidth: 'var(--container)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>OneTap<span style={{ color: '#2563EB' }}>GOV</span></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>Back</button>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Your profile</h1>
          <p style={{ color: '#64748B', marginTop: 8 }}>Complete these details so recommendations work correctly.</p>

          <form onSubmit={handleSave} style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Full name</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />

            <label style={{ fontSize: 13, fontWeight: 600 }}>Phone number</label>
            <input name="phone_number" value={form.phone_number} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />

            <label style={{ fontSize: 13, fontWeight: 600 }}>Sector</label>
            <select name="sector" value={form.sector} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <option value="">Select a sector</option>
              {SECTORS.map(s => (<option key={s.id} value={s.id}>{s.title}</option>))}
            </select>

            <label style={{ fontSize: 13, fontWeight: 600 }}>Preferred language</label>
            <input name="preferred_language" value={form.preferred_language} onChange={handleChange} style={{ padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" disabled={saving} style={{ background: '#2563EB', color: '#fff', padding: '10px 14px', border: 'none', borderRadius: 10 }}>{saving ? 'Saving...' : 'Save profile'}</button>
              <button type="button" onClick={() => { setForm({ full_name: '', phone_number: '', sector: '', preferred_language: 'en' }); setMsg(''); }} style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '10px 14px', borderRadius: 10 }}>Reset</button>
            </div>

            {msg && <div style={{ marginTop: 8, color: msg.includes('success') ? '#16A34A' : '#DC2626' }}>{msg}</div>}
          </form>
        </div>
      </main>
    </div>
  );
}
