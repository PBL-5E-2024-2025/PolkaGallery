// Supabase client initialization
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

async function fetchProjects() {
    const { data, error } = await supabaseClient
        .from('project')
        .select('id_project, judul, deskripsi, tahun, dosen, jenis_project, link_project, link_video, url_image, tools, kontak_mahasiswa, nama_mhs, skala, peringkat')
        .eq('jenis_project', 'Lomba');

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
                <button class="edit-button" onclick="openEditProjectModal(${project.id_project})">Edit</button>
                <button class="delete-button" onclick="deleteProject(${project.id_project})">Hapus</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function openEditProjectModal(id_project) {
    window.location.href = `editlomba.html?id_project=${id_project}`;
}

async function deleteProject(id_project) {
    const confirmation = confirm("Apakah Anda yakin ingin menghapus project ini?");
    if (!confirmation) {
        return;
    }

    try {
        // Attempt to delete the project
        const { data, error } = await supabaseClient
            .from('project')
            .delete()
            .eq('id_project', id_project);

        // Log entire response for debugging purposes
        console.log("Delete response data:", data);
        console.log("Delete response error:", error);

        if (error) {
            console.error('Supabase delete error:', error.message);
            alert(`Gagal menghapus project. Error: ${error.message}`);
        } else if (!data || data.length === 0) {
            alert('Project tidak ditemukan atau sudah dihapus.');
        } else {
            alert('Project berhasil dihapus.');
            fetchProjects(); // Refresh list of projects
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        alert(`Terjadi kesalahan tidak terduga: ${err.message}`);
    }
}
