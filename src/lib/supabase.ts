import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kmoojxygtcbfvomwczhs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb29qeHlndGNiZnZvbXdjemhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNTQyOTEsImV4cCI6MjA3MDczMDI5MX0.l1nY9QCVWuwpa8ETgA95Nba5jwgUNvcQA9ngX2xzzFc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types untuk Blog
export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image?: string
  author: string
  published_at: string
  created_at: string
  updated_at: string
  tags?: string[]
  status: 'draft' | 'published'
  views?: number
}

export interface CreateBlogPost {
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image?: string
  author: string
  tags?: string[]
  status: 'draft' | 'published'
}

// Types untuk Portfolio
export interface Portfolio {
  id: string
  title: string
  description: string
  slug: string
  featured_image?: string
  client: string
  category: string
  technologies: string[]
  project_url?: string
  github_url?: string
  created_at: string
  updated_at: string
  status: 'draft' | 'published'
  featured: boolean
}

export interface CreatePortfolio {
  title: string
  description: string
  slug: string
  featured_image?: string
  client: string
  category: string
  technologies: string[]
  project_url?: string
  github_url?: string
  status: 'draft' | 'published'
  featured: boolean
}
