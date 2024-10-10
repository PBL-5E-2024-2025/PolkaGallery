// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase project URL and public API key
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0'; // Replace with your actual anon key

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
