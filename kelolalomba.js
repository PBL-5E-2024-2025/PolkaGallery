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
        .select('judul, deskripsi, tahun, dosen, jenis_project, link_project, link_video, url_image, tools, kontak_mahasiswa, nama_mhs, skala, peringkat')
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
            <td>${project.nama_mhs}</td>
            <td>${project.dosen}</td>
            <td>${project.tools}</td>
            <td>${project.tahun}</td>
            <td>${project.jenis_project}</td>
            <td>${project.skala}</td>
            <td>${project.peringkat}</td>
            <td><a href="${project.link_project}" target="_blank">Link Project</a></td>
            <td><a href="${project.link_video}" target="_blank">Link Video</a></td>
            <td>${project.kontak_mahasiswa}</td>
            <td><img src="${project.url_image}" alt="Gambar Proyek" width="50"></td>
            <td>
                <button class="edit-button" onclick="openEditProjectModal(${JSON.stringify(project)})">Edit</button>
                <button class="delete-button" onclick="deleteProject(${project.id_project})">Hapus</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

