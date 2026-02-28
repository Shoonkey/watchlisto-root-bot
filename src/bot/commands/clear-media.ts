import { Kysely } from "kysely";
import BaseCommand, { CommandResponse } from "./base-command";
import IDatabase from "../../db/db-interface";
import MediaRepository from "../../db/repos/media-repository";

class ClearMediaCommand extends BaseCommand {
  async run(db: Kysely<IDatabase>): Promise<CommandResponse> {
    const repo = new MediaRepository(db);

    try {
      await repo.clearMedia();
      return {
        output: `Watchlist cleared! brain empty, mind free :v`,
        success: true,
      };
    } catch (err) {
      console.log("Unknown error:", err);

      return {
        success: false,
        error: "Unable to clear wishlist :(",
      };
    }
  }
}

export default ClearMediaCommand;
