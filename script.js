// Inisialisasi Supabase
const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co'; // Corrected the Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0'; // Your Supabase key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Fungsi untuk mendapatkan data proyek dari Supabase
async function getProjectData() {
    // Mengambil data dari tabel 'project'
    const { data, error } = await supabaseClient
        .from('project')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    console.log('Data from Supabase:', data);

    // Mendapatkan elemen container dari HTML
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = ''; // Kosongkan container sebelum memuat data

    // Menampilkan data proyek
    data.forEach(project => {
        const projectCard = `
            <div class="mycard">
                <h2>${project.judul || 'Judul tidak ditemukan'}</h2>
                <p>Deskripsi: ${project.deskripsi || 'Deskripsi tidak ditemukan'}</p>
                <p>Tahun: ${project.tahun || 'Tahun tidak ditemukan'}</p>
                <p>Jenis Project: ${project.jenis_project || 'Jenis project tidak ditemukan'}</p>
                <p>ID Tim: ${project.id_tim || 'ID Tim tidak ditemukan'}</p>
                <p>Link Project: ${project.link_project ? `<a href="${project.link_project}">Lihat Project</a>` : 'Link tidak ditemukan'}</p>
                <p>Link Video: ${project.link_video ? `<a href="${project.link_video}">Lihat Video</a>` : 'Link video tidak ditemukan'}</p>
            </div>
        `;
        projectList.innerHTML += projectCard;
    });
}

// Memuat data proyek setelah halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    getProjectData();
});
