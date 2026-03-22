'use client'

import { User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import LogoutButton from '@/components/auth/logout-button'

interface DashboardClientProps {
  user: User | null
  profile: any
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
  const [events, setEvents] = useState<any[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [eventsRes, clubsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/clubs'),
      ])

      const eventsData = await eventsRes.json()
      const clubsData = await clubsRes.json()

      setEvents(eventsData.events || [])
      setClubs(clubsData.clubs || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="space-y-1 animate-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Smart Campus
                </h1>
                <p className="text-xs text-muted-foreground">Welcome, {user?.email}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/chat">
              <Button className="glass bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-indigo-400/50 hover:from-indigo-500/30 hover:to-cyan-500/30 transition">
                💬 Chat with AI
              </Button>
            </Link>
            {profile?.role === 'admin' && (
              <Link href="/admin">
                <Button className="glass hover:glass-sm transition">⚙️ Admin</Button>
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Upcoming Events */}
          <div className="space-y-4 animate-in">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">📅 Upcoming Events</h2>
              <div className="text-xs glass px-2 py-1 rounded-full text-muted-foreground">
                {events.length}
              </div>
            </div>
            <div className="space-y-3">
              {events.slice(0, 5).map((event, idx) => (
                <div 
                  key={event.id} 
                  className="glass-lg p-4 rounded-xl hover:glass transition-all hover:scale-105 duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <span className="text-xs glass px-2 py-1 rounded-lg text-muted-foreground bg-indigo-500/10">
                      {event.category || 'Event'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    {event.date && (
                      <span>📍 {new Date(event.date).toLocaleDateString()}</span>
                    )}
                    {event.location && (
                      <span>🏢 {event.location}</span>
                    )}
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="glass-lg p-8 rounded-xl text-center text-muted-foreground">
                  ✨ No upcoming events yet
                </div>
              )}
            </div>
          </div>

          {/* Popular Clubs */}
          <div className="space-y-4 animate-in-left">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">🎓 Popular Clubs</h2>
              <div className="text-xs glass px-2 py-1 rounded-full text-muted-foreground">
                {clubs.length}
              </div>
            </div>
            <div className="space-y-3">
              {clubs.slice(0, 5).map((club, idx) => (
                <div
                  key={club.id}
                  className="glass-lg p-4 rounded-xl hover:glass transition-all hover:scale-105 duration-300 hover:shadow-lg group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-indigo-400 transition">{club.name}</h3>
                    <span className="text-lg">👥</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs glass px-3 py-1 rounded-lg text-muted-foreground bg-cyan-500/10">
                      {club.category || 'General'}
                    </span>
                    <span className="text-xs font-medium text-indigo-400">
                      {club.member_count || 0} members
                    </span>
                  </div>
                </div>
              ))}
              {clubs.length === 0 && (
                <div className="glass-lg p-8 rounded-xl text-center text-muted-foreground">
                  ✨ No clubs available yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-lg p-8 rounded-2xl border backdrop-blur-xl animate-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-bold text-foreground mb-6">🚀 Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="glass-lg bg-gradient-to-r from-indigo-500/20 to-indigo-500/20 border-indigo-400/50 hover:from-indigo-500/30 hover:to-indigo-500/30 transition duration-300 text-foreground font-medium">
              📝 Create Event
            </Button>
            <Button className="glass-lg bg-gradient-to-r from-cyan-500/20 to-cyan-500/20 border-cyan-400/50 hover:from-cyan-500/30 hover:to-cyan-500/30 transition duration-300 text-foreground font-medium">
              🎨 Start a Club
            </Button>
            <Link href="/chat" className="w-full">
              <Button className="w-full glass-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400/50 hover:from-purple-500/30 hover:to-cyan-500/30 transition duration-300 text-foreground font-medium">
                💬 Chat with AI
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
