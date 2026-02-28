import { FileMigrationProvider, Kysely, Migrator } from "kysely";
import path from "node:path";
import fs from "node:fs/promises";
import process from "node:process";
import IDatabase from "./db-interface";

export async function migrateDbToLatest(db: Kysely<IDatabase>) {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { results: migrations, error } = await migrator.migrateToLatest();

  migrations?.forEach(({ migrationName: name, status }) => {
    if (status === "Success") {
      console.log(`Migration "${name}" was executed successfully`);
    } else if (status === "Error") {
      console.error(`Failed to execute migration "${name}"`);
    }
  });

  if (error) {
    console.error("Failed to run migrations. Error:", error);
    await db.destroy();
    process.exit(1);
  }
}
