// Test Supabase connection
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('SUPABASE_URL:', SUPABASE_URL)
console.log('Has service role key:', !!SUPABASE_SERVICE_ROLE_KEY)

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test 1: List all tables (this might not work with service role)
    const { data: tables, error: tablesError } = await supabase
      .from('projects')
      .select('*')
      .limit(1)
    
    if (tablesError) {
      console.error('Error querying projects table:', tablesError)
    } else {
      console.log('Projects table accessible:', tables)
    }

    // Test 2: Query projects with filters
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, image_url, github_url, is_published, order_index')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
    
    if (projectsError) {
      console.error('Error querying published projects:', projectsError)
    } else {
      console.log('Published projects found:', projects?.length ?? 0)
      console.log('Projects:', JSON.stringify(projects, null, 2))
    }

    // Test 3: Query all projects (no filter)
    const { data: allProjects, error: allError } = await supabase
      .from('projects')
      .select('id, title, image_url, github_url, is_published, order_index')
      .order('order_index', { ascending: true })
    
    if (allError) {
      console.error('Error querying all projects:', allError)
    } else {
      console.log('All projects found:', allProjects?.length ?? 0)
      console.log('All projects:', JSON.stringify(allProjects, null, 2))
    }

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testConnection()
