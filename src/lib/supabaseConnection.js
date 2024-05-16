
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ozcxexmhtvinzgdfasin.supabase.co'
const supabaseKey = 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Y3hleG1odHZpbnpnZGZhc2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyOTY4NjAsImV4cCI6MjAzMDg3Mjg2MH0'

export const supabase = createClient(supabaseUrl, supabaseKey);