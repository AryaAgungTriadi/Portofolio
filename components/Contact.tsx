import Typewriter from "./Typewriter";
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10">
      <div className="grid gap-10 rounded-[2rem] border border-accent/20 bg-surface p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent">06 / Kontak</p>
          <h2 id="contact-title" className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">Mari mulai<br /><Typewriter words={["percakapan."]} /></h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">Punya ide proyek atau ingin berdiskusi tentang web, UI/UX, dan karya kreatif? Kamu bisa menghubungiku di sini.</p>
        </div>
        <address className="flex flex-col justify-center gap-6 not-italic">
          <div><p className="text-xs uppercase tracking-[0.15em] text-muted">Email</p><a href="mailto:aryaagungtriadi22@gmail.com" className="mt-2 inline-flex min-h-11 max-w-full items-center break-all text-base text-accent hover:underline sm:text-lg">aryaagungtriadi22@gmail.com</a></div>
          <div><p className="text-xs uppercase tracking-[0.15em] text-muted">Telepon</p><a href="tel:+6283841327394" className="mt-2 inline-flex min-h-11 items-center text-lg hover:text-accent">0838 4132 7394</a></div>
          <div><p className="text-xs uppercase tracking-[0.15em] text-muted">Lokasi</p><p className="mt-3 text-sm">Labuan, Pandeglang, Banten</p></div>
          <div className="border-t border-foreground/10 pt-5">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Profil</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a href="https://github.com/AryaAgungTriadi" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (tab baru)</span></a>
              <a href="https://www.linkedin.com/in/arya-agung-triadi-31ab79318" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (tab baru)</span></a>
            </div>
          </div>
        </address>
      </div>
    </section>
  );
}


