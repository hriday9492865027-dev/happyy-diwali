import { pgTable, text, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email"),
  role: text("role").notNull().default("visitor"), // "admin" | "visitor"
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  anonymousTokenHash: text("anonymous_token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const greetingConfigs = pgTable("greeting_configs", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default("Happy Deepavali"),
  subtitle: text("subtitle").notNull().default("May the divine light illuminate your path with joy, peace, and boundless prosperity."),
  senderName: text("sender_name"),
  institutionName: text("institution_name"),
  enabledFeatures: jsonb("enabled_features").notNull().default({
    allowUploads: true,
    allowSharing: true,
    allowReplay: true,
    allowAudio: false,
    allowIntro: true,
  }),
  themeJson: jsonb("theme_json").notNull().default({
    ghostOpacity: 0.08,
    particleBudgetMobile: 40,
    particleBudgetDesktop: 120,
    accentColor: "#FFD700",
  }),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const mediaAssets = pgTable("media_assets", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  blobKey: text("blob_key").notNull(),
  assetType: text("asset_type").notNull(), // "original" | "cutout"
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  width: integer("width"),
  height: integer("height"),
  status: text("status").notNull().default("uploaded"), // "uploaded" | "processing" | "ready" | "failed" | "expired" | "deleted"
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const processingJobs = pgTable("processing_jobs", {
  id: text("id").primaryKey(),
  mediaAssetId: text("media_asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
  provider: text("provider").notNull(), // "birefnet" | "rembg" | "removebg" | "mock"
  status: text("status").notNull().default("pending"), // "pending" | "processing" | "completed" | "failed"
  errorCode: text("error_code"),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const shareRecords = pgTable("share_records", {
  id: text("id").primaryKey(),
  ownerSessionId: text("owner_session_id").notNull(),
  tokenHash: text("token_hash").notNull(),
  mediaAssetId: text("media_asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: text("id").primaryKey(),
  actorId: text("actor_id").notNull(),
  action: text("action").notNull(),
  targetId: text("target_id"),
  metadataJson: jsonb("metadata_json"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
