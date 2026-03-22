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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Campus AI</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.email}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/chat">
              <Button variant="outline">Chat with AI</Button>
            </Link>
            {profile?.role === 'admin' && (
              <Link href="/admin">
                <Button variant="outline">Admin Panel</Button>
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <Card key={event.id} className="p-4">
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  {event.date && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-xs text-gray-500">{event.location}</p>
                  )}
                </Card>
              ))}
              {events.length === 0 && (
                <Card className="p-4 text-gray-500">
                  No upcoming events yet
                </Card>
              )}
            </div>
          </div>

          {/* Popular Clubs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Clubs</h2>
            <div className="space-y-3">
              {clubs.slice(0, 5).map((club) => (
                <Card key={club.id} className="p-4">
                  <h3 className="font-semibold text-gray-900">{club.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{club.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {club.category || 'General'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {club.member_count || 0} members
                    </span>
                  </div>
                </Card>
              ))}
              {clubs.length === 0 && (
                <Card className="p-4 text-gray-500">
                  No clubs available yet
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Event
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Start a Club
            </Button>
            <Link href="/chat" className="w-full">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
