# Giziku Backend

Panduan ini menjelaskan cara menjalankan proyek Giziku Backend di localhost.

## Persiapan

1. Clone repository:

```bash
git clone https://github.com/YonanPrasetyo/Giziku_Backend.git
```

2. Masuk ke folder proyek:

```bash
cd Giziku_Backend
```

3. Install dependensi:

```bash
npm install
```

4. Buat file lingkungan dari contoh:

- Linux/macOS/Git Bash:
```bash
cp .env.example .env
```
- Windows PowerShell/CMD:
```powershell
copy .env.example .env
```

## Konfigurasi `.env`

Buka file `.env` dan sesuaikan nilai berikut sebelum menjalankan aplikasi:

- `HOST`: alamat server (contoh: `localhost`)
- `PORT`: port aplikasi (contoh: `3000`)
- `FRONTEND_URL`: URL asal frontend yang diizinkan untuk CORS
- `AI_ENDPOINT_URL`: endpoint AI yang digunakan aplikasi
- `PGUSER`: username PostgreSQL
- `PGHOST`: host PostgreSQL (biasanya `localhost`)
- `PGPASSWORD`: password PostgreSQL
- `PGDATABASE`: nama database PostgreSQL (misal: `giziku`)
- `PGPORT`: port PostgreSQL (default `5432`)
- `ACCESS_TOKEN_KEY`: secret JWT untuk access token
- `REFRESH_TOKEN_KEY`: secret JWT untuk refresh token

> Pastikan `ACCESS_TOKEN_KEY` dan `REFRESH_TOKEN_KEY` diisi dengan string acak yang kuat.

## Menjalankan database

Sebelum migrasi, pastikan database sudah dibuat. Contoh jika menggunakan PostgreSQL:

```bash
createdb giziku
```

Jika Anda belum membuat database, sesuaikan `PGDATABASE` pada `.env` dengan database yang tersedia.

## Migrasi dan seeder

Jalankan migrasi untuk membuat tabel dan menyiapkan data awal:

```bash
npm run migrate
```

> Jika ada migrasi tambahan atau seed, jalankan kembali perintah sesuai kebutuhan.

## Menjalankan aplikasi

Untuk menjalankan server dalam mode pengembangan:

```bash
npm run start:dev
```

Untuk menjalankan server dalam mode produksi:

```bash
npm run start:prod
```

Setelah berhasil, aplikasi akan berjalan di:

```text
http://localhost:3000
```

## Login Admin

Akun admin default yang tersedia:

- Email: `admin@gmail.com`
- Password: `11111111`

Gunakan akun ini untuk login dan mengakses rute yang memerlukan peran `admin`.

## Catatan tambahan

- Jika Anda menggunakan Windows dan ingin menjalankan perintah `cp`, gunakan Git Bash atau WSL.
- Pastikan `PGHOST`, `PGUSER`, `PGPASSWORD`, dan `PGDATABASE` sudah benar agar koneksi ke PostgreSQL berhasil.
- `FRONTEND_URL` harus disesuaikan jika aplikasi frontend dijalankan di alamat berbeda.
