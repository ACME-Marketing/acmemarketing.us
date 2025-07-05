# Environment Setup Guide

## Problem
The application is failing because environment variables are not set up. You need to create a `.env` file with your Supabase credentials.

## Solution

### 1. Create `.env` file
Create a file named `.env` in the root directory of your project:

```bash
touch .env
```

### 2. Add your Supabase credentials
Add the following to your `.env` file:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://jnmancmdvjslsvkzaufo.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 3. Get your Supabase credentials

1. **Go to your Supabase dashboard**: https://supabase.com/dashboard/project/jnmancmdvjslsvkzaufo
2. **Navigate to Settings → API**
3. **Copy the values**:
   - **Project URL**: Copy the "Project URL" (should be `https://jnmancmdvjslsvkzaufo.supabase.co`)
   - **Anon Key**: Copy the "anon public" key (starts with `eyJ...`)

### 4. Example `.env` file
Your `.env` file should look like this:

```env
PUBLIC_SUPABASE_URL=https://jnmancmdvjslsvkzaufo.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubWFuY21kdmpsc2xzdmt6YXVmbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzUxNzM4NjA1LCJleHAiOjIwNjczMTQ2MDV9.your-actual-key-here
```

### 5. Restart your development server
After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Verification

Once you've set up the environment variables, you can test if everything is working:

1. **Check the courses page** - should load without errors
2. **Test the notification form** - should work properly
3. **Check browser console** - should show "Fetched courses: X" instead of errors

## Troubleshooting

- **Make sure the `.env` file is in the root directory** (same level as `package.json`)
- **Don't commit the `.env` file** - it's already in `.gitignore`
- **Restart the dev server** after creating the `.env` file
- **Check for typos** in the URL and key values

## Next Steps

After setting up the environment variables:
1. ✅ The courses page should work
2. ✅ The notification system should work
3. ✅ You can test the email functionality
4. ✅ You can create and manage courses 