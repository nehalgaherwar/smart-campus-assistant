'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      Logout
    </Button>
  )
}
