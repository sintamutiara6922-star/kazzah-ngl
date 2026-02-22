"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Platform ini seru banget! Aku bisa tanya apa aja tanpa ketahuan. Desainnya juga cakep, beda dari yang lain.",
    name: "Pengguna Anonim",
    designation: "Takok OPO? User",
    src: "/images/testimonial-1.webp",
  },
  {
    quote:
      "Notifikasi langsung masuk ke WA, jadi ga ketinggalan pertanyaan. Simple dan gratis pula!",
    name: "Content Creator",
    designation: "Instagram Influencer",
    src: "/images/testimonial-2.webp",
  },
  {
    quote:
      "Akhirnya ada platform anonymous question yang beneran anonim dan nggak ribet. Langsung pakai tanpa daftar.",
    name: "Mahasiswa",
    designation: "Active User",
    src: "/images/testimonial-3.webp",
  },
  {
    quote:
      "YIlziteam emang selalu bikin project keren. Ini yang paling sering aku pakai buat Q&A di Instagram story.",
    name: "Developer Friend",
    designation: "Tech Enthusiast",
    src: "/images/testimonial-4.webp",
  },
];

export default function AnimatedTestimonialsSection() {
  return (
    <section className="relative py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
          Apa Kata Mereka?
        </h2>
        <p className="text-neutral-500 text-base max-w-md mx-auto leading-relaxed">
          Cerita dari pengguna yang sudah merasakan serunya Takok OPO?
        </p>
      </motion.div>
      <AnimatedTestimonials testimonials={testimonials} autoplay />
    </section>
  );
}
