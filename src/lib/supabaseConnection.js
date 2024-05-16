import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ozcxexmhtvinzgdfasin.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Y3hleG1odHZpbnpnZGZhc2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyOTY4NjAsImV4cCI6MjAzMDg3Mjg2MH0.yNa0ho3ebHAPAVPxy58eUbBoYPSl1RpUJcCDRQZhB84'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)