document.addEventListener('DOMContentLoaded', () => {  
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const profileImage = sessionStorage.getItem('profileImage');

    const signInLink = document.getElementById('signInLink');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileImg = document.getElementById('profileImg');
    const usernameDisplay = document.getElementById('username-display');

    // Tampilkan profil pengguna jika sudah login
    if (isLoggedIn) {
        signInLink.style.display = 'none'; // Sembunyikan tombol Sign In
        profileDropdown.style.display = 'flex'; // Tampilkan dropdown

        // Setel foto profil
        profileImg.src = profileImage || './assets/image/user.png';
        usernameDisplay.textContent = username;
    } else {
        signInLink.style.display = 'inline'; // Tampilkan tombol Sign In
        profileDropdown.style.display = 'none'; // Sembunyikan dropdown dan foto profil
    }

    // Toggle dropdown saat foto profil di-klik
    profileImg.addEventListener('click', () => {
        profileDropdown.classList.toggle('active');
    });

    // Menutup dropdown jika klik di luar elemen dropdown
    document.addEventListener('click', (event) => {
        if (!profileDropdown.contains(event.target) && profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
        }
    });

    // Logout handler
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = './login.html';
        });
    }
});

// Event listener untuk form login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // Logika pengecekan username dan password (ini bisa disesuaikan)
    if (usernameInput === 'user' && passwordInput === 'password') { // Contoh login
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('username', usernameInput);
        sessionStorage.setItem('profileImage', './assets/image/user.png'); // Ganti dengan foto profil yang sesuai

        // Alihkan ke halaman utama setelah login
        window.location.href = './index.html'; // Ganti dengan halaman utama kamu
    } else {
        alert('Username atau password salah!');
    }
});
