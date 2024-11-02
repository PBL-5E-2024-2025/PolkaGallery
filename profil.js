document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const profileImage = sessionStorage.getItem('profileImage');

    if (isLoggedIn && username) {
        // Menampilkan gambar profil
        document.querySelector('.profile-pic img').src = profileImage || 'assets/image/user.png';

        // Inisialisasi Supabase
        const supabaseUrl = 'https://ctuuidmssgwoibomcsem.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0';
        const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

        console.log("Fetching user data for username:", username); // Debugging log

        try {
            // Mengambil data pengguna berdasarkan username
            const { data, error, status } = await supabaseClient
                .from('users')
                .select('username, password')
                .eq('username', username)
                .maybeSingle();
        
            if (error) {
                console.error('Error fetching user data:', error.message);
                
                // Tampilkan pesan berbeda tergantung jenis error
                if (status === 404) {
                    alert('Data pengguna tidak ditemukan.');
                } else if (status === 406) {
                    alert('Request tidak diterima oleh server.');
                } else {
                    alert('Gagal mengambil data pengguna. Cek kembali konfigurasi atau izin akses di Supabase.');
                }
            } else if (data) {
                // Mengisi field dengan data pengguna
                document.getElementById('username').value = data.username;
                document.getElementById('password').value = data.password;
            } else {
                alert('Data pengguna tidak ditemukan.');
            }
        } catch (e) {
            console.error('Unexpected error:', e);
            alert('Terjadi kesalahan saat mengambil data pengguna.');
        }
    } else {
        alert("Pengguna belum login. Silakan login terlebih dahulu.");
    }
});
