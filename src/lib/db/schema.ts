import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  passwordHash: text("password_hash").notNull(),
  ...timestamps,
});

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("sessions_user_idx").on(table.userId)],
);

export const loginAttempts = sqliteTable(
  "login_attempts",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    success: integer("success", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("login_attempts_identifier_idx").on(table.identifier, table.createdAt)],
);

export const siteImages = sqliteTable(
  "site_images",
  {
    key: text("key").primaryKey(),
    group: text("group").notNull(),
    label: text("label").notNull(),
    alt: text("alt").notNull().default(""),
    url: text("url").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("site_images_group_idx").on(table.group, table.sortOrder)],
);

export const educators = sqliteTable(
  "educators",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    unit: text("unit").notNull().default("Dewan Guru"),
    photo: text("photo").notNull().default(""),
    quote: text("quote").notNull().default(""),
    level: integer("level").notNull().default(3),
    sortOrder: integer("sort_order").notNull().default(0),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    ...timestamps,
  },
  (table) => [
    index("educators_published_idx").on(table.published, table.sortOrder),
    index("educators_unit_idx").on(table.unit),
  ],
);

export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull().default(""),
    contentHtml: text("content_html").notNull().default(""),
    category: text("category").notNull().default("berita"),
    status: text("status").notNull().default("draft"),
    cover: text("cover"),
    images: text("images").notNull().default("[]"),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    ...timestamps,
  },
  (table) => [
    index("posts_status_idx").on(table.status, table.publishedAt),
    index("posts_slug_idx").on(table.slug),
  ],
);

export const achievements = sqliteTable(
  "achievements",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    recipient: text("recipient").notNull().default(""),
    level: text("level").notNull().default("Kabupaten"),
    year: integer("year").notNull(),
    category: text("category").notNull().default("Akademik"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [index("achievements_year_idx").on(table.year, table.sortOrder)],
);


export const feedback = sqliteTable(
  "feedback",
  {
    id: text("id").primaryKey(),
    name: text("name"),
    contact: text("contact"),
    category: text("category").notNull().default("saran"),
    message: text("message").notNull(),
    status: text("status").notNull().default("baru"),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    telegramSent: integer("telegram_sent", { mode: "boolean" })
      .notNull()
      .default(false),
    telegramError: text("telegram_error"),
    ...timestamps,
  },
  (table) => [
    index("feedback_status_idx").on(table.status, table.createdAt),
    index("feedback_created_idx").on(table.createdAt),
  ],
);

export const feedbackRateLimits = sqliteTable(
  "feedback_rate_limits",
  {
    id: text("id").primaryKey(),
    ipHash: text("ip_hash").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("feedback_rate_ip_idx").on(table.ipHash, table.createdAt)],
);

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type EducatorRecord = typeof educators.$inferSelect;
export type PostRecord = typeof posts.$inferSelect;
export type AchievementRecord = typeof achievements.$inferSelect;
export type FeedbackRecord = typeof feedback.$inferSelect;
