'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    // NEW: Insert into profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
        })

      if (profileError) {
        alert(profileError.message)
        return
      }
    }

    alert('Check your email for confirmation')
    router.push('/login')
  }

  return (
    <div>
          <div>
            <h2>Welcome</h2>
            <p>Signup with Email</p>

             <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <br/><br/>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br/>

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br/>

            <button onClick={handleSignup}>Create Account</button>

            <div>
              <p>Already have an account?</p>
              <p onClick={() => router.push('/login')}>Log in</p>
            </div>
          </div> 
    </div>
    
  )
}
