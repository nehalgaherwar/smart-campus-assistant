# Setup Checklist - Smart Campus AI

Use this checklist to verify everything is set up correctly.

## Pre-Setup

- [ ] You have access to Supabase project
- [ ] You have Node.js 18+ installed
- [ ] You have pnpm installed
- [ ] You have git installed

## Database Setup

- [ ] Opened Supabase SQL Editor
- [ ] Executed `scripts/01-create-tables.sql`
- [ ] Executed `scripts/02-enable-rls.sql`
- [ ] Tables appear in Supabase (profiles, chats, messages, events, clubs, club_members)
- [ ] No SQL errors in execution

## Project Setup

- [ ] Cloned or downloaded the project
- [ ] Ran `pnpm install`
- [ ] All dependencies installed successfully
- [ ] No error messages during installation

## Environment Variables

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set (from Supabase integration)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set (from Supabase integration)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set (from Supabase integration)
- [ ] Verified env vars in project settings

## Starting the App

- [ ] Ran `pnpm dev`
- [ ] No build errors
- [ ] Server started on `http://localhost:3000`
- [ ] No console errors on startup

## Testing Authentication

- [ ] Visited `http://localhost:3000`
- [ ] Redirected to login page
- [ ] Clicked "Sign Up"
- [ ] Created account with email and password
- [ ] Received confirmation (if email verification enabled)
- [ ] Redirected to dashboard
- [ ] Can see welcome message with email

## Testing Dashboard

- [ ] Dashboard page loads
- [ ] See "Upcoming Events" section
- [ ] See "Popular Clubs" section
- [ ] See "Quick Actions" buttons
- [ ] Can click "Chat with AI" button

## Testing Chat

- [ ] Clicked "Chat with AI" button
- [ ] Chat page loaded
- [ ] Can type in input field
- [ ] Can click "Send" button
- [ ] Message appears in chat
- [ ] Waiting indicator shows while AI responds
- [ ] AI response appears in chat

## Testing Admin Panel

- [ ] Logged out
- [ ] Created test account (optional)
- [ ] Updated profile role to 'admin' in Supabase:
  ```sql
  UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
  ```
- [ ] Logged back in (or logged in with admin account)
- [ ] See "Admin Panel" button on dashboard
- [ ] Can access admin dashboard
- [ ] See statistics displayed

## Testing Non-Admin Access

- [ ] Create another test account (don't make it admin)
- [ ] Login with non-admin account
- [ ] Cannot see "Admin Panel" button
- [ ] Cannot directly access `/admin` (redirects to dashboard)

## Testing Logout

- [ ] Click "Logout" button
- [ ] Redirected to login page
- [ ] Cannot access protected pages without login
- [ ] Session cleared

## Testing Protected Routes

- [ ] Try accessing `/dashboard` without login
- [ ] Should redirect to `/auth/login`
- [ ] Try accessing `/chat` without login
- [ ] Should redirect to `/auth/login`
- [ ] Try accessing `/admin` without login
- [ ] Should redirect to `/auth/login`

## Database Verification

- [ ] Go to Supabase SQL Editor
- [ ] Run: `SELECT * FROM profiles;`
- [ ] See your user profile
- [ ] Check that `role` is correctly set
- [ ] Run: `SELECT * FROM chats;`
- [ ] See chat records if you've chatted
- [ ] Run: `SELECT * FROM messages;`
- [ ] See message records

## Troubleshooting

### If you see "table does not exist" error:
- [ ] Run both SQL scripts again
- [ ] Check that no errors occurred during execution
- [ ] Verify tables in Supabase dashboard

### If chat doesn't work:
- [ ] Check OpenAI API key is configured
- [ ] Check browser console for errors
- [ ] Verify Supabase connection works (dashboard loads)
- [ ] Try creating a new chat

### If you can't login:
- [ ] Check that Supabase URL and keys are correct
- [ ] Check browser console for auth errors
- [ ] Clear cookies and try again
- [ ] Try creating a new account

### If admin panel doesn't show:
- [ ] Run SQL: `SELECT * FROM profiles WHERE id = 'YOUR_USER_ID';`
- [ ] Check that `role` column shows 'admin'
- [ ] Refresh page after updating role
- [ ] Try logging out and back in

## Ready for Development

- [ ] All checklist items completed
- [ ] No error messages in console
- [ ] Can sign up, login, and logout
- [ ] Dashboard displays correctly
- [ ] Chat works with AI responses
- [ ] Admin panel accessible to admin users

## Ready for Deployment

After verifying above:

- [ ] Tested all features locally
- [ ] No console errors
- [ ] All pages responsive on mobile
- [ ] Database queries working correctly
- [ ] Ready to push to GitHub
- [ ] Ready to deploy to Vercel

## Next Steps

1. **Customize the app:**
   - Change colors in `app/globals.css`
   - Update text in components
   - Add your campus name/logo

2. **Add test data:**
   - Create events via API or Supabase
   - Create clubs via API or Supabase

3. **Deploy to Vercel:**
   - Push to GitHub
   - Connect Vercel project
   - Add environment variables
   - Deploy!

## Support

If something doesn't work:
1. Check the error message carefully
2. Check browser console (F12)
3. Check Supabase logs
4. Review the troubleshooting section
5. Check README.md and other docs

## Notes

- Write any issues or observations here:
  - Issue 1: ____________________________
  - Issue 2: ____________________________
  - Issue 3: ____________________________

- Things I customized:
  - ____________________________
  - ____________________________

- Additional features added:
  - ____________________________
  - ____________________________

---

**Date Completed:** _______________

**Verified By:** _______________

**Status:** ✓ Ready for Development / ✓ Ready for Deployment
