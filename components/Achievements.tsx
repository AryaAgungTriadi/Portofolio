import Image from "next/image";

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10"
    >
      <div className="border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">04 / Prestasi</p>
        <h2 id="achievements-title" className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          Berkarya bersama,<br />meraih pencapaian.
        </h2>
        <article aria-labelledby="video-award-title" className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-200 hover:border-accent/30 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 bg-accent/5 p-7 sm:p-9 md:border-r md:border-b-0">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Lomba video / 2022</p>
            <div>
              <p className="text-6xl font-semibold tracking-tight text-accent sm:text-7xl">III<span className="ml-2 text-lg font-medium tracking-normal text-foreground">Juara</span></p>
              <p className="mt-4 text-sm leading-relaxed text-muted">Kategori usia 15–19 tahun</p>
            </div>
            <p className="text-sm text-muted"><time dateTime="2022-09-29">29 September 2022</time></p>
          </div>
          <div className="p-7 sm:p-9">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Pencapaian tim</p>
            <h3 id="video-award-title" className="mt-4 text-2xl leading-snug font-semibold">Lomba Video Jambore Remaja</h3>
            <p className="mt-4 leading-relaxed text-muted">Tim SMAN 3 Pandeglang meraih Juara III dalam lomba video bertema “Remaja Sehat Bebas Anemia dan Stunting”. Aku tercatat sebagai anggota tim pada sertifikat kegiatan.</p>
            <dl className="mt-7 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div><dt className="text-xs text-muted">Tim</dt><dd className="mt-2 text-sm text-foreground">SMAN 3 Pandeglang</dd></div>
              <div><dt className="text-xs text-muted">Penyelenggara</dt><dd className="mt-2 text-sm text-foreground">Médecins Sans Frontières (MSF)</dd></div>
            </dl>
          </div>
        </article>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <a href="/images/achievement-video.jpg" target="_blank" rel="noopener noreferrer" aria-label="Lihat sertifikat Juara III lomba video (tab baru)" className="block transition-opacity hover:opacity-90">
              <Image src="/images/achievement-video.jpg" alt="Sertifikat Juara III lomba video Jambore Remaja untuk tim SMAN 3 Pandeglang" width={1588} height={1128} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full" />
            </a>
            <figcaption className="px-6 py-4 text-sm text-muted">Sertifikat Juara III lomba video</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <a href="/images/achievement-team.jpg" target="_blank" rel="noopener noreferrer" aria-label="Lihat daftar anggota tim lomba video (tab baru)" className="block transition-opacity hover:opacity-90">
              <Image src="/images/achievement-team.jpg" alt="Daftar anggota tim SMAN 3 Pandeglang, termasuk Arya Agung Triadi" width={1528} height={1093} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full" />
            </a>
            <figcaption className="px-6 py-4 text-sm text-muted">Daftar anggota tim SMAN 3 Pandeglang</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

