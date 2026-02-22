"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Seru banget bisa dapat pertanyaan anonym dari temen-temen!",
    name: "Anonim",
    title: "Pengguna Takok OPO?",
  },
  {
    quote:
      "Akhirnya ada platform anonym yang simple dan nggak ribet daftar.",
    name: "Anonim",
    title: "Pengguna Takok OPO?",
  },
  {
    quote: "Notifikasi WA-nya langsung masuk, responsif banget!",
    name: "Anonim",
    title: "Pengguna Takok OPO?",
  },
  {
    quote: "Desainnya aesthetic, suka banget tampilannya! Dark mode nya keren.",
    name: "Anonim",
    title: "Pengguna Takok OPO?",
  },
  {
    quote: "YIlziteam emang selalu bikin project yang keren-keren. Top!",
    name: "Anonim",
    title: "Pengguna Takok OPO?",
  },
];

export default function InfiniteTestimonials() {
  return (
    <section className="py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
          Kata Pengguna
        </h2>
        <p className="text-neutral-500 text-base max-w-md mx-auto leading-relaxed">
          Testimoni dari pengguna setia Takok OPO?
        </p>
      </motion.div>
      <div className="flex items-center justify-center">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
