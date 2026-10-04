"use client";

import { useLanguage } from "./Language";

import Typewriter from "./Typewriter";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const certificates = [
  { title: "Juara III Lomba Video Jambore Remaja", date: "29 September 2022", iso: "2022-09-29", image: "/images/achievement-video.jpg", width: 1588, height: 1128, category: "Prestasi", badge: "Prestasi", role: "Prestasi / Lomba Video", detailImage: "/images/achievement-team.jpg", detailWidth: 1528, detailHeight: 1093, description: "Tim SMAN 3 Pandeglang meraih Juara III kategori usia 15–19 tahun dalam lomba video Jambore Remaja bertema Remaja Sehat Bebas Anemia dan Stunting, yang diselenggarakan oleh Médecins Sans Frontières (MSF). Preview pertama menampilkan sertifikat penghargaan; preview kedua memuat daftar anggota tim, termasuk Arya Agung Triadi." },
  { title: "Magang Mandiri VINIX7 — Web Development dan UI/UX", date: "23 Juni 2026", iso: "2026-06-23", image: "/images/certificate-vinix7.jpg", width: 1432, height: 1012, category: "Pelatihan & Magang", badge: "Magang", role: "Peserta / MSIB Batch 4", pdf: "/documents/certificate-vinix7.pdf", detailImage: "/images/certificate-vinix7-details.jpg" },
  { title: "The Future of Web Developer and IoT Engineer", date: "9 September 2023", iso: "2023-09-09", image: "/images/certificate-web.jpg", width: 877, height: 620, category: "Kepanitiaan", badge: "Panitia", role: "Panitia / Webinar" },
  { title: "CyberAware: Jaga Data, Lindungi Privasi", date: "13 Juni 2025", iso: "2025-06-13", image: "/images/certificate-cyber.jpg", width: 1053, height: 745, category: "Kepanitiaan", badge: "Panitia", role: "Panitia / Webinar" },
  { title: "Cyber Security: Culture and Society", date: "9 Desember 2023", iso: "2023-12-09", image: "/images/certificate-extra-0.jpg", width: 1682, height: 1190, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Webinar" },
  { title: "Fundamental of Digital Marketing, The Content Creator", date: "9 Oktober 2023", iso: "2023-10-09", image: "/images/certificate-extra-1.jpg", width: 1440, height: 1080, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Webinar" },
  { title: "Exploring Cloud System: Membahas Software Terkini untuk Pemula dan Profesional", date: "11 November 2023", iso: "2023-11-11", image: "/images/certificate-extra-2.jpg", width: 1682, height: 1190, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Webinar" },
  { title: "Meniti Karir di Perusahaan Multinasional", date: "19 Februari 2024", iso: "2024-02-19", image: "/images/certificate-extra-3.jpg", width: 1682, height: 1190, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Kuliah Umum" },
  { title: "Peluang Karir dalam Era Kecerdasan Artificial Menghadapi Revolusi Industri 5.0", date: "4 Juni 2024", iso: "2024-06-04", image: "/images/certificate-extra-4.jpg", width: 1440, height: 1080, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Kuliah Umum" },
  { title: "Visiting Lecture Big Data and Artificial Intelligence", date: "24 Agustus 2024", iso: "2024-08-24", image: "/images/certificate-extra-5.jpg", width: 1682, height: 1190, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Visiting Lecture" },
  { title: "Teknik Keamanan Jaringan", date: "16 Juni 2025", iso: "2025-06-16", image: "/images/certificate-extra-6.jpg", width: 1685, height: 1191, category: "Seminar & Webinar", badge: "Peserta", role: "Peserta / Webinar" },
];

const categories = ["Semua", "Pelatihan & Magang", "Kepanitiaan", "Seminar & Webinar", "Prestasi"];

export default function Certificates() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("Semua");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<(typeof certificates)[number] | null>(null);
  const filtered = [...certificates].filter(item => category === "Semua" || item.category === category).sort((a, b) => b.iso.localeCompare(a.iso));
  const visible = showAll ? filtered : filtered.slice(0, 2);
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
        <div role="group" aria-label={t("Kategori sertifikat")} className="mt-7 flex flex-wrap gap-2">
          {categories.map(item => <button key={item} type="button" aria-pressed={category === item} aria-controls="certificate-list" onClick={() => { setCategory(item); setShowAll(false); }} className={"min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors " + (category === item ? "border-accent bg-accent/10 text-accent" : "border-foreground/15 text-muted hover:border-accent/50 hover:text-accent")}>{t(item)}<span className="ml-2 text-xs opacity-70">{item === "Semua" ? certificates.length : certificates.filter(certificate => certificate.category === item).length}</span></button>)}
        </div>
        <div id="certificate-list" className="mt-5 grid gap-6 md:grid-cols-2">
          {visible.map((certificate, index) => (
            <article key={certificate.image} className={"overflow-hidden rounded-2xl border border-foreground/10 bg-surface transition-colors duration-200 hover:border-accent/30 " + (!showAll && index === 1 ? "hidden md:block" : "")}>
              <button type="button" onClick={() => setSelected(certificate)} className="group block w-full cursor-pointer" aria-haspopup="dialog" aria-label={`${t("Lihat detail sertifikat")} ${t(certificate.title)}`}>
                <Image src={certificate.image} alt={`${t("Sertifikat atas nama Arya Agung Triadi:")} ${t(certificate.title)}`} width={certificate.width} height={certificate.height} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full transition-opacity group-hover:opacity-85" />
              </button>
              <div className="p-6 sm:p-7">
                <span className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{t(certificate.badge)}</span>
                <h3 className="mt-3 text-xl leading-snug font-semibold">{t(certificate.title)}</h3>
                <p className="mt-4 text-sm text-muted"><time dateTime={certificate.iso}>{t(certificate.date)}</time></p>
                <button type="button" onClick={() => setSelected(certificate)} aria-haspopup="dialog" className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm text-accent hover:underline">{t("Lihat detail")}<span aria-hidden="true">↗</span></button>
              </div>
            </article>
          ))}
        </div>
        {!showAll && filtered.length > 1 && <div aria-hidden="true" className={"certificate-teaser relative mt-6 overflow-hidden " + (filtered.length <= 2 ? "md:hidden" : "")}>
          <div className="md:hidden">
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
              <Image src={filtered[1].image} alt="" width={filtered[1].width} height={filtered[1].height} sizes="100vw" className="h-auto w-full" />
            </div>
          </div>
          <div className="hidden grid-cols-2 gap-6 md:grid">
            {filtered.slice(2, 4).map(certificate => <div key={certificate.image} className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
              <Image src={certificate.image} alt="" width={certificate.width} height={certificate.height} sizes="50vw" className="h-auto w-full" />
            </div>)}
          </div>
          <div className="certificate-teaser-fade pointer-events-none absolute inset-0" />
        </div>}
        {filtered.length > 1 && <div className={"relative z-10 text-center " + (showAll ? "mt-7" : "-mt-8") + (filtered.length <= 2 && !showAll ? " md:hidden" : "")}>
          <button type="button" aria-expanded={showAll} aria-controls="certificate-list" onClick={() => setShowAll(value => !value)} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-accent/30 bg-background px-5 py-3 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-surface">{t(showAll ? "Tampilkan lebih sedikit" : "Lihat selengkapnya")}<span aria-hidden="true">{showAll ? "−" : "+"}</span></button>
        </div>}

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



