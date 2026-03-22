import { createServerClient } from '@/lib/supabase/server'
import { streamText, convertToModelMessages } from 'ai'
import { z } from 'zod'
import { NextRequest } from 'next/server'

const messageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      parts: z.array(
        z.object({
          type: z.string(),
          text: z.string().optional(),
        })
      ),
    })
  ),
  chatId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { messages, chatId } = messageSchema.parse(body)

    // Create or get chat
    let finalChatId = chatId
    const userMessage = messages[messages.length - 1]
    const userContent = userMessage.parts
      .filter((p) => p.type === 'text')
      .map((p) => p.text)
      .join('')

    if (!finalChatId) {
      const { data: newChat } = await supabase
        .from('chats')
        .insert({
          user_id: user.id,
          title: userContent.substring(0, 50),
        })
        .select('id')
        .single()

      finalChatId = newChat?.id
    }

    // Convert UI messages to model messages
    const modelMessages = await convertToModelMessages(messages)

    // Stream response
    const result = streamText({
      model: 'openai/gpt-4-turbo',
      system:
        'You are a helpful campus AI assistant. Provide helpful information about campus life, events, clubs, and student resources.',
      messages: modelMessages,
    })

    // Save user message
    await supabase.from('messages').insert({
      chat_id: finalChatId,
      user_id: user.id,
      content: userContent,
      role: 'user',
    })

    // Handle streaming and save assistant message
    let assistantContent = ''
    for await (const chunk of result.fullStream) {
      if (chunk.type === 'text-delta') {
        assistantContent += chunk.delta
      }
    }

    // Save assistant message
    if (assistantContent) {
      await supabase.from('messages').insert({
        chat_id: finalChatId,
        user_id: user.id,
        content: assistantContent,
        role: 'assistant',
      })
    }

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('[chat API] Error:', error)
    return new Response('Failed to process chat message', { status: 500 })
  }
}
