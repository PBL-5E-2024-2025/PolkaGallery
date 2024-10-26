document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const email = sessionStorage.getItem('email');
    const profileImage = sessionStorage.getItem('profileImage');

    if (isLoggedIn && email) {
        // Menampilkan gambar profil
        document.querySelector('.profile-pic img').src = profileImage || 'assets/image/user.png';

        // Inisialisasi Supabase
        const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0'; // Pastikan untuk mengganti dengan kunci Anda
        const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

        try {
            // Mengambil data pengguna berdasarkan email
            const { data, error } = await supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error) {
                console.error('Error fetching user data:', error);
                alert('Gagal mengambil data pengguna.');
            } else if (data) {
                // Mengisi field dengan data pengguna
                document.getElementById('name').value = data.nama || '';
                document.getElementById('username').value = data.username || '';
                document.getElementById('email').value = data.email || '';
                document.getElementById('nim').value = data.nim || '';
                document.getElementById('phone').value = data.no_hp || '';
                document.getElementById('role').value = data.role || '';
            } else {
                alert('Data pengguna tidak ditemukan.');
            }
        } catch (e) {
            console.error('Unexpected error:', e);
            alert('Terjadi kesalahan saat mengambil data pengguna.');
        }
    }
});

function goBack() {
    window.history.back(); // Kembali ke halaman sebelumnya
}
