"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconHeart,
  IconWorld,
} from "@tabler/icons-react";

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Kirim Pertanyaan",
    icon: (
      <IconBrandTelegram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#kirim",
  },
  {
    title: "WhatsApp Developer",
    icon: (
      <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://wa.me/yourdevnumber",
  },
  {
    title: "Donasi",
    icon: (
      <IconHeart className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://paymenthub.yilzicode.com",
  },
  {
    title: "Portofolio",
    icon: (
      <IconWorld className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://yilzicode.com",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/YilziiHCT",
  },
];

export default function FloatingDockNav() {
  return (
    <section className="py-16 bg-black">
      <div className="flex items-center justify-center">
        <FloatingDock items={links} />
      </div>
    </section>
  );
}
