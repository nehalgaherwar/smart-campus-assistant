'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import LogoutButton from '@/components/auth/logout-button'

interface AdminDashboardProps {
  stats: {
    totalUsers: number
    totalChats: number
    totalEvents: number
    totalClubs: number
  }
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'events' | 'clubs'>(
    'overview'
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Chats</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalChats}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Events</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEvents}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Clubs</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalClubs}</p>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('clubs')}
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'clubs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Clubs
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">System Overview</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    <strong>Users:</strong> {stats.totalUsers} registered students and staff
                  </p>
                  <p className="text-gray-600">
                    <strong>Active Chats:</strong> {stats.totalChats} ongoing conversations with AI
                    assistant
                  </p>
                  <p className="text-gray-600">
                    <strong>Events:</strong> {stats.totalEvents} campus events listed
                  </p>
                  <p className="text-gray-600">
                    <strong>Clubs:</strong> {stats.totalClubs} student organizations
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
                <p className="text-gray-600 mb-4">
                  Manage user accounts and permissions. Full user management features coming soon.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  View All Users
                </Button>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Event Management</h2>
                <p className="text-gray-600 mb-4">
                  Create, edit, and manage campus events. Event management interface coming soon.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Create Event
                </Button>
              </div>
            )}

            {activeTab === 'clubs' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Club Management</h2>
                <p className="text-gray-600 mb-4">
                  Manage student clubs and organizations. Club management interface coming soon.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Create Club
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
