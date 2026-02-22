"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden min-h-screen flex items-center justify-center md:min-h-0">
      <div className="w-full">
        <MacbookScroll
          title={
            <span className="text-balance px-4 md:px-0">
              <span className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl md:text-8xl lg:text-9xl">
                Kazzah NGL
              </span>
              <br />
              <span className="mt-4 block text-lg font-normal leading-relaxed text-neutral-400 sm:mt-5 sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto">
                Platform anonymous question paling seru se-Indonesia.
                <br className="hidden sm:block" />
                Kirim pertanyaan rahasia tanpa ketahuan — gratis, aman, tanpa daftar.
              </span>
            </span>
          }
          badge={
            <a
              href="#kirim"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 sm:gap-2.5 sm:px-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-cyan-300 uppercase sm:text-xs">
                Mulai Kirim Pertanyaan
              </span>
            </a>
          }
          src="/images/macbook-screen.webp"
          showGradient={false}
        />
      </div>
    </section>
  );
}
