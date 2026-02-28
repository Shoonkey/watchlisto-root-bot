import { Kysely } from "kysely";
import BaseCommand, { CommandResponse } from "./base-command";
import IDatabase from "../../db/db-interface";
import MediaRepository from "../../db/repos/media-repository";

class AddMediaCommand extends BaseCommand {
  async run(db: Kysely<IDatabase>, name: string): Promise<CommandResponse> {
    const repo = new MediaRepository(db);

    if (!name)
      return {
        success: false,
        error:
          "Trying to add a piece of media without name, are we? It ain't happeninggg!",
      };

    try {
      await repo.addMedia(name);
      return {
        output: `Added \`${name}\` to the list :)`,
        success: true,
      };
    } catch (err) {
      console.log("Unknown error:", err);

      return {
        success: false,
        error: "Unable to add media :\\",
      };
    }
  }
}

export default AddMediaCommand;
