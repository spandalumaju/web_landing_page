import { z } from "zod";

export const achievementSchema = z.object({
  title: z.string().trim().min(4, "Nama prestasi minimal 4 karakter").max(180),
  recipient: z.string().trim().max(160),
  level: z.string().trim().min(2).max(60),
  year: z.coerce.number().int().min(2000).max(2100),
  category: z.enum(["Akademik", "Non-akademik"]),
  featured: z.preprocess(
    (value) => value === "on" || value === "true" || value === true,
    z.boolean(),
  ),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

export type AchievementFormState = {
  error?: string;
  success?: boolean;
  message?: string;
};

export const achievementLevels = [
  "Sekolah",
  "Kecamatan",
  "Kabupaten",
  "Provinsi",
  "Nasional",
  "Internasional",
];
