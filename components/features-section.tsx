"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";

const features = [
  {
    title: "100% Anonim",
    description:
      "Pengirim tidak akan diketahui siapapun. Privasi terjaga penuh tanpa jejak digital.",
    link: "#kirim",
  },
  {
    title: "Notifikasi WhatsApp",
    description:
      "Terima notifikasi langsung ke WhatsApp via Fonnte saat ada pertanyaan baru masuk.",
    link: "#",
  },
  {
    title: "Notifikasi Telegram",
    description:
      "Bot Telegram otomatis mengirim pesan ke chat kamu tiap ada pertanyaan baru.",
    link: "#",
  },
  {
    title: "Tampilan Modern",
    description:
      "Desain gelap yang elegan dengan animasi halus. Nyaman di HP maupun desktop.",
    link: "#",
  },
  {
    title: "Gratis Selamanya",
    description:
      "Tidak perlu daftar, tidak perlu bayar. Langsung pakai tanpa batas.",
    link: "#",
  },
  {
    title: "Open Source",
    description:
      "Kode sumber terbuka di GitHub. Dibuat dengan cinta oleh Kazzah.",
    link: "https://github.com/KingJack2109",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-4" id="about">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
            Fitur Unggulan
          </h2>
          <p className="text-neutral-500 text-base max-w-md mx-auto leading-relaxed">
            Semua yang kamu butuhkan untuk platform anonymous question terbaik
          </p>
        </motion.div>
        <HoverEffect items={features} />
      </div>
    </section>
  );
}
