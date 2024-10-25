// Initialize Supabase client
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co'; // Replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0'; // Replace with your actual Supabase API Key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

async function fetchProjects() {
    const { data, error } = await supabaseClient
        .from('project')
        .select('id_project, judul, deskripsi, tahun, jenis_project, link_project, link_video, url_image, tools, kontak_mahasiswa, nama_mhs')
        .eq('jenis_project', 'PBL'); // Add this line to filter projects by 'PBL'

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
            <td><a href="${project.link_project}" target="_blank">Link Project</a></td>
            <td><a href="${project.link_video}" target="_blank">Link Video</a></td>
            <td><img src="${project.url_image}" alt="Gambar Proyek" width="50"></td>
            <td>${project.tools}</td>
            <td>${project.kontak_mahasiswa}</td>
            <td>${project.nama_mhs}</td>
            <td>
                <button class="edit-button" onclick="openEditProjectModal(${JSON.stringify(project)})">Edit</button>
                <button class="delete-button" onclick="deleteProject(${project.id_project})">Hapus</button>
                <button class="post-button" onclick="postProject(${project.id_project})">Post</button>
            </td>
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
        .insert([{ 
            judul: projectName, 
            deskripsi: projectDescription, 
            tahun: projectYear, 
            jenis_project: projectType,  
        }]);

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

async function saveEditedProject() {
    const id = document.getElementById('editProjectId').value;
    const name = document.getElementById('editProjectName').value;
    const description = document.getElementById('editProjectDescription').value;
    const year = document.getElementById('editProjectYear').value;
    const type = document.getElementById('editProjectType').value;
    const teamId = document.getElementById('editTeamId').value;

    const { data, error } = await supabaseClient
        .from('project')
        .update({ 
            judul: name, 
            deskripsi: description, 
            tahun: year, 
            jenis_project: type, 
        })
        .eq('id_project', id);

    if (error) {
        console.error('Error updating project:', error);
    } else {
        fetchProjects();
        closeEditProjectModal();
    }
}

function openEditProjectModal(project) {
    document.getElementById('editProjectId').value = project.id_project;
    document.getElementById('editProjectName').value = project.judul;
    document.getElementById('editProjectDescription').value = project.deskripsi;
    document.getElementById('editProjectYear').value = project.tahun;
    document.getElementById('editProjectType').value = project.jenis_project;

    document.getElementById('editProjectModal').style.display = 'block';
}

function closeEditProjectModal() {
    document.getElementById('editProjectModal').style.display = 'none';
}

function postProject(id) {
    // Implementasikan fungsionalitas posting proyek di sini
    alert('Posting project akan ditambahkan nanti.');
}
