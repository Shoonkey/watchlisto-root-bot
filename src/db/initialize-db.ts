import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import SqliteDatabase from "better-sqlite3";
import { rootServer } from "@rootsdk/server-bot";

import IDatabase from "./db-interface";
import { migrateDbToLatest } from "./migrate-to-latest";

export async function initializeDb() {
  const dialect = new SqliteDialect({
    database: async () =>
      new SqliteDatabase(rootServer.dataStore.config.sqlite3!.filename),
  });
  
  const db = new Kysely<IDatabase>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });

  await migrateDbToLatest(db);

  return db;
}
