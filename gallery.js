document.addEventListener('DOMContentLoaded', async function () {
    const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    const galleryGrid = document.getElementById('gallery-grid');
    const searchForm = document.getElementById('searchForm');
    const kategoriSelect = document.getElementById('kategori');
    const namaProjectInput = document.getElementById('namaProject');

    // Function to fetch and display projects
    async function loadProjects(filters = {}) {
        let { data: projects, error } = await supabaseClient
            .from('project')
            .select('*')
            .order('id_project', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error.message);
            return;
        }

        // Apply filters
        if (filters.kategori) {
            projects = projects.filter(project => project.jenis_project === filters.kategori);
        }

        if (filters.namaProject) {
            projects = projects.filter(project => project.judul.toLowerCase().includes(filters.namaProject.toLowerCase()));
        }

        // Clear previous content
        galleryGrid.innerHTML = '';

        // Create cards for each project
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            projectCard.innerHTML = `
                <img src="${project.url_image}" alt="Project Image" />
                <h2>${project.judul}</h2>
                <p>Kategori: ${project.jenis_project}</p>
                <!-- Pass project ID to project.html using URL query parameter -->
                <button onclick="location.href='project.html?id=${project.id_project}'">Lihat Project</button>
            `;

            galleryGrid.appendChild(projectCard);
        });
    }

    // Load initial projects when the page loads
    loadProjects();

    // Handle search form submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const filters = {
            kategori: kategoriSelect.value,
            namaProject: namaProjectInput.value
        };

        loadProjects(filters);
    });
});
