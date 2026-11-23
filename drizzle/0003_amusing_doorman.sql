CREATE TABLE `site_images` (
	`key` text PRIMARY KEY NOT NULL,
	`group` text NOT NULL,
	`label` text NOT NULL,
	`alt` text DEFAULT '' NOT NULL,
	`url` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `site_images_group_idx` ON `site_images` (`group`,`sort_order`);