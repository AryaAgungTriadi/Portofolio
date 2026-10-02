"use client";

import { useLanguage } from "./Language";

import Typewriter from "./Typewriter";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const certificates = [
  { title: "Juara III Lomba Video Jambore Remaja", date: "29 September 2022", iso: "2022-09-29", image: "/images/achievement-video.jpg", width: 1588, height: 1128, role: "Prestasi / Lomba Video", detailImage: "/images/achievement-team.jpg", detailWidth: 1528, detailHeight: 1093, description: "Tim SMAN 3 Pandeglang meraih Juara III kategori usia 15–19 tahun dalam lomba video Jambore Remaja bertema Remaja Sehat Bebas Anemia dan Stunting, yang diselenggarakan oleh Médecins Sans Frontières (MSF). Preview pertama menampilkan sertifikat penghargaan; preview kedua memuat daftar anggota tim, termasuk Arya Agung Triadi." },
  { title: "Magang Mandiri VINIX7 — Web Development dan UI/UX", date: "23 Juni 2026", iso: "2026-06-23", image: "/images/certificate-vinix7.jpg", width: 1432, height: 1012, role: "Peserta / MSIB Batch 4", pdf: "/documents/certificate-vinix7.pdf", detailImage: "/images/certificate-vinix7-details.jpg" },
  { title: "The Future of Web Developer and IoT Engineer", date: "9 September 2023", iso: "2023-09-09", image: "/images/certificate-web.jpg", width: 877, height: 620, role: "Panitia / Webinar" },
  { title: "CyberAware: Jaga Data, Lindungi Privasi", date: "13 Juni 2025", iso: "2025-06-13", image: "/images/certificate-cyber.jpg", width: 1053, height: 745, role: "Panitia / Webinar" },
  { title: "Cyber Security: Culture and Society", date: "9 Desember 2023", iso: "2023-12-09", image: "/images/certificate-extra-0.jpg", width: 1682, height: 1190, role: "Peserta / Webinar" },
  { title: "Fundamental of Digital Marketing, The Content Creator", date: "9 Oktober 2023", iso: "2023-10-09", image: "/images/certificate-extra-1.jpg", width: 1440, height: 1080, role: "Peserta / Webinar" },
  { title: "Exploring Cloud System: Membahas Software Terkini untuk Pemula dan Profesional", date: "11 November 2023", iso: "2023-11-11", image: "/images/certificate-extra-2.jpg", width: 1682, height: 1190, role: "Peserta / Webinar" },
  { title: "Meniti Karir di Perusahaan Multinasional", date: "19 Februari 2024", iso: "2024-02-19", image: "/images/certificate-extra-3.jpg", width: 1682, height: 1190, role: "Peserta / Kuliah Umum" },
  { title: "Peluang Karir dalam Era Kecerdasan Artificial Menghadapi Revolusi Industri 5.0", date: "4 Juni 2024", iso: "2024-06-04", image: "/images/certificate-extra-4.jpg", width: 1440, height: 1080, role: "Peserta / Kuliah Umum" },
  { title: "Visiting Lecture Big Data and Artificial Intelligence", date: "24 Agustus 2024", iso: "2024-08-24", image: "/images/certificate-extra-5.jpg", width: 1682, height: 1190, role: "Peserta / Visiting Lecture" },
  { title: "Teknik Keamanan Jaringan", date: "16 Juni 2025", iso: "2025-06-16", image: "/images/certificate-extra-6.jpg", width: 1685, height: 1191, role: "Peserta / Webinar" },
];

export default function Certificates() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<(typeof certificates)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!selected) return;
    const popup = dialog.current;
    if (!popup) return;
    popup.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      popup.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);
  return (
    <>
    <section id="certificates" aria-labelledby="certificates-title" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10">
      <div className="border-t border-foreground/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">{t("05 / Sertifikat")}</p>
        <h2 id="certificates-title" className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"><Typewriter words={[t("Bagian dari perjalanan.")]} /></h2>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">{t("Pengalaman magang, serta kegiatan sebagai panitia dan peserta dalam webinar, kuliah umum, dan visiting lecture.")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[...certificates].sort((a, b) => b.iso.localeCompare(a.iso)).map((certificate) => (
            <article key={certificate.image} className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface transition-colors duration-200 hover:border-accent/30">
              <button type="button" onClick={() => setSelected(certificate)} className="group block w-full cursor-pointer" aria-haspopup="dialog" aria-label={`${t("Lihat detail sertifikat")} ${t(certificate.title)}`}>
                <Image src={certificate.image} alt={`${t("Sertifikat atas nama Arya Agung Triadi:")} ${t(certificate.title)}`} width={certificate.width} height={certificate.height} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full transition-opacity group-hover:opacity-85" />
              </button>
              <div className="p-6 sm:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{t(certificate.role)}</p>
                <h3 className="mt-3 text-xl leading-snug font-semibold">{t(certificate.title)}</h3>
                <p className="mt-4 text-sm text-muted"><time dateTime={certificate.iso}>{t(certificate.date)}</time></p>
                <button type="button" onClick={() => setSelected(certificate)} aria-haspopup="dialog" className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm text-accent hover:underline">{t("Lihat detail")}<span aria-hidden="true">↗</span></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <dialog ref={dialog} aria-labelledby="certificate-dialog-title" aria-describedby="certificate-dialog-description" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(event) => {
      if (event.target === event.currentTarget) setSelected(null);
    }} className="certificate-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-2xl border border-foreground/15 bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm">
      {selected && <div>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-foreground/10 bg-surface px-5 py-3 sm:px-7">
          <p className="text-sm font-medium text-accent">{t("Detail sertifikat")}</p>
          <button type="button" autoFocus onClick={() => setSelected(null)} className="min-h-11 cursor-pointer rounded-lg border border-foreground/20 px-4 text-sm transition-colors hover:border-accent hover:text-accent" aria-label={t("Tutup detail sertifikat")}>{t("Tutup")}<span aria-hidden="true">×</span></button>
        </div>
        <div className="p-5 sm:p-7">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">{t(selected.role)}</p>
          <h2 id="certificate-dialog-title" className="mt-3 text-2xl font-semibold sm:text-3xl">{t(selected.title)}</h2>
          <p className="mt-3 text-sm text-muted"><time dateTime={selected.iso}>{t(selected.date)}</time></p>
          <p id="certificate-dialog-description" className="mt-4 leading-relaxed text-muted">{selected.description ? t(selected.description) : selected.pdf ? t("Sertifikat penyelesaian Magang Mandiri MSIB Batch 4 di PT VINIX SEVEN AURUM, Divisi Web Dev UI/UX, pada 23 Februari–23 Juni 2026. Halaman kedua memuat jobdesk dan pencapaian, termasuk riset pengguna, desain antarmuka, prototyping, pengembangan web, dan deployment.") : `${t("Sertifikat atas nama Arya Agung Triadi:")} ${t(selected.title)}. ${t(selected.role)}.`}</p>
          <div className="mt-6 space-y-4">
            <Image src={selected.image} alt={`${t("Sertifikat:")} ${t(selected.title)}`} width={selected.width} height={selected.height} sizes="(max-width: 1023px) 100vw, 960px" className="h-auto w-full rounded-lg" />
            {selected.detailImage && <Image src={selected.detailImage} alt={`${t("Halaman detail pendukung:")} ${t(selected.title)}`} width={selected.detailWidth ?? 1432} height={selected.detailHeight ?? 1012} sizes="(max-width: 1023px) 100vw, 960px" className="h-auto w-full rounded-lg" />}
          </div>
        </div>
      </div>}
    </dialog>
    </>
  );
}


