import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  capacity: z.number().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (error) throw error

    return NextResponse.json({ events })
  } catch (error) {
    console.error('[events GET] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const event = eventSchema.parse(body)

    const { data: newEvent, error } = await supabase
      .from('events')
      .insert({
        ...event,
        created_by: user.id,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ event: newEvent })
  } catch (error) {
    console.error('[events POST] Error:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
