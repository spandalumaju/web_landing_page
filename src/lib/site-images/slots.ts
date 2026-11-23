export type SiteImageGroup = "hero" | "profile" | "facilities" | "gallery";

export type SiteImageSlot = {
  key: string;
  group: SiteImageGroup;
  label: string;
  alt: string;
  sortOrder: number;
};

export const siteImageGroupLabels: Record<SiteImageGroup, string> = {
  hero: "Album beranda",
  profile: "Profil sekolah",
  facilities: "Fasilitas",
  gallery: "Galeri",
};

export const siteImageSlots: SiteImageSlot[] = [
  {
    key: "hero-1",
    group: "hero",
    label: "Foto utama — gedung sekolah",
    alt: "Gedung SMP Negeri 2 Ambulu",
    sortOrder: 10,
  },
  {
    key: "hero-2",
    group: "hero",
    label: "Kegiatan belajar",
    alt: "Kegiatan belajar murid",
    sortOrder: 20,
  },
  {
    key: "hero-3",
    group: "hero",
    label: "Perpustakaan",
    alt: "Perpustakaan sekolah",
    sortOrder: 30,
  },
  {
    key: "hero-4",
    group: "hero",
    label: "Laboratorium",
    alt: "Laboratorium sekolah",
    sortOrder: 40,
  },
  {
    key: "hero-5",
    group: "hero",
    label: "Kegiatan sekolah",
    alt: "Kegiatan sekolah",
    sortOrder: 50,
  },
  {
    key: "profile-main",
    group: "profile",
    label: "Foto profil utama",
    alt: "Suasana pembelajaran di SMP Negeri 2 Ambulu",
    sortOrder: 10,
  },
  {
    key: "profile-secondary",
    group: "profile",
    label: "Foto profil pendukung",
    alt: "Kegiatan murid di sekolah",
    sortOrder: 20,
  },
  {
    key: "facility-library",
    group: "facilities",
    label: "Perpustakaan",
    alt: "Perpustakaan sekolah",
    sortOrder: 10,
  },
  {
    key: "facility-lab",
    group: "facilities",
    label: "Laboratorium IPA",
    alt: "Laboratorium IPA sekolah",
    sortOrder: 20,
  },
  {
    key: "facility-sports",
    group: "facilities",
    label: "Lapangan olahraga",
    alt: "Lapangan olahraga sekolah",
    sortOrder: 30,
  },
  ...Array.from({ length: 7 }, (_, index) => ({
    key: `gallery-${index + 1}`,
    group: "gallery" as const,
    label: `Galeri ${index + 1}`,
    alt: `Dokumentasi kegiatan sekolah ${index + 1}`,
    sortOrder: (index + 1) * 10,
  })),
];
