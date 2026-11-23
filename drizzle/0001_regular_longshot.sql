CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`contact` text,
	`category` text DEFAULT 'saran' NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'baru' NOT NULL,
	`ip_hash` text,
	`user_agent` text,
	`telegram_sent` integer DEFAULT false NOT NULL,
	`telegram_error` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `feedback_status_idx` ON `feedback` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `feedback_created_idx` ON `feedback` (`created_at`);--> statement-breakpoint
CREATE TABLE `feedback_rate_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`ip_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `feedback_rate_ip_idx` ON `feedback_rate_limits` (`ip_hash`,`created_at`);