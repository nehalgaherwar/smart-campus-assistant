# Quick Start Guide - Smart Campus AI

Get up and running with Smart Campus AI in 5 minutes!

## Prerequisites
- ✅ Supabase integration already set up with environment variables
- ✅ Dependencies can be installed automatically
- ✅ Database needs to be created (see Database Setup below)

## Step 1: Database Setup (Required)

The application won't work without setting up the database schema first.

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Create a **New Query**
4. Copy and paste the entire content of `/scripts/01-create-tables.sql`
5. Click **Run**
6. Create another **New Query**
7. Copy and paste the entire content of `/scripts/02-enable-rls.sql`
8. Click **Run**

✅ Database is now ready!

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.

## Step 2: Start the Development Server

```bash
pnpm dev
```

The app will start on `http://localhost:3000`

## Step 3: Create Your Account

1. Click "Sign Up" on the login page
2. Enter your email and password
3. You'll be redirected to the dashboard

✅ You're in!

## Step 4: Explore the Features

### Dashboard (`/dashboard`)
- View upcoming events
- Browse student clubs
- See quick action buttons

### Chat (`/chat`)
- Click "Chat with AI" to open the chat interface
- Ask questions about campus events, clubs, or student life
- Chat history is saved automatically

### Admin Panel (`/admin`)
- Only accessible if your account has `role = 'admin'`
- View system statistics
- Manage users, events, and clubs (UI coming soon)

## Common Tasks

### Make Yourself an Admin

Run this in Supabase SQL Editor (replace `user-id-with-your-id`):

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'user-id-with-your-id';
```

To find your user ID:
1. Go to Supabase Dashboard
2. Go to **Authentication → Users**
3. Click on your user to see the ID

### Create Test Events

```sql
INSERT INTO events (title, description, location, date, created_by)
VALUES 
  ('Tech Meetup', 'Monthly tech discussion', 'Building A', NOW() + INTERVAL '7 days', 'YOUR_USER_ID');
```

### Create Test Clubs

```sql
INSERT INTO clubs (name, description, category, created_by)
VALUES 
  ('Coding Club', 'For programming enthusiasts', 'Technology', 'YOUR_USER_ID');
```

## Troubleshooting

### "Table does not exist" Error
- Solution: Run the database setup scripts (Step 1 above)

### "Unauthorized" on Chat
- Solution: Make sure you're logged in (check the dashboard header)
- Check that your profile exists: Go to Supabase and verify the `profiles` table has your user

### Chat not responding
- Solution: Check that OpenAI API key is set (or AI Gateway is configured)
- Try refreshing the page

### Can't log in
- Solution: Check that your email is confirmed (if email verification is enabled)
- Try creating a new account

### "Permission denied" errors
- Solution: Make sure all RLS policies were created (Step 1, script 2)

## File Structure Quick Reference

```
📁 Smart Campus AI
├── 📄 README.md              ← Full feature documentation
├── 📄 DATABASE_SETUP.md      ← Database creation guide
├── 📄 IMPLEMENTATION.md      ← Technical details
├── 📄 QUICKSTART.md          ← This file!
├── 📁 app/
│   ├── 📁 auth/              ← Login, sign up pages
│   ├── 📁 dashboard/         ← Main dashboard
│   ├── 📁 chat/              ← Chat interface
│   ├── 📁 admin/             ← Admin panel
│   └── 📁 api/               ← API endpoints
├── 📁 components/
│   ├── 📁 dashboard/         ← Dashboard UI
│   ├── 📁 chat/              ← Chat UI
│   ├── 📁 admin/             ← Admin UI
│   └── 📁 ui/                ← Reusable components
├── 📁 lib/
│   ├── 📁 supabase/          ← Database clients
│   └── utils.ts              ← Utilities
└── 📁 scripts/
    ├── 01-create-tables.sql  ← Create database
    └── 02-enable-rls.sql     ← Setup security
```

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## What Happens Next

### During Development
1. Make changes to files
2. Save (hot reload happens automatically)
3. Test in browser at `http://localhost:3000`

### Before Deploying
- [ ] Test all pages work
- [ ] Test authentication (sign up, login, logout)
- [ ] Test chat functionality
- [ ] Test admin panel (if applicable)
- [ ] Check error messages display properly

### Deploying to Vercel
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click Deploy!

## Need Help?

1. **Features Question**: See [README.md](./README.md)
2. **Database Question**: See [DATABASE_SETUP.md](./DATABASE_SETUP.md)
3. **Technical Details**: See [IMPLEMENTATION.md](./IMPLEMENTATION.md)
4. **Still Stuck**: Check the code comments or Supabase docs

## Pro Tips

💡 Use Supabase SQL Editor to:
- Create test data
- Debug queries
- Check what's in tables

💡 Use browser DevTools to:
- Check network requests
- Debug JavaScript
- See console errors

💡 Use Next.js DevTools (when enabled) to:
- Check component tree
- Inspect props
- Profile performance

## Next Steps

1. ✅ Run database setup
2. ✅ Start dev server with `pnpm dev`
3. ✅ Create an account
4. ✅ Explore the dashboard
5. ✅ Try the AI chat
6. ✅ Customize colors and text
7. ✅ Add test data
8. ✅ Deploy to Vercel!

Enjoy building! 🚀
