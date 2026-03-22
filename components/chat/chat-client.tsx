'use client'

import { User } from '@supabase/supabase-js'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import LogoutButton from '@/components/auth/logout-button'

interface ChatClientProps {
  user: User | null
  initialChats: any[]
}

export default function ChatClient({ user, initialChats }: ChatClientProps) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          chatId: selectedChatId,
        },
      }),
    }),
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              Smart Campus AI Chat
            </h1>
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Chat History Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Chat History</h3>
          <div className="space-y-2">
            <Button
              variant={selectedChatId === null ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedChatId(null)}
            >
              New Chat
            </Button>
            {initialChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedChatId === chat.id
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <p className="truncate text-sm font-medium">{chat.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(chat.created_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Start a Conversation
                  </h2>
                  <p className="text-gray-600">
                    Ask the AI assistant about campus events, clubs, or student resources.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <Card
                    className={`max-w-md px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">
                      {message.parts
                        ?.filter((p) => p.type === 'text')
                        .map((p) => p.text)
                        .join('') || ''}
                    </p>
                  </Card>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-gray-200 px-4 py-3">
                  <p className="text-sm text-gray-600">Thinking...</p>
                </Card>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask something about campus..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
