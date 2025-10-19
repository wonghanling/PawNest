# Supabase Setup Guide for PawNest Pet Store

This guide will help you set up Supabase authentication and database for the PawNest pet store application.

## Prerequisites

1. Create a free account at [https://supabase.com](https://supabase.com)
2. Make sure you have access to your project dashboard

## Step 1: Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Name: `pawnest-pet-store` (or any name you prefer)
   - Database Password: Create a strong password and save it
   - Region: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` file
4. Click "Run" to execute the SQL commands

This will create:
- `contact_submissions` table to store contact form submissions
- Row Level Security (RLS) policies for data protection
- Necessary indexes for performance
- Triggers for automatic timestamp updates

## Step 5: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add your local development URL:
   - `http://localhost:3000`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000`
   - `http://localhost:3000/login`

For production, add your production domain URLs.

## Step 6: Test the Setup

1. Save all changes and restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`
3. Try to register a new account
4. After registration, try to access `http://localhost:3000/contact`
5. Submit a contact form to test the database integration

## Common Issues and Solutions

### Error: "Invalid supabaseUrl"
- Check that your `NEXT_PUBLIC_SUPABASE_URL` is correctly set in `.env.local`
- Make sure the URL starts with `https://` and ends with `.supabase.co`

### Error: "Invalid API key"
- Verify your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correctly copied
- Make sure there are no extra spaces or line breaks

### Contact form not working
- Check that the `contact_submissions` table was created successfully
- Verify that RLS policies are enabled and configured correctly

## Security Notes

1. **Never commit your `.env.local` file** - it's already in `.gitignore`
2. The anon key is safe to use in client-side code as it has limited permissions
3. Row Level Security (RLS) ensures users can only access their own data
4. For production, consider setting up additional security measures

## Additional Features (Optional)

### Email Verification
1. Go to **Authentication** → **Settings**
2. Enable "Enable email confirmations"
3. Configure email templates if needed

### Social Login
1. Go to **Authentication** → **Providers**
2. Enable desired providers (Google, GitHub, etc.)
3. Configure OAuth settings

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)