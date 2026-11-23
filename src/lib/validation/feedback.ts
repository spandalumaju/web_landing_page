import { z } from "zod";

export const feedbackCategories = [
  { value: "kritik", label: "Kritik" },
  { value: "saran", label: "Saran" },
  { value: "aspirasi", label: "Aspirasi" },
];

export const feedbackStatuses = [
  { value: "baru", label: "Baru" },
  { value: "dibaca", label: "Dibaca" },
  { value: "ditindaklanjuti", label: "Ditindaklanjuti" },
  { value: "arsip", label: "Arsip" },
];

export const feedbackSchema = z.object({
  name: z.string().trim().max(80, "Nama maksimal 80 karakter").optional(),
  contact: z
    .string()
    .trim()
    .max(120, "Kontak maksimal 120 karakter")
    .optional(),
  category: z.enum(["kritik", "saran", "aspirasi"]),
  message: z
    .string()
    .trim()
    .min(10, "Tulis pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2.000 karakter"),
  consent: z.preprocess(
    (value) => value === "on" || value === "true" || value === true,
    z.boolean(),
  ),
});

export type FeedbackFormState = {
  success?: boolean;
  error?: string;
};

export function feedbackCategoryLabel(value: string): string {
  return (
    feedbackCategories.find((category) => category.value === value)?.label ??
    "Saran"
  );
}

export function feedbackStatusLabel(value: string): string {
  return (
    feedbackStatuses.find((status) => status.value === value)?.label ?? "Baru"
  );
}
