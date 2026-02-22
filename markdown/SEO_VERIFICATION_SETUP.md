# SEO Verification Setup Guide

Panduan lengkap untuk mengatur verifikasi search engine di website Takok OPO.

## 📋 Daftar Isi

1. [Google Search Console](#google-search-console)
2. [Bing Webmaster Tools](#bing-webmaster-tools)
3. [Yandex Webmaster](#yandex-webmaster)
4. [Update Kode Verifikasi](#update-kode-verifikasi)

---

## 🔍 Google Search Console

### Langkah 1: Daftar di Google Search Console
1. Buka [Google Search Console](https://search.google.com/search-console/)
2. Login dengan akun Google Anda
3. Klik **"Add Property"** atau **"Tambahkan Properti"**
4. Pilih **"URL prefix"** dan masukkan: `https://takokopo.yilzicode.com`

### Langkah 2: Verifikasi Domain
1. Pilih metode **"HTML tag"**
2. Google akan memberikan kode seperti ini:
   ```html
   <meta name="google-site-verification" content="ABC123xyz..." />
   ```
3. Copy bagian `content="ABC123xyz..."` (kode verifikasi)
4. Simpan kode ini untuk langkah berikutnya

### Langkah 3: Update di Layout.tsx
Ganti `"your-google-site-verification-code"` dengan kode yang Anda dapat:
```typescript
verification: {
  google: "ABC123xyz...", // Paste kode verifikasi di sini
}
```

### Langkah 4: Deploy & Verifikasi
1. Deploy website Anda
2. Kembali ke Google Search Console
3. Klik **"Verify"** atau **"Verifikasi"**
4. Selesai! ✅

### Manfaat Google Search Console:
- Monitor performa website di Google Search
- Submit sitemap untuk indexing lebih cepat
- Lihat keyword yang membawa traffic
- Deteksi masalah SEO dan error crawling

---

## 🌐 Bing Webmaster Tools

### Langkah 1: Daftar di Bing Webmaster
1. Buka [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Login dengan akun Microsoft Anda
3. Klik **"Add a site"**
4. Masukkan URL: `https://takokopo.yilzicode.com`

### Langkah 2: Verifikasi Domain
1. Pilih metode **"Add HTML meta tag to your site"**
2. Bing akan memberikan kode seperti ini:
   ```html
   <meta name="msvalidate.01" content="XYZ789abc..." />
   ```
3. Copy bagian `content="XYZ789abc..."` (kode verifikasi)

### Langkah 3: Update di Layout.tsx
Ganti `"your-bing-verification-code"` dengan kode yang Anda dapat:
```typescript
verification: {
  google: "ABC123xyz...",
  other: {
    "msvalidate.01": "XYZ789abc...", // Paste kode verifikasi di sini
  },
}
```

### Langkah 4: Deploy & Verifikasi
1. Deploy website Anda
2. Kembali ke Bing Webmaster Tools
3. Klik **"Verify"**
4. Selesai! ✅

### Manfaat Bing Webmaster:
- Indexing di Bing dan Yahoo (Bing powers Yahoo search)
- Submit sitemap untuk crawler Bing
- SEO report dan keyword research
- Monitor backlinks

---

## 🇷🇺 Yandex Webmaster

### Langkah 1: Daftar di Yandex Webmaster
1. Buka [Yandex Webmaster](https://webmaster.yandex.com/)
2. Login dengan akun Yandex (atau buat akun baru)
3. Klik **"Add site"** atau **"Добавить сайт"**
4. Masukkan URL: `https://takokopo.yilzicode.com`

### Langkah 2: Verifikasi Domain
1. Pilih metode **"Meta tag"**
2. Yandex akan memberikan kode seperti ini:
   ```html
   <meta name="yandex-verification" content="DEF456uvw..." />
   ```
3. Copy bagian `content="DEF456uvw..."` (kode verifikasi)

### Langkah 3: Update di Layout.tsx
Ganti `"your-yandex-verification-code"` dengan kode yang Anda dapat:
```typescript
verification: {
  google: "ABC123xyz...",
  yandex: "DEF456uvw...", // Paste kode verifikasi di sini
  other: {
    "msvalidate.01": "XYZ789abc...",
  },
}
```

### Langkah 4: Deploy & Verifikasi
1. Deploy website Anda
2. Kembali ke Yandex Webmaster
3. Klik **"Check"** atau **"Проверить"**
4. Selesai! ✅

### Manfaat Yandex Webmaster:
- Indexing di Yandex (search engine terbesar di Russia)
- Submit sitemap
- Monitor traffic dari Russia dan negara CIS
- SEO analysis tools

---

## 🔧 Update Kode Verifikasi

### File yang Perlu Diubah: `app/layout.tsx`

Cari bagian `verification` dalam file `layout.tsx`:

```typescript
// SEBELUM (Template)
export const metadata: Metadata = {
  // ... metadata lainnya
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
}

// SESUDAH (Dengan kode verifikasi asli)
export const metadata: Metadata = {
  // ... metadata lainnya
  verification: {
    google: "ABC123xyz...",
    yandex: "DEF456uvw...",
    other: {
      "msvalidate.01": "XYZ789abc...",
    },
  },
}
```

---

## 📊 Setelah Verifikasi Berhasil

### Submit Sitemap
Setelah semua verifikasi berhasil, submit sitemap Anda ke semua search engine:

**Sitemap URL:**
```
https://takokopo.yilzicode.com/sitemap.xml
```

### Di Google Search Console:
1. Buka **Sitemaps** di menu kiri
2. Masukkan `sitemap.xml`
3. Klik **Submit**

### Di Bing Webmaster:
1. Buka **Sitemaps** di menu kiri
2. Masukkan URL lengkap sitemap
3. Klik **Submit**

### Di Yandex Webmaster:
1. Buka **Indexing** → **Sitemap files**
2. Masukkan URL lengkap sitemap
3. Klik **Add**

---

## 🎯 Tips SEO Tambahan

### 1. Robots.txt
File `robots.txt` sudah dikonfigurasi di `public/robots.txt`:
```
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/

Sitemap: https://takokopo.yilzicode.com/sitemap.xml
```

### 2. Structured Data (Schema.org)
Website sudah memiliki schema `WebSite` dan `Organization` di metadata untuk rich snippets di Google.

### 3. Open Graph & Twitter Cards
Metadata Open Graph dan Twitter Card sudah lengkap untuk tampilan optimal saat dibagikan di social media.

### 4. Monitor Regularly
- Cek Google Search Console minimal 1x seminggu
- Monitor keyword rankings
- Fix crawl errors segera
- Update content secara berkala

---

## ❓ Troubleshooting

### Verifikasi Gagal?
1. **Pastikan kode sudah di-deploy**: Cek source code website dengan `Ctrl+U` atau `Cmd+U`, search kode verifikasi
2. **Tunggu 5-10 menit**: Cache DNS dan CDN perlu waktu untuk update
3. **Coba metode lain**: Gunakan DNS verification atau file upload sebagai alternatif
4. **Clear cache**: Clear cache browser dan CDN (Vercel)

### Sitemap Tidak Terbaca?
1. Akses langsung `https://takokopo.yilzicode.com/sitemap.xml` di browser
2. Pastikan XML valid (tidak ada error)
3. Cek robots.txt sudah benar
4. Tunggu 24-48 jam untuk indexing pertama kali

---

## 📞 Butuh Bantuan?

Jika ada pertanyaan atau masalah:
1. Cek dokumentasi official dari masing-masing search engine
2. Buka issue di [GitHub Repository](https://github.com/YilziiHCT/takok-opo)
3. Contact developer

---

**Selamat mengoptimalkan SEO website Takok OPO! 🚀**
