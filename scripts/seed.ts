import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { achievements, educators, posts, users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { achievements as seedAchievements, educators as seedEducators, posts as seedPosts } from "@/lib/content";

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME?.trim() || "Admin Sekolah";

if (!adminEmail || !adminPassword) {
  throw new Error("ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi di .env.local");
}


const months: Record<string, number> = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

function parseContentDate(value: string, fallbackIndex: number): Date {
  const [day, month, year] = value.split(" ");
  const monthIndex = months[month?.toLowerCase() ?? ""];
  if (!day || monthIndex === undefined || !year) {
    return new Date(Date.now() - fallbackIndex * 86400000);
  }
  return new Date(Number(year), monthIndex, Number(day), 9, 0, 0);
}

const resetContent = process.argv.includes("--reset-content");
if (resetContent) {
  db.delete(posts).run();
  db.delete(achievements).run();
  console.log("Konten berita dan prestasi lama dihapus untuk seed ulang");
}

const existingUser = db.select().from(users).limit(1).get();

if (!existingUser) {
  db.insert(users)
    .values({
      id: crypto.randomUUID(),
      email: adminEmail,
      name: adminName,
      role: "admin",
      passwordHash: hashPassword(adminPassword),
    })
    .run();
  console.log(`Admin dibuat: ${adminEmail}`);
} else {
  console.log(`Admin sudah ada: ${existingUser.email}`);
}

const educatorCount = db.select({ value: sql<number>`count(*)` }).from(educators).get()?.value ?? 0;
if (educatorCount === 0) {
  db.insert(educators)
    .values(
      seedEducators.map((educator, index) => ({
        id: educator.id,
        name: educator.name,
        role: educator.role,
        unit: educator.unit,
        photo: educator.photo,
        quote: educator.quote,
        level:
          educator.role === "Kepala Sekolah"
            ? 1
            : educator.role === "Wakil Kepala Sekolah" || educator.role === "Kepala Tata Usaha"
              ? 2
              : educator.unit === "Dewan Guru"
                ? 4
                : 3,
        sortOrder: index,
        published: true,
      })),
    )
    .run();
  console.log(`${seedEducators.length} pendidik & staf dimasukkan`);
}

const existingPostSlugs = new Set(
  db.select({ slug: posts.slug }).from(posts).all().map((row) => row.slug),
);
const newPosts = seedPosts.filter((post) => !existingPostSlugs.has(post.slug));
if (newPosts.length > 0) {
  db.insert(posts)
    .values(
      newPosts.map((post, index) => ({
        id: crypto.randomUUID(),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        contentHtml:
          post.body?.map((paragraph) => `<p>${paragraph}</p>`).join("") ??
          `<p>${post.excerpt}</p>`,
        category: post.category,
        status: "published",
        cover: post.image,
        publishedAt: parseContentDate(post.date, index),
      })),
    )
    .run();
  console.log(`${newPosts.length} berita baru dimasukkan`);
} else {
  console.log("Tidak ada berita baru");
}

const existingAchievements = new Set(
  db
    .select({ title: achievements.title, year: achievements.year })
    .from(achievements)
    .all()
    .map((row) => `${row.title}|${row.year}`),
);
const newAchievements = seedAchievements.filter(
  (achievement) =>
    !existingAchievements.has(`${achievement.title}|${achievement.year}`),
);
if (newAchievements.length > 0) {
  db.insert(achievements)
    .values(
      newAchievements.map((achievement, index) => ({
        id: crypto.randomUUID(),
        title: achievement.title,
        recipient: achievement.recipient,
        level: achievement.level,
        year: Number(achievement.year),
        category: achievement.category,
        featured: index < 3,
        sortOrder: index,
      })),
    )
    .run();
  console.log(`${newAchievements.length} prestasi baru dimasukkan`);
} else {
  console.log("Tidak ada prestasi baru");
}

console.log("Seed selesai.");
