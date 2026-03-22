import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/admin-dashboard'

export default async function AdminPage() {
  const supabase = await createServerClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  // Get stats
  const [usersData, chatsData, eventsData, clubsData] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('chats').select('id', { count: 'exact' }),
    supabase.from('events').select('id', { count: 'exact' }),
    supabase.from('clubs').select('id', { count: 'exact' }),
  ])

  const stats = {
    totalUsers: usersData.count || 0,
    totalChats: chatsData.count || 0,
    totalEvents: eventsData.count || 0,
    totalClubs: clubsData.count || 0,
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard stats={stats} />
    </main>
  )
}
