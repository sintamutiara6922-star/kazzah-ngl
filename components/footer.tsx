"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative text-center py-12 pb-28 text-neutral-500 text-sm border-t border-white/[0.06]"
    >
      <p className="text-neutral-400">
        {"© 2023 "}
        <strong className="text-white font-semibold">Kazzah NGL</strong>
        {" — Made with "}
        <span className="text-cyan-400">{"<3"}</span>
        {" by "}
        <a
          href="https://kazzah.com"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          KazzahOfc
        </a>
      </p>
      <p className="mt-3 flex items-center justify-center gap-4 text-neutral-600">
        <a
          href="https://kazzah.com"
          className="hover:text-cyan-400 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kazzah.com
        </a>
        <span className="text-neutral-800">|</span>
        <a
          href="https://kazzah-payment.vercel.app"
          className="hover:text-cyan-400 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donasi Developer
        </a>
      </p>
    </motion.footer>
  );
}
