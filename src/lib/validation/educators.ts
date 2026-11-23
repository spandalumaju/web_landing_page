import { z } from "zod";

export const educatorSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
  role: z.string().trim().min(2, "Jabatan wajib diisi").max(120),
  unit: z.string().trim().min(2, "Unit wajib diisi").max(80),
  quote: z.string().trim().max(500, "Kutipan maksimal 500 karakter"),
  level: z.coerce.number().int().min(1).max(4),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  published: z.preprocess(
    (value) => value === "on" || value === "true" || value === true,
    z.boolean(),
  ),
  photo: z.string().trim().max(300).optional(),
});

export type EducatorFormState = {
  error?: string;
  success?: boolean;
  message?: string;
};

export const unitOptions = [
  "Kepemimpinan",
  "Kurikulum",
  "Kesiswaan",
  "Dewan Guru",
  "Administrasi",
  "Keuangan",
  "Layanan & Arsip",
];

export const levelOptions = [
  { value: 1, label: "Kepala Sekolah" },
  { value: 2, label: "Wakil / Kepala Unit" },
  { value: 3, label: "Staff / Tenaga Kependidikan" },
  { value: 4, label: "Guru" },
];
