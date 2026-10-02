"use client";

import { useLanguage } from "@/components/Language";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ScrollReveal from "@/components/ScrollReveal";
import Guestbook from "@/components/Guestbook";

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <a href="#main-content" className="sr-only fixed top-3 left-3 z-[100] rounded-lg bg-accent px-4 py-3 text-on-accent focus:not-sr-only">{t("Lewati navigasi")}</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certificates />
        <Contact />
      </main>
      <ScrollReveal />
      <Footer />
      <Guestbook />
    </>
  );
}
