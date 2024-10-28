document.addEventListener('DOMContentLoaded', async function () {
    const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co'; 
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    // Ambil ID project dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        console.error('No project ID found in URL');
        return;
    }

    // Fetch project data by ID
    const { data: project, error } = await supabaseClient
        .from('project')
        .select('*')
        .eq('id_project', projectId)
        .single();

    if (error) {
        console.error('Error fetching project:', error.message);
        return;
    }

    // Update HTML elements with project data
    document.querySelector('.project-name').textContent = project.judul;
    document.querySelector('.project-description').textContent = project.deskripsi;
    document.querySelector('.project-image').src = project.url_image;
    
    // Pengembang Proyek
    const developerContainer = document.querySelector('.pengembang-container');
    const developers = project.nama_mhs ? project.nama_mhs.split(',') : [];
    developers.forEach(developer => {
        const devElement = document.createElement('div');
        devElement.classList.add('developer-names');
        devElement.innerHTML = `
            <img src="./assets/image/user.png" alt="gambar pengembang" class="project-profil">
            <span>${developer.trim()}</span>
        `;
        developerContainer.appendChild(devElement);
    });

    // Dosen Pembimbing
    const supervisorContainer = document.querySelector('.pembimbing-container');
    supervisorContainer.innerHTML = `
        <img src="./assets/image/user.png" alt="gambar dosen" class="project-profil">
        <span>${project.dosen}</span>
    `;

    // Link Project & Video
    if (project.link_project) {
        document.querySelector('.info-item a').href = project.link_project;
    }

    if (project.link_video) {
        document.querySelector('.info-item a').href = project.link_video;
    }

    // Sosial Media
    const socialMediaContainer = document.querySelector('.icon-sosial');
    const socialMediaLinks = JSON.parse(project.social_media || '[]'); // Assuming social_media is stored as a JSON string in Supabase

    socialMediaLinks.forEach(link => {
        const icon = document.createElement('a');
        icon.href = link.url;
        icon.target = "_blank";
        let platform = '';

        if (link.url.includes('instagram.com')) {
            platform = 'instagram.png';
        } else if (link.url.includes('linkedin.com')) {
            platform = 'linkedin.png';
        } else if (link.url.includes('facebook.com')) {
            platform = 'facebook.png';
        } else {
            platform = 'generic_social.png'; // fallback icon for other platforms
        }

        icon.innerHTML = `<img src="./assets/image/${platform}" alt="${link.platform}" class="sosial-icon">`;
        socialMediaContainer.appendChild(icon);
    });
});
