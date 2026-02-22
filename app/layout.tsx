import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import AntiInspect from '@/components/anti-inspect'
import TurnstileVerification from '@/components/turnstile-verification'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://takokopo.yilzicode.com"),
  title: {
    default: "Takok OPO? — Platform Pertanyaan Anonim #1 di Indonesia",
    template: "%s | Takok OPO?"
  },
  description:
    "Platform tanya jawab anonim paling seru se-Indonesia. Kirim pertanyaan rahasia ke siapapun tanpa ketahuan identitasmu. 100% gratis, aman, dan mudah digunakan. Dibuat oleh YIlziteam.",
  keywords: [
    "takok opo",
    "takokopo",
    "anonymous question",
    "pertanyaan anonim",
    "pertanyaan rahasia",
    "NGL Indonesia",
    "tanya anonim",
    "kirim pesan anonim",
    "question box",
    "sarahah Indonesia",
    "YIlziteam",
    "yilzicode",
    "platform anonim",
    "tanya jawab anonim",
    "anonymous messaging",
    "secret message",
    "pertanyaan anonymous gratis",
  ],
  authors: [{ name: "KazzahOfc", url: "https://kazzah-ngl.vercel.app" }],
  creator: "Kazzah",
  publisher: "KazzahOfc",
  applicationName: "Kazzah NGL",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Social Media",
  classification: "Anonymous Messaging Platform",
  openGraph: {
    title: "Kazzah NGL — Platform Pertanyaan Anonim #1 di Indonesia",
    description:
      "Kirim pertanyaan anonymous ke siapapun. 100% gratis, aman, dan seru. Rahasiamu dijamin aman!",
    url: "https://kazzah-ngl.vercel.app",
    siteName: "Kazzah NGL",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Takok OPO? — Platform Pertanyaan Anonim Terbaik",
        type: "image/webp",
      },
    ],
    locale: "id_ID",
    type: "website",
    countryName: "Indonesia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazzah NGL — Pertanyaan Anonim #1 Indonesia",
    description: "Kirim pertanyaan anonim ke siapapun! 100% gratis dan aman.",
    images: ["/images/og-image.webp"],
    creator: "@KazzahOfficial",
    site: "@KazzahOfficial",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.webp", sizes: "512x512", type: "image/webp" },
    ],
    apple: [
      { url: "/images/favicon.webp", sizes: "180x180", type: "image/webp" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://kazzah-ngl.vercel.app",
    languages: {
      "id-ID": "https://kazzah-ngl.vercel.app",
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kazzah NGL" />
        <link rel="canonical" href="https://kazzah-ngl.vercel.app" />
      </head>
      <body className="font-sans antialiased bg-black text-white">
        <TurnstileVerification />
        <AntiInspect />
        {children}
        <Analytics />
      </body>
    </html>
  )
  }
      
