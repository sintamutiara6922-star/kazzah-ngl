# 🎭 Takok OPO? - Anonymous Question Platform

<div align="center">

![Takok OPO Logo](public/images/logo.webp)

**Platform anonymous question paling seru se-Indonesia**

Kirim pertanyaan rahasia tanpa ketahuan — gratis, aman, tanpa daftar.

[🚀 Live Demo](https://takokopo.yilzicode.com) • [📖 Documentation](docs/) • [🐛 Report Bug](https://github.com/YilziiHCT/takok-opo/issues) • [✨ Request Feature](https://github.com/YilziiHCT/takok-opo/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**Takok OPO?** adalah platform anonymous question yang memungkinkan pengguna mengirim pertanyaan secara anonim tanpa perlu mendaftar atau login. Platform ini dibangun dengan fokus pada privasi, keamanan, dan pengalaman pengguna yang menyenangkan.

### Why Takok OPO?

- 🔒 **100% Anonymous** - Tidak ada tracking, tidak ada login
- 🛡️ **Advanced Security** - Rate limiting, content moderation, Cloudflare Turnstile
- ⚡ **Lightning Fast** - Built with Next.js 16 & React 19
- 🎨 **Beautiful UI** - Modern dark theme dengan animasi smooth
- 📱 **Fully Responsive** - Perfect di semua device
- 🌐 **SEO Optimized** - Perfect score di Google Lighthouse

---

## ✨ Features

### Core Features
- ✅ Anonymous question submission
- ✅ Real-time question display
- ✅ WhatsApp & Telegram notifications
- ✅ Virtual keyboard dengan sound effects
- ✅ Content moderation & filtering
- ✅ IP-based rate limiting (1 question/minute)
- ✅ Duplicate message detection
- ✅ Cloudflare Turnstile verification

### UI/UX Features
- 🎨 Interactive meta balls cursor animation
- 🌌 Grid background with radial fade
- 🖥️ MacBook scroll showcase
- ⌨️ Virtual keyboard for desktop
- 📊 Animated testimonials
- 🎯 Floating dock navigation
- 🔊 Sound feedback on keyboard
- ⚡ Smooth transitions & animations

### Security Features
- 🛡️ Cloudflare Turnstile bot protection
- 🚫 Content moderation (bad words filter)
- ⏱️ Rate limiting per IP address
- 🔍 Duplicate message detection
- 🔐 Anti-inspect protection
- 📝 Message censoring in display

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn UI + Custom components
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Database:** JSON file-based storage
- **Notifications:** Fonnte (WhatsApp) + Telegram Bot API
- **Security:** Cloudflare Turnstile

### DevOps
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics
- **Domain:** Custom domain via Yilzicode

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (or npm/yarn)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YilziiHCT/takok-opo.git
   cd takok-opo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your credentials (see [Environment Variables](#environment-variables))

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# WhatsApp Notifications (via Fonnte)
FONNTE_TOKEN=your_fonnte_api_token
FONNTE_TARGET_NUMBER=62812345678

# Telegram Notifications
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# App Configuration
NEXT_PUBLIC_SITE_URL=https://takokopo.yilzicode.com
NEXT_PUBLIC_SITE_NAME=Takok OPO?

# Cloudflare Turnstile (optional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### Get Your API Keys

- **Fonnte:** [https://fonnte.com](https://fonnte.com)
- **Telegram Bot:** Talk to [@BotFather](https://t.me/botfather)
- **Cloudflare Turnstile:** [https://dash.cloudflare.com/turnstile](https://dash.cloudflare.com/turnstile)

For detailed setup instructions, see:
- [CLOUDFLARE_TURNSTILE_SETUP.md](CLOUDFLARE_TURNSTILE_SETUP.md)
- [SEO_VERIFICATION_SETUP.md](SEO_VERIFICATION_SETUP.md)
- [SECURITY_FEATURES.md](SECURITY_FEATURES.md)

---

## 🛡️ Security Features

### Rate Limiting
- **1 question per minute** per IP address
- Prevents spam and abuse
- Friendly error messages with countdown

### Content Moderation
- Automatic bad word detection (Indonesian & English)
- Pattern recognition for obfuscated words
- Real-time filtering before submission

### Duplicate Detection
- Prevents same message from same IP within 1 minute
- Database-backed tracking
- Session-based verification

### Bot Protection
- Cloudflare Turnstile integration
- Challenge appears on first visit
- Session storage for verified users

For complete security documentation, see [SECURITY_FEATURES.md](SECURITY_FEATURES.md)

---

## 📦 Project Structure

```
takok-opo/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── get-questions/ # Fetch questions
│   │   └── submit-question/ # Submit new question
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── hero-section.tsx  # Hero with MacBook
│   ├── question-form.tsx # Question submission form
│   ├── question-table.tsx # Questions display
│   ├── navbar.tsx        # Navigation
│   └── ...               # Other components
├── lib/                  # Utility functions
│   ├── db.ts            # Database operations
│   ├── moderation.ts    # Content filtering
│   ├── fonnte.ts        # WhatsApp API
│   └── telegram.ts      # Telegram API
├── data/                # Data storage
│   └── questions.json   # Questions database
├── public/              # Static assets
│   ├── images/         # Images (webp format)
│   ├── favicon.ico     # Favicon
│   ├── icon.svg        # App icon
│   ├── manifest.json   # PWA manifest
│   └── robots.txt      # SEO robots file
└── middleware.ts       # Rate limiting middleware
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables
   - Deploy!

3. **Configure Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records

### Environment Variables on Vercel

Add all environment variables from `.env.local` to Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable with production values
3. Redeploy if already deployed

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**YilziiHCT**

- GitHub: [@YilziiHCT](https://github.com/YilziiHCT)
- Website: [yilzicode.com](https://yilzicode.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Deployment platform
- [Aceternity UI](https://ui.aceternity.com/) - UI inspiration

---

## 📊 Project Status

- ✅ **Production Ready**
- ✅ Actively Maintained
- ✅ Open for Contributions
- ✅ SEO Optimized
- ✅ Mobile Responsive
- ✅ Security Hardened

---

## 📞 Support

If you have any questions or need help, feel free to:

- Open an [Issue](https://github.com/YilziiHCT/takok-opo/issues)
- Start a [Discussion](https://github.com/YilziiHCT/takok-opo/discussions)
- Contact via [Website](https://yilzicode.com)

---

<div align="center">

**Made with ❤️ by YilziiHCT**

⭐ Star this repo if you find it helpful!

</div>
