# Smart Campus AI - Start Here

Welcome to Smart Campus AI! This document will guide you through getting started.

## What Is Smart Campus AI?

Smart Campus AI is a web application that helps students:
- Discover and explore campus events
- Find and join student clubs
- Chat with an AI assistant about campus life
- Access a personalized campus experience

Built with Next.js, Supabase, and AI-powered features.

## Quick Navigation

### I want to...

**Get it running quickly**
→ Read [QUICKSTART.md](./QUICKSTART.md) (5 minutes)

**Understand what was built**
→ Read [BUILD_SUMMARY.md](./BUILD_SUMMARY.md)

**Learn about features**
→ Read [README.md](./README.md)

**Set up the database**
→ Read [DATABASE_SETUP.md](./DATABASE_SETUP.md)

**Understand technical details**
→ Read [IMPLEMENTATION.md](./IMPLEMENTATION.md)

**Verify everything works**
→ Use [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

## The 3-Step Setup

### Step 1: Database Setup (5 minutes)

```
Go to Supabase → SQL Editor → Copy/paste SQL scripts → Run
```

Scripts needed:
- `scripts/01-create-tables.sql`
- `scripts/02-enable-rls.sql`

Detailed guide: [DATABASE_SETUP.md](./DATABASE_SETUP.md)

### Step 2: Start Development Server (1 minute)

```bash
pnpm install
pnpm dev
```

That's it! App runs on http://localhost:3000

### Step 3: Create Your Account

1. Visit http://localhost:3000
2. Click "Sign Up"
3. Enter email and password
4. Explore the dashboard!

## File Guide

| File | Read When | Contains |
|------|-----------|----------|
| **QUICKSTART.md** | You want to get started ASAP | 5-minute setup guide |
| **README.md** | You want to learn features | Complete feature documentation |
| **DATABASE_SETUP.md** | Database won't work | Step-by-step database setup |
| **IMPLEMENTATION.md** | You want technical details | Architecture and tech stack |
| **BUILD_SUMMARY.md** | You want to know what was built | Comprehensive build details |
| **SETUP_CHECKLIST.md** | You want to verify setup | Testing and verification checklist |
| **START_HERE.md** | You are here! | Navigation guide |

## Project Structure

```
Smart Campus AI/
├── 📖 Documentation
│   ├── START_HERE.md           ← You are here
│   ├── QUICKSTART.md           ← 5-min setup guide
│   ├── README.md               ← Full documentation
│   ├── DATABASE_SETUP.md       ← Database creation
│   ├── IMPLEMENTATION.md       ← Technical details
│   ├── BUILD_SUMMARY.md        ← Build overview
│   └── SETUP_CHECKLIST.md      ← Verification
│
├── 🚀 Application Code
│   ├── app/                    ← Pages and API routes
│   ├── components/             ← React components
│   ├── lib/                    ← Utilities and clients
│   └── middleware.ts           ← Auth middleware
│
├── 🗄️ Database
│   ├── scripts/01-create-tables.sql
│   └── scripts/02-enable-rls.sql
│
└── ⚙️ Config
    ├── package.json            ← Dependencies
    ├── tsconfig.json           ← TypeScript config
    ├── next.config.mjs         ← Next.js config
    ├── tailwind.config.ts      ← Tailwind config
    └── .env.example            ← Env vars template
```

## The Stack

| What | Technology |
|------|-----------|
| Website | Next.js 16 + React 19 |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| AI | OpenAI GPT-4 via AI SDK |
| Validation | Zod |

## Key Features

✓ Email/password authentication
✓ Dashboard with events and clubs
✓ AI-powered chat with streaming
✓ Event management
✓ Club discovery
✓ Admin dashboard
✓ Row Level Security
✓ Responsive design
✓ Production-ready

## How It Works

### Authentication Flow
```
Sign Up → Create User → Create Profile → Login → Dashboard
```

### Chat Flow
```
User Message → AI Processing → Stream Response → Save to Database
```

### Data Flow
```
Supabase ← → Next.js API ← → React Components ← → User Browser
```

## Common Tasks

### Make yourself admin
```bash
# In Supabase SQL Editor:
UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
```

### Create test event
```bash
# In Supabase SQL Editor:
INSERT INTO events (title, description, location, created_by, date)
VALUES ('My Event', 'Description', 'Location', 'YOUR_USER_ID', NOW() + INTERVAL '7 days');
```

### Reset database
```bash
# Drop tables (careful!) and re-run SQL scripts from DATABASE_SETUP.md
DROP TABLE IF EXISTS club_members CASCADE;
DROP TABLE IF EXISTS clubs CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
```

## Troubleshooting Quick Links

**"Table does not exist"**
→ Run database setup: [DATABASE_SETUP.md](./DATABASE_SETUP.md)

**"Can't login"**
→ Check env vars in Supabase settings

**"Chat not working"**
→ Verify OpenAI/AI Gateway configured

**"Can't access admin panel"**
→ Run: `UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';`

**Need more help?**
→ See [README.md](./README.md) → Troubleshooting

## Deployment Checklist

Before deploying to Vercel:

- [ ] Database set up in Supabase
- [ ] Tested locally with `pnpm dev`
- [ ] Can sign up and login
- [ ] Chat works with AI responses
- [ ] Admin panel accessible
- [ ] No console errors
- [ ] All pages responsive

Then:
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

See [README.md](./README.md) for details.

## What's Included

✓ Complete Next.js application
✓ Supabase database setup
✓ AI chat integration
✓ Authentication system
✓ Admin dashboard
✓ Comprehensive documentation
✓ Database schema with RLS
✓ 40+ UI components
✓ API endpoints
✓ Error handling
✓ Input validation

## What You Need To Do

1. Set up the database (DATABASE_SETUP.md)
2. Run `pnpm install`
3. Run `pnpm dev`
4. Test the features
5. Customize for your campus
6. Deploy to Vercel

That's it!

## Next Steps

### Right Now
→ Read [QUICKSTART.md](./QUICKSTART.md) (5 minutes)

### Then
→ Set up database (DATABASE_SETUP.md)

### Then
→ Run: `pnpm install && pnpm dev`

### Then
→ Test everything in browser

### Then
→ Customize colors and text

### Finally
→ Deploy to Vercel

## Questions?

1. **How do I...?** → Check [README.md](./README.md)
2. **Where is...?** → Check [IMPLEMENTATION.md](./IMPLEMENTATION.md)
3. **I got an error...** → Check [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
4. **How to customize...?** → Edit files in `app/` and `components/`
5. **How to deploy...?** → Check [README.md](./README.md) → Deployment

## Ready to Begin?

```bash
# 1. Set up database (see DATABASE_SETUP.md)

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev

# 4. Open browser
# Visit http://localhost:3000
```

Let's go! 🚀

---

**Want more details?** See [README.md](./README.md) for the complete guide.

**Need setup help?** See [QUICKSTART.md](./QUICKSTART.md) for the 5-minute setup.

**Having issues?** See [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) to verify everything.
