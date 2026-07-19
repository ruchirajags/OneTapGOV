"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { SECTORS } from "../../lib/constants/schemes";

// Full language names — must match what the backend expects.
// chat.py defaults to language = profile.get("preferred_language", "English")
// tts.py's LANG_TO_SARVAM only recognizes these full names (case-insensitive),
// not short codes like "en"/"hi", so this list has to stay in sync with that map.
const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Marathi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Kannada",
  "Gujarati",
  "Malayalam",
  "Odia",
  "Punjabi",
];

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", phone_number: "", sector: "", preferred_language: "English" });
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

        // Two tables hold profile data:
        // - "profiles": stores display info (full_name, email, preferred_language)
        // - "user_basic_info": stores scheme-matching fields (sector, age, gender, etc.)
        // We read both and merge for a complete picture.
        const [{ data: profile }, { data: basicInfo }] = await Promise.all([
          supabase
            .from('profiles')
            .select('full_name,phone_number,sector,preferred_language')
            .eq('id', user.id)
            .maybeSingle(),
          supabase
            .from('user_basic_info')
            .select('sector,preferred_language')
            .eq('user_id', user.id)
            .maybeSingle(),
        ]);

        // Normalize language (handle legacy short codes like "en") to full name
        const rawLang = basicInfo?.preferred_language || profile?.preferred_language || user.user_metadata?.preferred_language;
        const normalizedLang = normalizeLanguage(rawLang);

        setForm({
          full_name: profile?.full_name || user.user_metadata?.full_name || '',
          phone_number: profile?.phone_number || user.user_metadata?.phone_number || '',
          sector: basicInfo?.sector || profile?.sector || '',
          preferred_language: normalizedLang,
        });
      } catch (e) {
        console.error('Failed to load profile', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  // Maps legacy short codes (en, hi, mr, ...) or any-case full names to the
  // canonical full name used in LANGUAGE_OPTIONS. Falls back to "English".
  const normalizeLanguage = (value) => {
    if (!value) return "English";
    const CODE_MAP = {
      en: "English", hi: "Hindi", mr: "Marathi", bn: "Bengali",
      ta: "Tamil", te: "Telugu", kn: "Kannada", gu: "Gujarati",
      ml: "Malayalam", od: "Odia", or: "Odia", pa: "Punjabi",
    };
    const lower = String(value).toLowerCase();
    if (CODE_MAP[lower]) return CODE_MAP[lower];
    const match = LANGUAGE_OPTIONS.find(opt => opt.toLowerCase() === lower);
    return match || "English";
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const errors = [];

      // --- Save to profiles table (display info: full_name, preferred_language) ---
      // profiles table has columns: id, full_name, email, preferred_language
      {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: form.full_name,
            preferred_language: form.preferred_language,
          }, { returning: 'minimal' });
        if (error) errors.push(error.message);
      }

      // --- Save to user_basic_info (scheme-matching fields: sector, preferred_language) ---
      // user_basic_info has columns: user_id, preferred_language, age, gender, state, etc.
      {
        const { error } = await supabase
          .from('user_basic_info')
          .upsert({
            user_id: user.id,
            sector: form.sector,
            preferred_language: form.preferred_language,
          }, { returning: 'minimal' });
        if (error) errors.push(error.message);
      }

      // --- Save phone_number to user_metadata (it lives in auth.users.raw_user_meta_data) ---
      if (form.phone_number) {
        const { error: metaError } = await supabase.auth.updateUser({
          data: { phone_number: form.phone_number },
        });
        if (metaError) errors.push(metaError.message);
      }

      if (errors.length > 0) {
        throw new Error(errors.join('; '));
      }

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
            <select name="preferred_language" value={form.preferred_language} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              {LANGUAGE_OPTIONS.map(lang => (<option key={lang} value={lang}>{lang}</option>))}
            </select>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" disabled={saving} style={{ background: '#2563EB', color: '#fff', padding: '10px 14px', border: 'none', borderRadius: 10 }}>{saving ? 'Saving...' : 'Save profile'}</button>
              <button type="button" onClick={() => { setForm({ full_name: '', phone_number: '', sector: '', preferred_language: 'English' }); setMsg(''); }} style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '10px 14px', borderRadius: 10 }}>Reset</button>
            </div>

            {msg && <div style={{ marginTop: 8, color: msg.includes('success') ? '#16A34A' : '#DC2626' }}>{msg}</div>}
          </form>
        </div>
      </main>
    </div>
  );
}