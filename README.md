# Portfolio Arya Agung Triadi

Portfolio personal Arya Agung Triadi, mahasiswa Informatika Universitas Sultan Ageng Tirtayasa dengan minat pada Web Development, UI/UX, serta karya visual. Dibangun dengan tema gelap dan aksen orange.

**[Kunjungi portfolio →](https://portofolio-green-chi.vercel.app/)**

## Fitur

- Form kontak dengan pilihan subjek dan pengiriman email melalui Resend.
- Panel Buku Tamu mengambang, komentar dan balasan disimpan di Supabase dengan moderasi.

- Pilihan bahasa Indonesia/Inggris (ID / EN) dan tema gelap/terang, dengan preferensi yang diingat.

- Tampilan responsive untuk desktop dan perangkat mobile.
- Navbar dengan indikator aktif yang bergeser halus dan navigasi scroll smooth.
- Animasi fade, blur ringan, dan geser saat konten masuk layar; berulang ketika kembali ke layar.
- Dukungan preferensi reduced motion, navigasi keyboard, dan tautan untuk melewati navigasi.
- Profil dan pengalaman Magang Mandiri VINIX7 Batch 4 di bidang Web Development dan UI/UX.
- Daftar keterampilan, proyek, prestasi, dan sertifikat dari terbaru ke terlama.
- Tombol unduh CV dalam format PDF.
- Tautan proyek, GitHub, LinkedIn, serta kontak.

## Teknologi

Next.js 16, React 19, TypeScript, Tailwind CSS 4, dan ESLint. Animasi menggunakan API browser tanpa library animasi tambahan.

## Proyek yang ditampilkan

| Proyek | Konteks | Website | Repository |
| --- | --- | --- | --- |
| Taskly | Proyek mandiri untuk pengelolaan tugas mahasiswa | [Lihat Taskly](https://taskly-student-task-manager.vercel.app/) | [GitHub](https://github.com/AryaAgungTriadi/Taskly-Student-Task-Manager) |
| Tradeplast | Proyek tim dalam program magang/studi independen | [Lihat Tradeplast](https://kelompok-6-web-dev-uiux-tradeplast.vercel.app/) | [GitHub](https://github.com/ilhamaulnaaa/Kelompok-6-Web-Dev-UIUX_Tradeplast) |

## Menjalankan secara lokal

Install Node.js yang sesuai dengan persyaratan versi Next.js di project dan npm, lalu jalankan:

```sh
git clone https://github.com/AryaAgungTriadi/Portofolio.git
cd Portofolio
npm ci
npm run dev
```

Buka [localhost:3000](http://localhost:3000). Untuk mengaktifkan form kontak dan Buku Tamu, ikuti [panduan Supabase dan Resend](docs/CONTACT-GUESTBOOK.md). Tanpa environment variable, portfolio tetap dapat dibuka, tetapi pengiriman pesan belum aktif.

## Pemeriksaan dan build

```sh
npm run lint
npm run build
npm start
```

Jalankan `npm start` setelah build berhasil.

## Struktur project

```text
app/
  page.tsx              # Susunan bagian halaman utama
  layout.tsx            # Metadata, bahasa, dan font
  globals.css           # Tema dan gaya global
components/
  Navbar.tsx            # Navigasi dan indikator aktif
  Hero.tsx              # Pengenalan, foto, dan unduh CV
  About.tsx             # Profil dan pengalaman
  Skills.tsx            # Teknologi dan tools
  Projects.tsx          # Taskly dan Tradeplast beserta tautannya
  Achievements.tsx      # Prestasi lomba video
  Certificates.tsx      # Sertifikat, diurutkan berdasarkan tanggal
  Contact.tsx           # Kontak dan profil sosial
  Footer.tsx            # Penutup halaman
  ScrollReveal.tsx      # Animasi saat konten masuk layar
public/
  images/               # Foto dan gambar sertifikat
  documents/            # PDF CV
```

## Mengubah isi

- Edit profil di `Hero.tsx` dan `About.tsx`.
- Edit daftar `skillGroups`, `projects`, dan `certificates` pada komponen terkait.
- Tautan website dan repository proyek berada pada properti `live` dan `github` di `Projects.tsx`.
- Informasi kontak dan profil sosial berada di `Contact.tsx`.
- Untuk mengganti CV, perbarui `public/documents/cv-arya-agung-triadi.pdf`.
- Untuk mengganti foto atau sertifikat, perbarui aset di `public/images/` serta path dan dimensi gambar di komponen terkait.

## Deployment

Website di-host di Vercel dan terhubung ke repository ini. Pembaruan pada branch `main` memicu deployment otomatis.

Untuk deployment sendiri, import repository ke Vercel dan gunakan preset Next.js dengan folder project sebagai root.

## Kontak

- [LinkedIn](https://www.linkedin.com/in/arya-agung-triadi-31ab79318)
- [GitHub](https://github.com/AryaAgungTriadi)
- [Email](mailto:aryaagungtriadi22@gmail.com)

Foto, CV, dan sertifikat merupakan aset pribadi Arya Agung Triadi.
