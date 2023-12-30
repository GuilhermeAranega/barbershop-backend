DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('masculino', 'feminino');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appointment" (
	"id" text PRIMARY KEY NOT NULL,
	"date" text,
	"time" text,
	"customer_id" text,
	"barber_id" text,
	"type_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "barber" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"phone" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "haircutType" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(50),
	"price" real,
	"gender" "gender"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointment" ADD CONSTRAINT "appointment_customer_id_costumer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "costumer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointment" ADD CONSTRAINT "appointment_barber_id_barber_id_fk" FOREIGN KEY ("barber_id") REFERENCES "barber"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointment" ADD CONSTRAINT "appointment_type_id_haircutType_id_fk" FOREIGN KEY ("type_id") REFERENCES "haircutType"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
