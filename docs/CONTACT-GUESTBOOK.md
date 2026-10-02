# Setup kontak dan Buku Tamu

Tampilan mendukung ID/EN dan tema gelap/terang. Belum ada API key dalam kode. Tanpa konfigurasi, pengiriman dinonaktifkan dengan pesan yang jelas.

## 1. Supabase

1. Login di https://supabase.com/dashboard dan buat project khusus `portfolio-arya`.
2. Simpan password database di tempat pribadi dan pilih region terdekat.
3. Buka SQL Editor, paste isi `supabase/guestbook.sql`, lalu Run. Setelah itu jalankan `supabase/guestbook-auth.sql` untuk kolom identitas login.
4. Ambil project URL dan secret key dari pengaturan API Keys/Connect. Secret key hanya disimpan di environment server.
5. Isi `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, dan `SUBMISSION_HASH_SECRET` (string acak minimal 32 karakter).

Aktifkan provider GitHub dan Google di Authentication → Sign In / Providers. Buat OAuth app masing-masing dan gunakan callback `https://<project-ref>.supabase.co/auth/v1/callback` dari dashboard Supabase. Simpan Client ID dan Client Secret di pengaturan provider, bukan repository.

Atur Site URL ke domain portfolio dan izinkan redirect `https://<domain-portfolio>/auth/callback`. Untuk lokal, tambahkan `http://localhost:3000/auth/callback`. Isi `SUPABASE_PUBLISHABLE_KEY` untuk autentikasi dan `GUESTBOOK_OWNER_ID` dengan UUID akun pemilik dari Authentication → Users.

Komentar baru dari pengguna yang sudah login langsung tampil. Nama, avatar, provider, dan status DEV diambil dari identitas yang diverifikasi server. Daftar mengambil 100 pesan publik terbaru, mengelompokkan balasan di bawah pesan asal, dan diperbarui setiap 15 detik selama panel terbuka. Pemilik dapat menghapus tiap pesan dari panel; penghapusan menyembunyikan pesan (`approved = false`) dan mempertahankan balasannya. Pesan dapat dipulihkan lewat Table Editor dengan `approved = true`.

## 2. Resend

1. Daftar di https://resend.com menggunakan email tujuan yang akan menerima pesan.
2. Buat API key dengan akses pengiriman email, lalu isi `RESEND_API_KEY`.
3. Untuk percobaan, gunakan `CONTACT_FROM_EMAIL=Portfolio Arya <onboarding@resend.dev>` dan `CONTACT_TO_EMAIL` sama dengan email akun Resend.
4. Untuk pengirim dengan nama domain sendiri atau penerima lain, tambahkan dan verifikasi domain di Resend, kemudian ganti alamat pengirim.

Nama dan email pengunjung dimasukkan ke isi email; alamat pengunjung menjadi Reply-To. Tidak ada email pengunjung dalam Buku Tamu. Form tidak mengirim salinan otomatis ke alamat yang dimasukkan pengunjung.

## 3. Local dan Vercel

- Local: salin `.env.example` ke `.env.local`, isi nilainya, lalu restart server pengembangan.
- Vercel: Project → Settings → Environment Variables. Tambahkan variabel dari `.env.example`, aktifkan untuk Production (dan Preview bila dibutuhkan), kemudian redeploy.
- Jangan commit `.env.local`, secret key, atau password ke GitHub.

## 4. Verifikasi

1. Buka form kontak: isi nama, email, pilih subjek, lalu pesan. Kirim dan pastikan masuk ke email tujuan.
2. Klik Buku Tamu, login Google atau GitHub, lalu kirim pesan; pastikan langsung tampil.
3. Balas pesan dan cek urutannya. Login sebagai pemilik untuk memastikan badge DEV serta tombol hapus tersedia; akun lain tidak boleh menghapus.
4. Coba balasan, tutup via Escape/area luar, tampilan HP, tema, serta ID/EN.

Honeypot, validasi server, pemeriksaan origin, dan batas lima kiriman per jam per fingerprint per fitur tersedia. Batas disimpan atomik di database, berlaku lintas instance Vercel. IP tidak disimpan mentah; hash rate-limit dibersihkan setelah satu hari. Ini perlindungan dasar, bukan CAPTCHA. Jika menerima spam dari banyak alamat, tambahkan Turnstile sebelum membuka akses lebih luas.

Referensi: https://supabase.com/docs/guides/getting-started/api-keys dan https://resend.com/docs/api-reference/emails/send-email
