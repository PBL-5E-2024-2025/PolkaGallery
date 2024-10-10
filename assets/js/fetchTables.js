import { createClient } from '@supabase/supabase-js';

// Supabase project URL and public API key
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0'; // Ganti dengan kunci anon yang tepat

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch data from all tables
const fetchDataFromAllTables = async () => {
  const tableNames = [
    'dosen',
    'dosen_project',
    'feedback',
    'image',
    'mahasiswa',
    'mahasiswa_tim',
    'matakuliah',
    'matakuliah_project',
    'peringkat',
    'project',
    'skala',
    'tim',
    'users',
  ];

  for (const table of tableNames) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`Error fetching data from ${table}:`, error.message);
    } else if (data.length > 0) {
      console.log(`Data from ${table}:`, data);
    } else {
      console.log(`No data found in ${table}`);
    }
  }
};

// Execute the fetch function
fetchDataFromAllTables();
