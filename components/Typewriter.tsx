"use client";

import { useEffect, useRef } from "react";

export default function Typewriter({ words, loop = false }: { words: string[]; loop?: boolean }) {
  const container = useRef<HTMLSpanElement>(null);
  const output = useRef<HTMLSpanElement>(null);
  const longest = words.reduce((a, b) => a.length >= b.length ? a : b);

  useEffect(() => {
    const element = container.current;
    const text = output.current;
    if (!element || !text || !window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let word = 0;
    let count = 0;
    let deleting = false;
    const stop = () => {
      clearTimeout(timer);
      element.dataset.typing = "false";
      text.textContent = words[0];
    };
    const tick = () => {
      count += deleting ? -1 : 1;
      text.textContent = words[word].slice(0, count);
      let delay = deleting ? 55 : 95;
      if (!deleting && count === words[word].length) {
        if (!loop) { element.dataset.typing = "false"; return; }
        deleting = true;
        delay = 1800;
      } else if (deleting && count === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    const start = () => {
      stop();
      if (preference.matches || !visible) return;
      word = 0; count = 0; deleting = false;
      text.textContent = "";
      element.dataset.typing = "true";
      timer = setTimeout(tick, 180);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0 });
    observer.observe(element);
    preference.addEventListener("change", start);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", start);
      stop();
    };
  }, [words, loop]);

  return <span ref={container} className="typewriter relative inline-grid align-bottom">
    <span className="sr-only">{words.join(", ")}</span>
    <span aria-hidden="true" className="invisible col-start-1 row-start-1">{longest}</span>
    <span aria-hidden="true" className="col-start-1 row-start-1"><span ref={output}>{words[0]}</span><span className="typewriter-cursor absolute ml-1 font-normal">|</span></span>
  </span>;
}
