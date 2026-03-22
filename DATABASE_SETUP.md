# Database Setup Guide

This guide will help you set up the Smart Campus AI database in Supabase.

## Quick Setup

Copy and paste the SQL from `scripts/01-create-tables.sql` and `scripts/02-enable-rls.sql` into the Supabase SQL Editor to create the database schema.

### Steps:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy all content from `/scripts/01-create-tables.sql` and paste it into the editor
5. Click "Run" to execute
6. Create another new query
7. Copy all content from `/scripts/02-enable-rls.sql` and paste it into the editor
8. Click "Run" to execute

## Schema Overview

### Tables Created:

- **profiles** - User profile data linked to auth.users
- **chats** - Chat conversations for users
- **messages** - Individual messages in chats
- **events** - Campus events
- **clubs** - Student clubs and organizations
- **club_members** - Membership records for clubs

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Profiles**: Users can only view/edit their own profile
- **Chats**: Users can only access their own chats
- **Messages**: Users can only see messages from their own chats
- **Events**: Anyone can view, only creators can edit/delete
- **Clubs**: Anyone can view, only creators can edit/delete
- **Club Members**: Anyone can view, users can only join/leave their own memberships

## Testing the Setup

After running the SQL scripts, you can test the setup:

1. Sign up a new user via the app
2. The user should be redirected to the dashboard
3. You should see empty states for events and clubs
4. You can navigate to the chat page and start a conversation
5. Admin users (role = 'admin') can access the admin dashboard

## Troubleshooting

If you encounter issues:

1. **"Cannot find table"** - Make sure both SQL scripts have been executed
2. **"Permission denied"** - Check that RLS policies were created correctly
3. **User can't see their profile** - Ensure the profile row was created when the user signed up

## Creating Test Data

You can manually insert test events and clubs through the Supabase SQL Editor:

```sql
INSERT INTO events (title, description, location, category, date, created_by)
VALUES 
  ('Tech Meetup', 'Monthly tech discussion', 'Building A, Room 101', 'Technology', NOW() + INTERVAL '7 days', 'user-id-here'),
  ('Sports Day', 'Campus sports tournament', 'Athletic Field', 'Sports', NOW() + INTERVAL '14 days', 'user-id-here');

INSERT INTO clubs (name, description, category, created_by)
VALUES 
  ('Coding Club', 'For programming enthusiasts', 'Technology', 'user-id-here'),
  ('Photography Club', 'Photography and visual arts', 'Arts', 'user-id-here');
```

Replace `'user-id-here'` with an actual user ID from your auth.users table.
