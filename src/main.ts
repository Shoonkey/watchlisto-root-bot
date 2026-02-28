import { RootApiException, rootServer } from "@rootsdk/server-bot";

import { initializeDb } from "./db/initialize-db";
import WatchlistoBot from "./bot/watchlisto-bot";

async function runBot() {
  try {
    const db = await initializeDb();
    const bot = new WatchlistoBot(db);

    await rootServer.lifecycle.start((_state) => bot.initialize(_state));
  } catch (err) {
    if (err instanceof RootApiException) {
      console.error("RootApiException:", err.errorCode);
    } else {
      console.error("Unexpected error:", err);
    }
  }
}

runBot();
