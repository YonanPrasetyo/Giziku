# Persyaratan
- Node.js
- Backend API yang berjalan (misalnya pada http://localhost:3000), repositori backend bisa dilihat pada https://YonanPrasetyo/Giziku_Backend

# Cara Menjalankan di Lokal
1. Clone repositori:
   ```bash
   git clone https://YonanPrasetyo/Giziku_FrontEnd
   cd Giziku_Frontend
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Salin file environment:
   ```bash
   cp .env.example .env
   ```
4. Periksa variabel di `.env`:
   - `VITE_API_URL`: alamat backend API, misalnya `http://localhost:3000`

5. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

# Login Admin
- Email: `admin@gmail.com`
- Password: `11111111`

# Langkah Saran
1. Buka aplikasi di browser setelah `npm run dev`.
2. Login sebagai admin.
3. Akses fitur import makanan di halaman admin.
4. Unggah file Excel berisi data makanan, sudah kami sediakan dengan nama file `makanan.xlsx`.

# Catatan
- Pastikan backend sudah berjalan dan `VITE_API_URL` menunjuk ke server API yang benar.
- Jika backend tidak berjalan, frontend tidak bisa memuat data atau login.
