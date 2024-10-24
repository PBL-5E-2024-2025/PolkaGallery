document.addEventListener('DOMContentLoaded', async function () {
    const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    // Fungsi untuk mengambil data dari tabel 'project'
    async function loadProjects() {
        let { data: projects, error } = await supabaseClient
            .from('project')
            .select('*');

        if (error) {
            console.error('Error fetching projects:', error.message);
            return;
        }

        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = ''; // Kosongkan konten sebelumnya

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            projectCard.innerHTML = `
                <img src="${project.image_url}" alt="Project Image">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <p>By ${project.creator}</p>
                <button>Lihat Project</button>
            `;

            galleryGrid.appendChild(projectCard);
        });
    }

    // Load projects saat halaman dimuat
    loadProjects();
});
