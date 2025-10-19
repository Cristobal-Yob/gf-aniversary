-- Initialize the database with basic tables
-- This file is run when the PostgreSQL container starts

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create initial tables (these will be managed by Alembic migrations)
-- This is just for initial setup

-- You can add any initial data here if needed
INSERT INTO users (username, email, full_name, hashed_password, is_active, created_at) 
VALUES 
  ('admin', 'admin@gf-anniversary.com', 'Administrator', '$2b$12$example_hashed_password', true, NOW())
ON CONFLICT (username) DO NOTHING;
