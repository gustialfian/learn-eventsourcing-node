CREATE TABLE `event_store` (
	`id` integer PRIMARY KEY NOT NULL,
	`aggregate_root_id` text,
	`data` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `aggregate_root_id_idx` ON `event_store` (`aggregate_root_id`);