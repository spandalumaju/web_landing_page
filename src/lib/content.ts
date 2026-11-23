export const site = {
  name: "SMP Negeri 2 Ambulu",
  shortName: "SMPN 2 Ambulu",
  npsn: "20523886",
  level: "SMP",
  status: "Negeri",
  location: "Sabrang, Ambulu, Jember",
  province: "Jawa Timur",
  address:
    "Jl. Watu Ulo No. 57, Sabrang, Ambulu, Jember, Jawa Timur 68172",
  postalCode: "68172",
  phone: "+62 336 881955",
  phoneHref: "tel:+62336881955",
  email: "info@smpn2ambulu.sch.id",
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJza427ZOc1i0RdaNCcLFJKQY",
  ppdbYear: "2026/2027",
  students: "1.106",
  educatorsCount: 60,
  staffCount: 8,
  vision:
    "Terwujudnya lulusan yang berprestasi, terampil, mandiri berdasarkan iman dan taqwa (IMTAQ).",
};

export const navItems = [
  { label: "Profil", href: "/#profil" },
  { label: "Guru", href: "/guru" },
  { label: "Akademik", href: "/#akademik" },
  { label: "Prestasi", href: "/#prestasi" },
  { label: "Berita", href: "/berita" },
  { label: "SPMB", href: "/#ppdb" },
];

export const heroStats = [
  { label: "Murid", value: site.students },
  { label: "Pendidik", value: String(site.educatorsCount) },
  { label: "Tenaga kependidikan", value: String(site.staffCount) },
];

export const marqueeItems = [
  "Berprestasi",
  "Terampil",
  "Mandiri",
  "Beriman dan bertakwa",
  "Peduli lingkungan",
];

export const profileFacts = [
  { label: "NPSN", value: site.npsn },
  { label: "Status", value: "Sekolah negeri" },
  { label: "Jenjang", value: "Sekolah menengah pertama" },
  { label: "Murid", value: site.students },
];

export const missions = [
  "Menjalankan kurikulum yang selaras dengan kebutuhan murid dan masyarakat.",
  "Menyiapkan pembelajaran yang efektif, menyenangkan, dan bermakna.",
  "Meningkatkan kompetensi guru dan tenaga kependidikan secara berkelanjutan.",
  "Merawat sarana, lingkungan, dan layanan sekolah agar aman dan nyaman.",
  "Membuka ruang bagi bakat seni, olahraga, dan budaya murid.",
];

export const values = [
  {
    title: "Beriman",
    description: "Menjaga ibadah, akhlak, dan rasa syukur dalam keseharian.",
  },
  {
    title: "Bernalar",
    description: "Bertanya, memeriksa bukti, dan mengambil keputusan dengan alasan.",
  },
  {
    title: "Berkarya",
    description: "Mencoba, mencipta, dan menyampaikan gagasan dengan percaya diri.",
  },
  {
    title: "Berkolaborasi",
    description: "Bekerja bersama, menghargai perbedaan, dan memberi manfaat.",
  },
];

export type AcademicProgram = {
  index: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  featured?: boolean;
};

export const academicPrograms: AcademicProgram[] = [
  {
    index: "01",
    title: "Pembelajaran mendalam",
    description:
      "Guru merancang pembelajaran dari pengalaman murid, lalu mengajak mereka mengamati, mencoba, dan merefleksikan hasilnya.",
    image: "",
    alt: "Ruang kelas dengan meja dan kursi yang tertata",
    featured: true,
  },
  {
    index: "02",
    title: "Literasi dan numerasi",
    description:
      "Membaca, menulis, dan berhitung dipakai di banyak mata pelajaran, bukan hanya di kelas bahasa atau matematika.",
  },
  {
    index: "03",
    title: "Projek kokurikuler",
    description:
      "Murid mengerjakan projek lintas mapel: memilah sampah, mengolah kompos, menanam, sampai belajar berjualan di Market Day.",
  },
  {
    index: "04",
    title: "Layanan inklusi dan BK",
    description:
      "Murid dengan kebutuhan khusus mendapat pendampingan; bimbingan konseling membantu semua murid menjaga ritme belajar.",
  },
];

export const learningFlow = ["Mengamati", "Bertanya", "Mencoba", "Merefleksikan"];

export const extracurriculars = [
  "Pramuka",
  "Tari",
  "Futsal",
  "Voli",
  "Broadcasting",
  "Hadrah",
  "Paskibra",
  "Sanggar IPA",
];

export type Achievement = {
  title: string;
  recipient: string;
  level: string;
  year: string;
  category: "Akademik" | "Non-akademik";
};

export const achievements: Achievement[] = [
  {
    title: "Olimpiade Matematika — medali emas",
    recipient: "Tim olimpiade matematika",
    level: "Kabupaten",
    year: "2026",
    category: "Akademik",
  },
  {
    title: "Olimpiade Matematika — 3 besar",
    recipient: "Tim olimpiade matematika",
    level: "Kabupaten",
    year: "2026",
    category: "Akademik",
  },
  {
    title: "Lomba Bulan Bahasa",
    recipient: "Tim bahasa sekolah",
    level: "Kabupaten",
    year: "2026",
    category: "Akademik",
  },
  {
    title: "Pramuka Logatram — juara umum",
    recipient: "Regu Pramuka",
    level: "Kabupaten",
    year: "2026",
    category: "Non-akademik",
  },
  {
    title: "Tari Mahargya Kaloka Festival",
    recipient: "Sanggar Tari",
    level: "Kabupaten",
    year: "2026",
    category: "Non-akademik",
  },
  {
    title: "Festival Bulan Bahasa — cipta cerpen",
    recipient: "Tim literasi",
    level: "Kabupaten",
    year: "2026",
    category: "Non-akademik",
  },
  {
    title: "Broadcasting Poster Kesehatan Mental",
    recipient: "Tim broadcasting",
    level: "Nasional",
    year: "2025",
    category: "Non-akademik",
  },
  {
    title: "Tanding Silat Fighter Putra",
    recipient: "Atlet pencak silat",
    level: "Provinsi",
    year: "2026",
    category: "Non-akademik",
  },
  {
    title: "Voli Ball Putra",
    recipient: "Tim voli putra",
    level: "Kabupaten",
    year: "2026",
    category: "Non-akademik",
  },
  {
    title: "Tolak Peluru",
    recipient: "Atlet atletik",
    level: "Kecamatan",
    year: "2026",
    category: "Non-akademik",
  },
  {
    title: "Pramuka Gala Pressadi — putri",
    recipient: "Regu Pramuka putri",
    level: "Kabupaten",
    year: "2025",
    category: "Non-akademik",
  },
  {
    title: "MHQ Mosaic",
    recipient: "Tim MTQ",
    level: "Provinsi",
    year: "2024",
    category: "Non-akademik",
  },
];

export const teachers = [
  { initials: "KS", role: "Kepala Sekolah", focus: "Kepemimpinan sekolah" },
  { initials: "WK", role: "Wakil Kepala Kurikulum", focus: "Kurikulum & pembelajaran" },
  { initials: "MT", role: "Guru Matematika", focus: "Numerasi" },
  { initials: "IP", role: "Guru IPA", focus: "Sains & eksperimen" },
  { initials: "BI", role: "Guru Bahasa Indonesia", focus: "Literasi" },
  { initials: "EN", role: "Guru Bahasa Inggris", focus: "Komunikasi" },
  { initials: "IS", role: "Guru IPS", focus: "Konteks & masyarakat" },
  { initials: "BK", role: "Guru Bimbingan Konseling", focus: "Pendampingan siswa" },
];

export type Educator = {
  id: string;
  name: string;
  role: string;
  unit: string;
  photo: string;
  quote: string;
};

export const educators: Educator[] = [
  {
    id: "kepala-sekolah",
    name: "Hendra Wijaya, M.Pd.",
    role: "Kepala Sekolah",
    unit: "Kepemimpinan",
    photo: "",
    quote: "Sekolah yang baik memberi murid ruang untuk bertanya, mencoba, dan memperbaiki diri.",
  },
  {
    id: "wakil-kepala",
    name: "Ratna Wulandari, M.Pd.",
    role: "Wakil Kepala Sekolah",
    unit: "Kurikulum",
    photo: "",
    quote: "Setiap keputusan pembelajaran sebaiknya bisa dijelaskan dan berpihak pada murid.",
  },
  {
    id: "kepala-tu",
    name: "Siti Nurhaliza, S.E.",
    role: "Kepala Tata Usaha",
    unit: "Administrasi",
    photo: "",
    quote: "Administrasi yang rapi membuat guru punya lebih banyak waktu untuk mengajar.",
  },
  {
    id: "staff-kurikulum",
    name: "Dewi Anggraini, S.Pd.",
    role: "Staff Kurikulum",
    unit: "Kurikulum",
    photo: "",
    quote: "Kurikulum perlu jelas, tetapi tetap memberi ruang bagi konteks setiap kelas.",
  },
  {
    id: "guru-matematika",
    name: "Dimas Pratama, S.Pd.",
    role: "Guru Matematika",
    unit: "Dewan Guru",
    photo: "",
    quote: "Matematika bukan lomba menjawab cepat; yang lebih penting adalah berani menalar.",
  },
  {
    id: "guru-ipa",
    name: "Rizky Ramadhan, S.Pd.",
    role: "Guru IPA",
    unit: "Dewan Guru",
    photo: "",
    quote: "Rasa ingin tahu adalah alat belajar yang paling murah dan paling kuat.",
  },
  {
    id: "guru-bahasa-indonesia",
    name: "Maya Sari, S.Pd.",
    role: "Guru Bahasa Indonesia",
    unit: "Dewan Guru",
    photo: "",
    quote: "Membaca membuka pintu untuk berpikir lebih jauh dan menulis lebih jernih.",
  },
  {
    id: "guru-bk",
    name: "Arif Hidayat, S.Pd.",
    role: "Guru Bimbingan Konseling",
    unit: "Kesiswaan",
    photo: "",
    quote: "Setiap murid butuh setidaknya satu orang dewasa yang percaya dan mau mendengarkan.",
  },
];

export const orgChart = {
  head: {
    name: "Hendra Wijaya, M.Pd.",
    role: "Kepala Sekolah",
    photo: "",
  },
  branches: [
    {
      role: "Wakil Kepala Sekolah",
      name: "Ratna Wulandari, M.Pd.",
      photo: "",
      units: [
        {
          title: "Kurikulum",
          description: "Perencanaan, pelaksanaan, dan evaluasi pembelajaran.",
          members: ["Dewi Anggraini, S.Pd.", "Dewan Guru"],
        },
        {
          title: "Kesiswaan",
          description: "Pembinaan siswa, disiplin, dan kegiatan sekolah.",
          members: ["Arif Hidayat, S.Pd.", "Pembina OSIS"],
        },
        {
          title: "Sarana & Prasarana",
          description: "Ruang, peralatan, dan pemeliharaan fasilitas.",
          members: ["Fajar Nugroho, S.Pd.", "Staff Sarana"],
        },
        {
          title: "Humas",
          description: "Komunikasi sekolah dengan orang tua dan masyarakat.",
          members: ["Lestari Putri, S.Pd.", "Staff Humas"],
        },
      ],
    },
    {
      role: "Kepala Tata Usaha",
      name: "Siti Nurhaliza, S.E.",
      photo: "",
      units: [
        {
          title: "Administrasi Umum",
          description: "Data sekolah, surat, arsip, dan layanan administrasi.",
          members: ["Wulan Sari, A.Md.", "Staff TU"],
        },
        {
          title: "Keuangan",
          description: "Pengelolaan anggaran, pembukuan, dan laporan keuangan.",
          members: ["Bendahara Sekolah", "Staff Keuangan"],
        },
        {
          title: "Layanan & Arsip",
          description: "Operator sekolah, perpustakaan, dan layanan umum.",
          members: ["Operator Sekolah", "Pustakawan"],
        },
      ],
    },
  ],
};

export type PostItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  featured: boolean;
  body?: string[];
};

export const posts: PostItem[] = [
  {
    slug: "peta-sampah-kebiasaan-memilah",
    category: "Kegiatan",
    date: "08 November 2026",
    title: "PETA SAMPAH: kebiasaan memilah yang dimulai dari kelas",
    excerpt:
      "Murid memetakan sumber sampah di sekolah, memilahnya, lalu mengolah sisa organik. Kebiasaan kecil ini pelan-pelan mengubah cara mereka melihat lingkungan.",
    image: "",
    alt: "Murid belajar bersama di halaman sekolah",
    featured: true,
    body: [
      "Projek PETA SAMPAH dimulai dari pertanyaan sederhana: dari mana sampah di sekolah ini datang, dan ke mana perginya?",
      "Murid memetakan titik-titik sampah, mencatat jenisnya, lalu memilih cara menanganinya. Sisa makanan dipisahkan untuk kompos, plastik dibersihkan dan dikumpulkan, sementara daun kering masuk ke bedeng pengomposan.",
      "Kebiasaan ini tidak berhenti di projek. Kelas mulai menyiapkan tempat sampah terpisah dan mengingatkan satu sama lain. Perubahan kecil, tetapi berulang.",
    ],
  },
  {
    slug: "praktikum-kompos-sisa-makanan",
    category: "Pembelajaran",
    date: "30 Oktober 2026",
    title: "Praktikum kompos: belajar IPA dari sisa makanan",
    excerpt:
      "Di laboratorium dan halaman sekolah, murid mengamati proses pengomposan, mencatat perubahan, dan mendiskusikan hasilnya.",
    image: "",
    alt: "Peralatan laboratorium di atas meja",
    featured: false,
    body: [
      "Sisa makanan dari kantin bukan sekadar limbah. Di halaman sekolah, murid mengumpulkannya untuk bahan kompos.",
      "Mereka mencampur bahan organik, menjaga kelembapan, dan mengamati perubahan suhu serta bau. Catatan dibuat setiap minggu.",
      "Hasil kompos dipakai untuk tanaman di taman sekolah. Proses ini membuat pelajaran IPA terasa dekat dengan kehidupan sehari-hari.",
    ],
  },
  {
    slug: "market-day-belajar-berjualan",
    category: "Kegiatan",
    date: "24 Oktober 2026",
    title: "Market Day: belajar menghitung, menawarkan, dan bekerja sama",
    excerpt:
      "Murid menyiapkan produk, menentukan harga, melayani pembeli, dan menghitung laba. Matematika keluar dari buku dan masuk ke pengalaman.",
    image: "",
    alt: "Murid mengikuti kegiatan belajar di kelas",
    featured: false,
    body: [
      "Market Day mengubah kelas menjadi ruang usaha kecil. Murid menentukan produk, menghitung modal, dan menetapkan harga.",
      "Saat pembeli datang, mereka belajar menawarkan barang, melayani dengan ramah, dan mencatat transaksi. Ada yang untung, ada yang harus memperbaiki strategi.",
      "Guru mendampingi refleksi setelah kegiatan: apa yang berjalan, apa yang perlu diubah, dan bagaimana kerja sama tim membantu.",
    ],
  },
  {
    slug: "layanan-inklusi-jalan-belajar",
    category: "Pendidikan",
    date: "18 Oktober 2026",
    title: "Layanan inklusi: memastikan setiap murid punya jalan belajar",
    excerpt:
      "Pendampingan diberikan sesuai kebutuhan murid, termasuk mereka yang memerlukan dukungan khusus. Tujuannya sederhana: tidak ada yang belajar sendirian.",
    image: "",
    alt: "Ruang kelas dengan meja dan kursi yang tertata",
    featured: false,
    body: [
      "Setiap murid punya cara belajar yang berbeda. Layanan inklusi memastikan perbedaan itu tidak menjadi hambatan.",
      "Guru pendamping bekerja bersama wali kelas untuk menyesuaikan materi, media, dan cara penilaian. Orang tua dilibatkan dalam perencanaan.",
      "Bimbingan konseling juga terbuka bagi murid yang membutuhkan ruang bicara. Tujuannya bukan menyeragamkan, tetapi memastikan setiap murid tetap punya jalan belajar.",
    ],
  },
  {
    slug: "literasi-lintas-mata-pelajaran",
    category: "Pembelajaran",
    date: "10 Oktober 2026",
    title: "Literasi lintas mata pelajaran: membaca bukan hanya tugas guru bahasa",
    excerpt:
      "Guru dari berbagai mapel membiasakan murid membaca, bertanya, dan menuliskan gagasan. Literasi menjadi kebiasaan sekolah, bukan satu pelajaran.",
    image: "",
    alt: "Rak buku dan ruang baca perpustakaan",
    featured: false,
    body: [
      "Literasi tidak hanya hidup di pelajaran Bahasa Indonesia. Guru IPA meminta murid membaca artikel sebelum praktikum; guru IPS memakai berita untuk diskusi.",
      "Murid belajar menandai informasi penting, mengajukan pertanyaan, dan menuliskan kesimpulan dengan bahasa sendiri.",
      "Kebiasaan ini membuat bacaan menjadi alat berpikir, bukan tugas yang harus diselesaikan.",
    ],
  },
  {
    slug: "pramuka-logatram-juara-umum",
    category: "Prestasi",
    date: "02 Oktober 2026",
    title: "Juara umum Pramuka Logatram: disiplin yang dibangun perlahan",
    excerpt:
      "Latihan rutin, kerja sama regu, dan kesiapan menghadapi lomba membawa regu Pramuka SMPN 2 Ambulu meraih juara umum tingkat kabupaten.",
    image: "",
    alt: "Upacara dan kegiatan resmi di sekolah",
    featured: false,
    body: [
      "Regu Pramuka SMPN 2 Ambulu berlatih setiap Jumat. Mereka menyiapkan baris-berbaris, tali-temali, dan kerja sama regu.",
      "Menjelang Logatram, latihan ditambah. Guru pembina menekankan disiplin dan kesiapan, bukan hanya kemenangan.",
      "Hasilnya juara umum tingkat kabupaten. Bagi murid, yang paling berharga adalah kebiasaan datang tepat waktu dan saling membantu.",
    ],
  },
  {
    slug: "tari-mahargya-kaloka",
    category: "Prestasi",
    date: "26 September 2026",
    title: "Tari Mahargya Kaloka: merawat budaya lewat panggung sekolah",
    excerpt:
      "Latihan tari tidak hanya soal gerak. Murid belajar disiplin, kekompakan, dan menghargai budaya daerah sebelum tampil di festival.",
    image: "",
    alt: "Murid mengikuti kegiatan seni di sekolah",
    featured: false,
    body: [
      "Sanggar Tari menyiapkan penampilan untuk Festival Mahargya Kaloka. Latihan dimulai dari gerak dasar, lalu koreografi kelompok.",
      "Murid juga belajar kostum, tata rias, dan makna budaya di balik tarian. Mereka berlatih sabar dan saling mengingatkan.",
      "Penampilan di panggung menjadi cara merawat budaya daerah, sekaligus menunjukkan bahwa kerja keras punya bentuk yang bisa dinikmati orang lain.",
    ],
  },
];

export const ppdbSteps = [
  {
    step: "01",
    title: "Pahami jalur dan jadwal",
    description:
      "SPMB SMP memakai jalur prestasi akademik, prestasi non-akademik, afirmasi, mutasi, dan zonasi. Setiap jalur punya syarat yang berbeda.",
  },
  {
    step: "02",
    title: "Siapkan dokumen",
    description:
      "Siapkan ijazah atau surat keterangan lulus, akta kelahiran, kartu keluarga, dan dokumen pendukung lain sesuai jalur yang dipilih.",
  },
  {
    step: "03",
    title: "Daftar lewat kanal resmi",
    description:
      "Ikuti pendaftaran melalui kanal yang ditetapkan panitia. Simpan bukti pendaftaran dan pantau pengumuman resmi sekolah.",
  },
];

export const footerLinks = [
  {
    title: "Sekolah",
    links: [
      { label: "Profil", href: "/#profil" },
      { label: "Akademik", href: "/#akademik" },
      { label: "Prestasi", href: "/#prestasi" },
      { label: "Guru", href: "/guru" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Berita", href: "/berita" },
      { label: "Galeri", href: "/#galeri" },
      { label: "SPMB", href: "/#ppdb" },
      { label: "Kontak", href: "/#kontak" },
      { label: "Kritik & saran", href: "/kritik-saran" },
    ],
  },
];
