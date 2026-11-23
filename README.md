# SMP Negeri 2 Ambulu — Landing Page + CMS

Landing page SEO-oriented dan panel admin untuk SMP Negeri 2 Ambulu. Frontend memakai Next.js App Router, backend lokal memakai SQLite + Drizzle.

## Menjalankan

```bash
npm install
cp .env.example .env.local   # lalu isi ADMIN_EMAIL / ADMIN_PASSWORD
npm run db:setup
npm run dev
```

Buka `http://localhost:3000`.

Production:

```bash
npm run build
npm run start
```

## Admin & database

- Admin: `http://localhost:3000/admin` — tidak ditautkan dari situs publik dan diberi `noindex`.
- Login lokal ada di `.env.local`:
  - Email: `admin@smpn2ambulu.sch.id`
  - Password: lihat `ADMIN_PASSWORD` di `.env.local` (lokal saja, jangan commit).
- **Ganti password sebelum produksi** lewat `npm run db:reset-admin` setelah mengubah `ADMIN_PASSWORD`.
- Database lokal: SQLite di `data/smpn2ambulu.db` (di-ignore dari git).
- Upload foto pendidik: `public/uploads/educators/` (di-ignore dari git, kecuali `.gitkeep`).
- Auth memakai sesi opaque di database, cookie `httpOnly`, scrypt untuk password, rate limit login 5 percobaan / 15 menit.
- Satu role: `admin`. Tidak ada registrasi publik.

Perintah database:

```bash
npm run db:generate    # buat migrasi dari schema
npm run db:migrate     # jalankan migrasi
npm run db:seed        # seed admin + konten contoh (idempoten)
npm run db:setup       # generate + migrate + seed
npm run db:reset-admin # ganti password admin dari .env.local
```

### Telegram bot

Isi di `.env.local`:

```bash
TELEGRAM_BOT_TOKEN=123456:token-bot
TELEGRAM_CHAT_ID=123456789
```

Restart server setelah mengubah env. Jika belum diisi, pesan kritik & saran tetap masuk ke database dan admin bisa mengirim ulang dari dashboard. Format pesan memakai HTML yang sudah di-escape.

## Fitur

### Publik

- Beranda: hero album 5 foto yang bisa digeser, profil, visi & misi, akademik, fasilitas, prestasi, pendidik, berita, galeri, SPMB, kontak.
- `/guru`: hierarki organisasi dengan panah ke bawah, kartu foto guru flip 3D berisi kutipan, filter unit kerja.
- `/berita`: indeks berita dan `/berita/[slug]` detail artikel dengan JSON-LD `NewsArticle` dan sanitasi HTML.
- `/kritik-saran`: form kritik, saran, dan aspirasi; pesan masuk ke CRM dan opsional ke Telegram.
- Opening intro collage 8 foto, motion reveal/parallax, lightbox galeri, reduced-motion, dan fallback tanpa JavaScript.
- Sitemap, robots, metadata, Open Graph, dan JSON-LD `School`.

### Admin

- Dashboard ringkasan konten dan pesan terbaru.
- CRUD pendidik & staf: jabatan, unit, level, quote, urutan, status publikasi, upload foto.
- CRUD berita: slug otomatis, kategori, draft/published, konten HTML, cover.
- CRUD prestasi: penerima, tingkat, tahun, kategori, unggulan, urutan.
- CRM kritik & saran: filter status (baru/dibaca/ditindaklanjuti/arsip), kirim ulang Telegram, hapus.
- Auth session, rate limit login, dan proteksi route di server + proxy.

## Struktur

```text
src/
  app/
    (site)/              # halaman publik
    admin/               # login + panel admin
    sitemap.ts
    robots.ts
  components/
    site/                # section publik, album, org chart, flip card
    admin/               # form dan navigasi admin
    motion/              # reveal, parallax, scroll progress
  lib/
    auth/                # password, session, rate limit, guard
    db/                  # schema, koneksi, query
    telegram.ts
    validation/
  lib/content.ts         # konten seed/statis
drizzle/                 # migrasi SQL
scripts/                 # migrate, seed, reset admin
data/                    # SQLite lokal (ignored)
public/uploads/          # upload admin (ignored)
```

## Catatan konten

- Data sekolah, prestasi, guru, dan berita adalah **contoh untuk pratinjau**, bukan data resmi.
- Foto di `public/images/` adalah placeholder (sebagian stok Pexels/Unsplash), bukan dokumentasi resmi SMP Negeri 2 Ambulu. Ganti setelah izin/consent tersedia.
- Nomor telepon/WhatsApp resmi belum diisi.
- Dummy content saat ini: 7 berita, 10 prestasi, 8 pendidik/staf.

## Belum termasuk

- Editor hierarki organisasi (bagan masih konfigurasi awal).
- CRUD fasilitas, galeri, profil sekolah, dan PPDB.
- Rich text editor (berita masih textarea HTML).
- 2FA.
- Media library umum.
- Migrasi ke PostgreSQL/Turso untuk deployment serverless.
