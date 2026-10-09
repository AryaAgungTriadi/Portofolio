"use client";

import ArrowIcon from "./ArrowIcon";

import { useLanguage } from "./Language";

import Typewriter from "./Typewriter";
import ContentPreview from "./ContentPreview";
import Gaming from "./Gaming";


export default function Achievements() {
  const { t } = useLanguage();
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10"
    >
      <div className="border-t border-foreground/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">{t("04 / Prestasi")}</p>
        <h2 id="achievements-title" className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{t("Berkarya bersama,")}<br /><Typewriter words={[t("meraih pencapaian.")]} />
        </h2>
        <article aria-labelledby="video-award-title" className="mt-10 grid overflow-hidden rounded-2xl border border-foreground/10 bg-surface transition-colors duration-200 hover:border-accent/30 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between gap-8 border-b border-foreground/10 bg-accent/5 p-7 sm:p-9 md:border-r md:border-b-0">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{t("Lomba video / 2022")}</p>
            <div>
              <p className="text-6xl font-semibold tracking-tight text-accent sm:text-7xl">III<span className="ml-2 text-lg font-medium tracking-normal text-foreground">{t("Juara")}</span></p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t("Kategori usia 15–19 tahun")}</p>
            </div>
            <p className="text-sm text-muted"><time dateTime="2022-09-29">{t("29 September 2022")}</time></p>
          </div>
          <div className="p-7 sm:p-9">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Pencapaian tim")}</p>
            <h3 id="video-award-title" className="mt-4 text-2xl leading-snug font-semibold">{t("Lomba Video Jambore Remaja")}</h3>
            <p className="mt-4 leading-relaxed text-muted">{t("Tim SMAN 3 Pandeglang meraih Juara III dalam lomba video bertema “Remaja Sehat Bebas Anemia dan Stunting”. Dalam proyek ini, aku berperan sebagai videografer dan editor video.")}</p>
            <dl className="mt-7 grid gap-5 border-t border-foreground/10 pt-6 sm:grid-cols-2">
              <div><dt className="text-xs text-muted">{t("Tim")}</dt><dd className="mt-2 text-sm text-foreground">SMAN 3 Pandeglang</dd></div>
              <div><dt className="text-xs text-muted">{t("Penyelenggara")}</dt><dd className="mt-2 text-sm text-foreground">Médecins Sans Frontières (MSF)</dd></div>
              <div><dt className="text-xs text-muted">{t("Peranku")}</dt><dd className="mt-2 text-sm text-foreground">{t("Videografer & Editor Video")}</dd></div>
            </dl>
            <ContentPreview title={t("Lomba Video Jambore Remaja")} url="https://drive.google.com/file/d/1FObgb4wNlVzGMDOU7Z4ZOJl8EzrxmETu/preview" fallbackUrl="https://drive.google.com/file/d/1FObgb4wNlVzGMDOU7Z4ZOJl8EzrxmETu/view" label={t("Tonton Video")} video className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover" />
          </div>
        </article>
        <a href="#certificates" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm text-accent hover:underline">{t("Lihat sertifikat di bagian Sertifikat")}<ArrowIcon direction="down" /></a>
        <Gaming />
      </div>
    </section>
  );
}

