// kelolaproject.js

// Initialize Supabase
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Function to fetch and display project data
async function fetchProjects() {
    const { data, error } = await supabaseClient
        .from('project')
        .select('*');  // Select all columns from the 'project' table

    if (error) {
        console.error('Error fetching project data:', error);
        return;
    }

    // Get the table body element
    const tableBody = document.getElementById('project-table-body');
    tableBody.innerHTML = '';

    // Iterate over the data and append rows to the table
    data.forEach(project => {
        const row = `
            <tr>
                <td>${project.id_project}</td>
                <td>${project.judul}</td>
                <td>${project.deskripsi}</td>
                <td>${project.tahun}</td>
                <td>${project.jenis_project}</td>
                <td>${project.id_tim}</td>
                <td><a href="${project.link_project}" target="_blank">Link Project</a></td>
                <td><a href="${project.link_video}" target="_blank">Link Video</a></td>
                <td><img src="https://ctuuidmssgwoibomcsem.supabase.co/storage/v1/object/public/project_images/${project.image}" alt="Project Image" width="100" /></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Call the fetchProjects function to populate the table on page load
window.onload = fetchProjects;
