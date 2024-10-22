// Initialize Supabase client
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co'; // Replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcxNzA4MSwiZXhwIjoyMDQyMjkzMDgxfQ.K76C-QfzmypZfQ3vkJGUzgJmVxiFoAzb4ChC923gKCQ'; // Replace with your actual Supabase API Key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

async function fetchProjects() {
    const { data, error } = await supabaseClient
        .from('project')
        .select('judul, deskripsi, tahun, jenis_project, id_tim, link_project, link_video, skala_id, peringkat_id, url_image, tools, kontak_mahasiswa')
        .eq('jenis_project', 'Lomba'); // Add this line to filter projects by 'Lomba'

    if (error) {
        console.error('Error fetching projects:', error);
        return;
    }

    const tableBody = document.getElementById('project-table-body');
    tableBody.innerHTML = '';

    data.forEach(project => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${project.judul}</td>
            <td>${project.deskripsi}</td>
            <td>${project.tahun}</td>
            <td>${project.jenis_project}</td>
            <td>${project.id_tim}</td>
            <td><a href="${project.link_project}" target="_blank">Link Project</a></td>
            <td><a href="${project.link_video}" target="_blank">Link Video</a></td>
            <td><img src="${project.url_image}" alt="Gambar Proyek" width="50"></td>
            <td>${project.tools}</td>
            <td>${project.kontak_mahasiswa}</td>
            <td><button onclick="editProject(${project.id_project})">Edit</button>
                <button onclick="deleteProject(${project.id_project})">Hapus</button>
                <button onclick="postProject(${project.id_project})">Post</button></td>
            <td>${project.skala_id}</td>
            <td>${project.peringkat_id}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

async function addProject() {
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectYear = document.getElementById('projectYear').value;
    const projectType = document.getElementById('projectType').value;
    const teamId = document.getElementById('teamId').value;

    const { data, error } = await supabaseClient
        .from('project')
        .insert([{ judul: projectName, deskripsi: projectDescription, tahun: projectYear, jenis_project: projectType, id_tim: teamId }]);

    if (error) {
        console.error('Error adding project:', error);
    } else {
        fetchProjects();
    }
}

async function deleteProject(id) {
    const { data, error } = await supabaseClient
        .from('project')
        .delete()
        .eq('id_project', id);
    
    if (error) {
        console.error('Error deleting project:', error);
    } else {
        fetchProjects();
    }
}

async function editProject(id) {
    // Implement the logic to edit a project here
}
