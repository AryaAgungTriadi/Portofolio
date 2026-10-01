# Portfolio Arya Agung Triadi

Portfolio personal dengan tema gelap dan aksen orange, dibangun menggunakan Next.js, React, TypeScript, dan Tailwind CSS.

## Menjalankan secara lokal

Gunakan Node.js dan npm, lalu jalankan:

```sh
npm ci
npm run dev
```

Buka http://localhost:3000.

## Pemeriksaan dan build

```sh
npm run lint
npm run build
npm start
```

Jalankan `npm start` setelah build berhasil.

## Struktur

- `app/page.tsx`: urutan section halaman utama.
- `app/layout.tsx`: metadata, bahasa, dan font.
- `app/globals.css`: warna tema, style global, dan preferensi reduced motion.
- `components/Navbar.tsx`: menu responsive dan penanda section aktif.
- `components/Hero.tsx` dan `About.tsx`: profil dan pengenalan.
- `components/Skills.tsx`: daftar teknologi dan tools.
- `components/Projects.tsx`: Taskly (mandiri) dan Tradeplast (tim).
- `components/Achievements.tsx`: prestasi.
- `components/Certificates.tsx`: sertifikat dengan tautan gambar.
- `components/Contact.tsx` dan `Footer.tsx`: kontak dan penutup.
- `public/images/`: foto profil dan sertifikat dari portfolio lama.

## Mengubah isi

Edit daftar `skillGroups` di Skills, `projects` di Projects, dan `certificates` di Certificates. Informasi kontak berada di Contact. Ganti aset di `public/images/` dan sesuaikan path serta dimensi gambar pada komponen terkait.

Detail peran proyek, screenshot, dan tautan demo/GitHub masih dapat dilengkapi. Kartu proyek saat ini menampilkan ringkasan tanpa tautan demo.

## Deployment

Project siap dibangun sebagai aplikasi Next.js. Untuk Vercel, import repository GitHub, gunakan preset Next.js, dan jadikan folder project ini sebagai root. Tidak ada environment variable yang diperlukan oleh portfolio saat ini.

Foto dan sertifikat merupakan aset pribadi Arya Agung Triadi.
