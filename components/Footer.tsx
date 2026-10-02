export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-muted">© {new Date().getFullYear()} Arya Agung Triadi.</p>
        <a href="#home" className="inline-flex min-h-11 items-center gap-3 text-foreground hover:text-accent">Kembali ke atas <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
