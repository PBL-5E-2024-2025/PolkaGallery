const SUPABASE_URL = 'https://ctuuidmssgwoibomcsem.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXVpZG1zc2d3b2lib21jc2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTcwODEsImV4cCI6MjA0MjI5MzA4MX0.Z9vz877mHKT1nHlS40HMy-95TLUxc9YsHso3U_xhUL0'; // Ganti dengan API key Anda

// Inisialisasi supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Ketika DOM siap
document.addEventListener('DOMContentLoaded', async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nip = urlParams.get('NIP');

    // Ambil data dosen berdasarkan NIP
    const { data, error } = await supabaseClient
        .from('dosen')
        .select('*')
        .eq('nip', nip)
        .single();

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    // Isi form dengan data yang diambil
    document.getElementById('nip').value = data.nip;
    document.getElementById('nama').value = data.nama;
    document.getElementById('sik').value = data.sik;
    document.getElementById('sa').value = data.sa;
    document.getElementById('penter').value = data.penter;

    // Event listener untuk form submit
    document.getElementById('editForm').addEventListener('submit', async(e) => {
        e.preventDefault(); // Mencegah reload halaman

        // Upload gambar
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from('images')
            .upload(`dosen_images/${nip}.jpg`, document.getElementById('gambarFile').files[0]);

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            return;
        }

        // Ambil URL gambar yang diupload
        const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/dosen_images/${nip}.jpg`;

        // Update data dosen di tabel
        const { data: updateData, error: updateError } = await supabaseClient
            .from('dosen')
            .update({
                nama: document.getElementById('nama').value,
                sik: document.getElementById('sik').value,
                sa: document.getElementById('sa').value,
                penter: document.getElementById('penter').value,
                gambar: imageUrl // Simpan URL gambar
            })
            .match({ nip }); // Cocokkan NIP

        if (updateError) {
            console.error('Error updating data:', updateError);
            alert('Upload Gagal');
            return;
        }

        console.log('Data updated successfully:', updateData);
        alert('Data dosen berhasil diperbarui!');
        window.location.href = 'index.html';
    });
});