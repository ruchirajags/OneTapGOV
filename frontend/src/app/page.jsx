'use client'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push('/signup')}> Get started </button>
      <button onClick={() => router.push('/login')}>Log in</button>
    </div>
  );
}
