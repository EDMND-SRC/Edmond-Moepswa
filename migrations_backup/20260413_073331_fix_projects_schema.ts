import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_features" ALTER COLUMN "feature" SET NOT NULL;
  ALTER TABLE "projects_images" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "faqs" ALTER COLUMN "order" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "site_title" SET DEFAULT 'Edmond Moepswa | Web Designer · Full-Stack Developer · Workflow Automation Specialist';
  ALTER TABLE "site_settings" ALTER COLUMN "social_links_substack" SET DEFAULT '';
  ALTER TABLE "projects" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "leads" ADD COLUMN "website" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "social_links_instagram" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "social_links_threads" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_features" ALTER COLUMN "feature" DROP NOT NULL;
  ALTER TABLE "projects_images" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "faqs" ALTER COLUMN "order" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "site_title" SET DEFAULT 'Edmond Moepswa | Product Designer & Web Developer';
  ALTER TABLE "site_settings" ALTER COLUMN "social_links_substack" SET DEFAULT 'https://substack.com/@edmnd';
  ALTER TABLE "projects" DROP COLUMN "generate_slug";
  ALTER TABLE "leads" DROP COLUMN "website";
  ALTER TABLE "site_settings" DROP COLUMN "social_links_instagram";
  ALTER TABLE "site_settings" DROP COLUMN "social_links_threads";`)
}
