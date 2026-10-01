const projects = [
  {
    name: "Taskly",
    category: "Proyek mandiri",
    subtitle: "Student Task Manager",
    description: "Aplikasi pengelolaan tugas untuk membantu mahasiswa mengatur pekerjaan, memantau tenggat, dan tetap fokus.",
    context: "Dikembangkan sebagai proyek pribadi.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    mark: "T.",
  },
  {
    name: "Tradeplast",
    category: "Proyek tim",
    subtitle: "Platform Pengelolaan Limbah Plastik",
    description: "Platform web untuk pengelolaan limbah plastik, dengan katalog plastik, alur penyetoran, dan dompet digital.",
    context: "Dikerjakan bersama tim dalam program magang/studi independen.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    mark: "Tp.",
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10">
      <div className="border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">03 / Proyek</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end">
          <h2 id="projects-title" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">Dari ide,<br />menjadi karya.</h2>
          <p className="max-w-md leading-relaxed text-muted">Dua proyek dari perjalanan belajarku: membangun aplikasi secara mandiri dan berkolaborasi bersama tim.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} aria-labelledby={project.name.toLowerCase() + "-title"} className="overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-200 hover:border-accent/30">
              <div aria-hidden="true" className="flex min-h-44 items-center justify-between gap-4 border-b border-white/10 bg-accent/5 px-7 py-8 sm:px-8">
                <span className="text-6xl font-semibold tracking-tighter text-accent sm:text-7xl">{project.mark}</span>
                <span className="max-w-36 text-right text-xs uppercase leading-relaxed tracking-[0.15em] text-muted">{project.subtitle}</span>
              </div>
              <div className="p-7 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{project.category}</p>
                <h3 id={project.name.toLowerCase() + "-title"} className="mt-3 text-2xl font-semibold">{project.name}</h3>
                <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{project.context}</p>
                <ul aria-label={"Teknologi " + project.name} className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((technology) => <li key={technology} className="rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-muted">{technology}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
