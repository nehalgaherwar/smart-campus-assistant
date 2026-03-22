# Smart Campus AI

A modern web application that helps students discover campus events, connect with clubs, and chat with an AI assistant about campus life.

## Features

- **Dashboard**: Welcome screen with personalized event and club recommendations
- **AI Chat Assistant**: Chat with an intelligent assistant about campus resources, events, and student life
- **Event Management**: Browse and manage campus events
- **Club Directory**: Discover and join student clubs and organizations
- **User Profiles**: Manage interests and preferences
- **Admin Dashboard**: Manage users, events, and clubs (admin-only)
- **Authentication**: Secure email/password authentication with Supabase

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT models via Vercel AI Gateway
- **ORM**: Direct SQL queries with Supabase client

## Prerequisites

- Node.js 18+ and pnpm
- Supabase account with database setup
- OpenAI API key or access via Vercel AI Gateway

## Setup Instructions

### 1. Database Setup

Follow the instructions in [DATABASE_SETUP.md](./DATABASE_SETUP.md) to create the database schema in Supabase.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

The following environment variables are automatically set via the Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

For AI functionality, you'll need to set:
- `OPENAI_API_KEY` (if using OpenAI directly) or access via Vercel AI Gateway

### 4. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
app/
  ├── layout.tsx                 # Root layout
  ├── page.tsx                   # Home page (redirects to auth or dashboard)
  ├── api/
  │   ├── chat/route.ts         # AI chat endpoint
  │   ├── events/route.ts       # Events CRUD
  │   └── clubs/route.ts        # Clubs CRUD
  ├── auth/
  │   ├── login/page.tsx        # Login page
  │   ├── sign-up/page.tsx      # Sign up page
  │   ├── error/page.tsx        # Auth error page
  │   └── sign-up-success/page.tsx
  ├── dashboard/page.tsx        # Main dashboard
  ├── chat/page.tsx             # Chat interface
  └── admin/page.tsx            # Admin dashboard

components/
  ├── dashboard/
  │   └── dashboard-client.tsx  # Dashboard UI
  ├── chat/
  │   └── chat-client.tsx       # Chat UI
  ├── admin/
  │   └── admin-dashboard.tsx   # Admin UI
  ├── auth/
  │   └── logout-button.tsx     # Logout functionality
  └── ui/                       # shadcn/ui components

lib/
  ├── supabase/
  │   ├── client.ts            # Client-side Supabase client
  │   ├── server.ts            # Server-side Supabase client
  │   └── middleware.ts        # Session management
  └── utils.ts                 # Utility functions

scripts/
  ├── 01-create-tables.sql     # Create database tables
  └── 02-enable-rls.sql        # Enable Row Level Security
```


# preview:-
<img width="1291" height="762" alt="Screenshot 2026-03-22 173337" src="https://github.com/user-attachments/assets/c0a8a4d0-4af4-4711-be6f-233bd9139097" />


## Key Features Explained

### Authentication
- Email/password authentication via Supabase Auth
- Secure session management with HTTP-only cookies
- Protected routes via middleware

### Database Schema
- **profiles**: User profile data (linked to auth.users)
- **chats**: Conversation history
- **messages**: Individual chat messages
- **events**: Campus events
- **clubs**: Student organizations
- **club_members**: Club memberships

### Row Level Security (RLS)
All tables have RLS policies to ensure:
- Users can only access their own data
- Public data (events, clubs) is visible to all
- Only authorized users can create/edit/delete

### AI Chat
- Streaming responses for real-time feedback
- Chat history stored in database
- Integrated with OpenAI via Vercel AI Gateway
- Conversation context maintained per chat session

## API Endpoints

### POST /api/chat
Send a message to the AI assistant.
```json
{
  "messages": [
    {
      "role": "user",
      "parts": [{"type": "text", "text": "What events are happening?"}]
    }
  ],
  "chatId": "optional-chat-id"
}
```

### GET /api/events
Fetch all campus events.

### POST /api/events
Create a new event (authenticated).

### GET /api/clubs
Fetch all clubs.

### POST /api/clubs
Create a new club (authenticated).

## User Roles

- **student** (default): Regular user access to dashboard, events, and chat
- **admin**: Full access to admin dashboard with user and content management

To make a user an admin, update their profile role in Supabase:
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'user-id';
```

## Troubleshooting

### Database Connection Issues
- Verify Supabase environment variables are set
- Check that the database tables were created (see DATABASE_SETUP.md)
- Ensure RLS policies are enabled

### Authentication Issues
- Clear browser cookies and try again
- Check that the auth redirect URL is configured correctly
- Verify the user confirmed their email (if email verification is enabled)

### Chat Issues
- Ensure OpenAI API key is set or AI Gateway access is configured
- Check that the chat table exists in the database
- Verify user has permission to create chat records (RLS policies)

## Development

### Adding a New Page
1. Create the page file in `app/[route]/page.tsx`
2. Add server-side data fetching using `createServerClient()`
3. Create a client component if interactivity is needed
4. Import and use in the page component

### Adding a New API Route
1. Create `app/api/[route]/route.ts`
2. Implement `GET` and/or `POST` handlers
3. Use `createServerClient()` to query the database
4. Return appropriate status codes and error handling

### Database Migrations
1. Create new SQL file in `scripts/`
2. Execute via Supabase SQL Editor
3. Test the changes in development

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel project settings
4. Deploy!

## Future Enhancements

- [ ] User recommendations based on interests
- [ ] Event notifications and reminders
- [ ] Club messaging and forums
- [ ] Calendar view for events
- [ ] Advanced admin reporting
- [ ] Mobile app
- [ ] Real-time chat notifications

## Support

For issues or questions, please contact the development team or open an issue in the repository.

## License

MIT License - feel free to use this project for your campus.
