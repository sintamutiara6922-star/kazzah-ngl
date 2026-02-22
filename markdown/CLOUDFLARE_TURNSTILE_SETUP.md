# Cloudflare Turnstile Setup Guide

Cloudflare Turnstile adalah alternatif gratis untuk reCAPTCHA yang lebih ramah pengguna dan privacy-friendly.

## Cara Setup Cloudflare Turnstile

### 1. Buat Akun Cloudflare
- Kunjungi [Cloudflare Dashboard](https://dash.cloudflare.com/)
- Daftar atau login ke akun Cloudflare kamu

### 2. Akses Turnstile
- Di dashboard Cloudflare, klik menu **"Turnstile"** di sidebar kiri
- Atau langsung ke: https://dash.cloudflare.com/turnstile

### 3. Tambah Site Baru
1. Klik tombol **"Add Site"**
2. Isi form dengan informasi:
   - **Site name**: `Takok OPO` (atau nama yang kamu inginkan)
   - **Domain**: `takok-opo.vercel.app` (atau domain kamu)
   - **Widget Mode**: Pilih **"Managed"** (recommended)
   - **Widget Appearance**: Pilih **"Normal"** atau **"Compact"**

3. Klik **"Create"**

### 4. Dapatkan Keys
Setelah site dibuat, kamu akan mendapat:
- **Site Key** (untuk frontend/client-side)
- **Secret Key** (untuk backend/server-side)

### 5. Update Environment Variables
Buka file `.env.local` di project dan update:

```env
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

**Penting:** Ganti `your_site_key_here` dan `your_secret_key_here` dengan keys yang kamu dapatkan dari Cloudflare.

### 6. Test Mode (Development)
Untuk testing saat development, kamu bisa menggunakan test keys yang selalu berhasil:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

**Note:** Test keys ini sudah di-set secara default di `.env.local`

### 7. Deploy ke Production
Saat deploy ke Vercel:
1. Buka Vercel Dashboard
2. Pilih project "Takok OPO"
3. Masuk ke **Settings → Environment Variables**
4. Tambahkan kedua keys (Site Key dan Secret Key)
5. Redeploy project

## Cara Kerja

1. User membuka website pertama kali
2. Modal verifikasi Cloudflare Turnstile muncul
3. User menyelesaikan challenge (biasanya otomatis/invisible)
4. Setelah verified, modal hilang dan user bisa akses website
5. Verification disimpan di session, jadi tidak muncul lagi sampai browser ditutup

## Testing

Test key yang ada akan selalu sukses, cocok untuk development. Untuk production, gunakan keys asli dari Cloudflare.

## Dokumentasi Lengkap
- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Get Started Guide](https://developers.cloudflare.com/turnstile/get-started/)

## Troubleshooting

**Turnstile widget tidak muncul?**
- Pastikan NEXT_PUBLIC_TURNSTILE_SITE_KEY sudah di-set di environment variables
- Check browser console untuk error messages

**Verification gagal terus?**
- Pastikan domain di Cloudflare dashboard match dengan domain production
- Check apakah Secret Key sudah benar di environment variables

**Widget muncul tapi tidak bisa di-solve?**
- Clear browser cache dan cookies
- Coba di browser lain atau incognito mode
