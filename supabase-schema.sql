-- Supabase Database Schema for PawNest Pet Store
-- This file contains the SQL commands needed to set up the database tables

-- Contact submissions table
-- This table stores messages submitted through the contact form
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own contact submissions
CREATE POLICY "Users can insert own contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can view their own contact submissions
CREATE POLICY "Users can view own contact submissions" ON contact_submissions
  FOR SELECT USING (auth.uid() = user_id);

-- Optional: Policy for admin users to view all contact submissions
-- CREATE POLICY "Admin can view all contact submissions" ON contact_submissions
--   FOR SELECT USING (
--     EXISTS (
--       SELECT 1 FROM auth.users
--       WHERE auth.uid() = auth.users.id
--       AND auth.users.raw_user_meta_data->>'role' = 'admin'
--     )
--   );

-- Add indexes for better performance
CREATE INDEX idx_contact_submissions_user_id ON contact_submissions(user_id);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();