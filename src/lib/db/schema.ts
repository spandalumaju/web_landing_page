import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  passwordHash: text("password_hash").notNull(),
  ...timestamps,
});

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("sessions_user_idx").on(table.userId)],
);

export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    success: boolean("success").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("login_attempts_identifier_idx").on(
      table.identifier,
      table.createdAt,
    ),
  ],
);

export const siteImages = pgTable(
  "site_images",
  {
    key: text("key").primaryKey(),
    group: text("group").notNull(),
    label: text("label").notNull(),
    alt: text("alt").notNull().default(""),
    url: text("url").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("site_images_group_idx").on(table.group, table.sortOrder)],
);

export const educators = pgTable(
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
    published: boolean("published").notNull().default(true),
    ...timestamps,
  },
  (table) => [
    index("educators_published_idx").on(table.published, table.sortOrder),
    index("educators_unit_idx").on(table.unit),
  ],
);

export const posts = pgTable(
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
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index("posts_status_idx").on(table.status, table.publishedAt),
    index("posts_slug_idx").on(table.slug),
  ],
);

export const achievements = pgTable(
  "achievements",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    recipient: text("recipient").notNull().default(""),
    level: text("level").notNull().default("Kabupaten"),
    year: integer("year").notNull(),
    category: text("category").notNull().default("Akademik"),
    featured: boolean("featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    index("achievements_year_idx").on(table.year, table.sortOrder),
  ],
);

export const feedback = pgTable(
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
    telegramSent: boolean("telegram_sent").notNull().default(false),
    telegramError: text("telegram_error"),
    ...timestamps,
  },
  (table) => [
    index("feedback_status_idx").on(table.status, table.createdAt),
    index("feedback_created_idx").on(table.createdAt),
  ],
);

export const feedbackRateLimits = pgTable(
  "feedback_rate_limits",
  {
    id: text("id").primaryKey(),
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("feedback_rate_ip_idx").on(table.ipHash, table.createdAt),
  ],
);

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type EducatorRecord = typeof educators.$inferSelect;
export type PostRecord = typeof posts.$inferSelect;
export type AchievementRecord = typeof achievements.$inferSelect;
export type FeedbackRecord = typeof feedback.$inferSelect;
