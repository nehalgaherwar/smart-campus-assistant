'use client'

import { User } from '@supabase/supabase-js'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LogoutButton from '@/components/auth/logout-button'

interface ChatClientProps {
  user: User | null
  initialChats: any[]
}

function getMessageText(message: any): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p: any) => p.type === 'text')
    .map((p: any) => p.text)
    .join('')
}

export default function ChatClient({ user, initialChats }: ChatClientProps) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="glass border-b backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-80 transition">
              Campus AI
            </h1>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button variant="outline" className="glass">Dashboard</Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 glass border-r backdrop-blur-xl overflow-hidden flex flex-col`}>
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            <h3 className="font-semibold text-foreground mb-4 px-2">History</h3>
            <Button
              variant={selectedChatId === null ? 'default' : 'outline'}
              className={`w-full justify-start animate-in ${selectedChatId === null ? 'glass' : 'glass-sm'}`}
              onClick={() => setSelectedChatId(null)}
            >
              ✨ New Chat
            </Button>
            {initialChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all animate-in-left ${
                  selectedChatId === chat.id
                    ? 'glass bg-indigo-500/20 border-indigo-400/50'
                    : 'glass-sm hover:glass'
                }`}
              >
                <p className="truncate text-sm font-medium">{chat.title}</p>
                <p className="text-xs text-muted-foreground">
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
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4 animate-in">
                  <div className="text-6xl">✨</div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Start Chatting
                  </h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Ask about campus events, clubs, student resources, or anything else you'd like to know.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => {
                const text = getMessageText(message)
                return (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl transition-all ${
                        message.role === 'user'
                          ? 'glass-lg bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 border-indigo-400/50'
                          : 'glass-lg'
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-foreground">{text}</p>
                    </div>
                  </div>
                )
              })
            )}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="glass-lg px-4 py-3 rounded-2xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="glass-lg border-t backdrop-blur-xl p-4 m-4 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask something..."
                disabled={isLoading}
                className="flex-1 glass-sm bg-input text-foreground placeholder:text-muted-foreground focus:ring-indigo-500"
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 text-white transition-all"
              >
                {isLoading ? '...' : 'Send'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
