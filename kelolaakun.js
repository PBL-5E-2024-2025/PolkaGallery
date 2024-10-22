// Initialize Supabase client
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co'; // Replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcxNzA4MSwiZXhwIjoyMDQyMjkzMDgxfQ.K76C-QfzmypZfQ3vkJGUzgJmVxiFoAzb4ChC923gKCQ'; // Replace with your actual Supabase API Key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

async function fetchUsers() {
    const { data, error } = await supabaseClient
        .from('users')
        .select('username, password, no_hp, email');

    if (error) {
        console.error('Error fetching users:', error);
        return;
    }

    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';

    data.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.no_hp}</td>
            <td>${user.email}</td>
        `;
        
        tableBody.appendChild(row);
    });
}
