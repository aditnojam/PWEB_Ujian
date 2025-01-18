# Panduan Menjalankan Program

Pastikan modul **Apache** dan **MySQL** di XAMPP sudah aktif serta database bernama **perpustakaan** dengan tabel **buku** telah tersedia.  
Untuk menjalankan back-end, buka terminal dan arahkan ke direktori backend menggunakan perintah:  
`cd .\backend\`  
Lalu jalankan server dengan perintah:  
`php -S localhost:8000`  

Selanjutnya, untuk menjalankan front-end, buka terminal baru, arahkan ke direktori proyek dengan perintah:  
`cd .\frontend\project`  
Jalankan perintah berikut untuk menginstal semua dependensi:  
`npm install`  
Kemudian, jalankan aplikasi dengan:  
`npm start`  

Jika terjadi error terkait **webvitals**, gunakan perintah berikut untuk memperbaiki:  
`npm install web-vitals`  
Setelah itu, ulangi langkah menjalankan aplikasi dengan:  
`npm start`  

Aplikasi akan berjalan pada alamat **http://localhost:3000** untuk front-end dan **http://localhost:8000** untuk back-end.
