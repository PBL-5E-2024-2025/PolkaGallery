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
        document.getElementById('projectLink').href = project.link_project;
    }

    if (project.link_video) {
        document.getElementById('promoVideoLink').href = project.link_video;
    }

    // Kontak Sosial Media Mahasiswa
    const socialMediaContainer = document.querySelector('.icon-sosial');
    if (project.kontak_mahasiswa) { // Menggunakan kolom 'kontak_mahasiswa' dari database
        const kontakList = project.kontak_mahasiswa.split(',');
        kontakList.forEach(kontak => {
            const kontakTrimmed = kontak.trim();
            let link = '';
            let iconClass = '';

            // Pengecekan dengan regex untuk berbagai format URL Instagram
            const instagramRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+/;
            if (instagramRegex.test(kontakTrimmed)) {
                // Jika URL Instagram
                link = kontakTrimmed;
                iconClass = 'fab fa-instagram';
            } else if (kontakTrimmed.startsWith('mailto:')) {
                // Jika Email dengan prefix mailto:
                link = kontakTrimmed;
                iconClass = 'fas fa-envelope';
            } else if (kontakTrimmed.includes('@')) {
                // Jika hanya email tanpa prefix mailto:
                link = `mailto:${kontakTrimmed}`;
                iconClass = 'fas fa-envelope';
            }

            if (link) {
                const socialLink = document.createElement('a');
                socialLink.href = link;
                socialLink.target = '_blank';
                socialLink.innerHTML = `<i class="${iconClass}"></i>`;
                socialMediaContainer.appendChild(socialLink);
            }
        });
    }
});
