import { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("media")
    .ifNotExists()
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("media_user_info")
    .ifNotExists()
    .addColumn("media_id", "uuid", (col) =>
      col.notNull().references("media.id").onDelete("cascade"),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull())
    .addPrimaryKeyConstraint("media_user_rating_pk", ["media_id", "user_id"])
    .addColumn("rating", "real", (col) => col.defaultTo(null))
    .addColumn("watched", "boolean", (col) => col.notNull().defaultTo(false))
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("media_user_info").ifExists().execute();
  await db.schema.dropTable("media").ifExists().execute();
}
