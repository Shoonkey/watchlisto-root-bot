import { Kysely } from "kysely";
import BaseCommand, { CommandResponse } from "./base-command";
import IDatabase from "../../db/db-interface";
import MediaRepository from "../../db/repos/media-repository";

class ListMediaCommand extends BaseCommand {
  async run(db: Kysely<IDatabase>): Promise<CommandResponse> {
    const repo = new MediaRepository(db);

    try {
      const media = await repo.getAllMedia();

      if (media.length === 0)
        return {
          success: true,
          output:
            "No items found in the watchlist. You can add some through `/add-media` :D",
        };

      let lines = ["Current watchlist:"];

      for (let i = 0; i < media.length; i++)
        lines.push(`${i + 1} - ${media[i].name} // ${media[i].avgRating ?? "Not rated yet"}`);

      return {
        output: lines.join("\n"),
        success: true,
      };
    } catch (err) {
      console.log("Unknown error:", err);

      return {
        success: false,
        error: "Unable to retrieve list :c",
      };
    }
  }
}

export default ListMediaCommand;
