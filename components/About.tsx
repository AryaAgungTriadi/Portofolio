export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:px-10"
    >
      <div className="grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent">01 / Tentang</p>
          <h2 id="about-title" className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            Di balik<br />portfolio ini.
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-xl leading-relaxed text-foreground sm:text-2xl">
            Aku Arya Agung Triadi, mahasiswa Informatika Universitas Sultan Ageng Tirtayasa yang antusias di bidang UI/UX dan pengembangan web.
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Selain mengembangkan web dan desain antarmuka, aku juga tertarik pada fotografi, videografi, serta editing visual. Aku berpengalaman dalam proyek teknologi dan konten kreatif, serta menggunakan berbagai tools digital untuk pengembangan sistem dan desain.
          </p>
          <div className="mt-9 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Magang Mandiri · Batch 4</p>
            <p className="mt-4 text-lg leading-relaxed text-foreground">VINIX7 — Web Development &amp; UI/UX</p>
            <p className="mt-3 text-sm text-accent"><time dateTime="2026-02-23">23 Februari</time>–<time dateTime="2026-06-23">23 Juni 2026</time></p>
            <p className="mt-3 text-sm leading-relaxed text-muted">Mengikuti program VINIX7 di bidang Web Development dan UI/UX. Bersama tim, aku mengembangkan Tradeplast sebagai platform pengelolaan sampah plastik berbasis reward digital. Pembelajaran mencakup riset pengguna, wireframing, desain UI dan prototype, implementasi web dengan Next.js dan Supabase, serta pengujian, quality assurance, dan deployment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


