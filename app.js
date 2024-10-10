const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Selamat datang di aplikasi Showcase Gallery Mahasiswa di Teknik Informatika!');
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});