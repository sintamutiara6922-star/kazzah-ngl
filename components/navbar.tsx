"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconHeart,
  IconWorld,
  IconMessageCircle,
} from "@tabler/icons-react";

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-300" />
    ),
    href: "#home",
  },
  {
    title: "Kirim Pertanyaan",
    icon: (
      <IconMessageCircle className="h-full w-full text-neutral-300" />
    ),
    href: "#kirim",
  },
  {
    title: "Telegram",
    icon: (
      <IconBrandTelegram className="h-full w-full text-neutral-300" />
    ),
    href: "https://t.me/yilziteam",
  },
  {
    title: "WhatsApp",
    icon: (
      <IconBrandWhatsapp className="h-full w-full text-neutral-300" />
    ),
    href: "https://wa.me/yourdevnumber",
  },
  {
    title: "Donasi",
    icon: (
      <IconHeart className="h-full w-full text-neutral-300" />
    ),
    href: "https://paymenthub.yilzicode.com",
  },
  {
    title: "Portofolio",
    icon: (
      <IconWorld className="h-full w-full text-neutral-300" />
    ),
    href: "https://yilzicode.com",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-300" />
    ),
    href: "https://github.com/YilziiHCT",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </nav>
  );
}
