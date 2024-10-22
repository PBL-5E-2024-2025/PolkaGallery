// Initialize Supabase client
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co'; // Replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcxNzA4MSwiZXhwIjoyMDQyMjkzMDgxfQ.K76C-QfzmypZfQ3vkJGUzgJmVxiFoAzb4ChC923gKCQ'; // Replace with your actual Supabase API Key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    fetchComments();
});

async function fetchComments() {
    const { data, error } = await supabaseClient
        .from('feedback')
        .select('nama, email, komentar, tgl_dikirim');

    if (error) {
        console.error('Error fetching comments:', error);
        return;
    }

    const tableBody = document.getElementById('comment-table-body');
    tableBody.innerHTML = '';

    data.forEach(comment => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${comment.nama}</td>
            <td>${comment.email}</td>
            <td>${comment.komentar}</td>
            <td>${new Date(comment.tgl_dikirim).toLocaleString()}</td>
        `;
        
        tableBody.appendChild(row);
    });
}
