import { Kysely } from "kysely";
import IDatabase from "../../db/db-interface";

interface SuccessResponse {
  success: true;
  output: string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export type CommandResponse =  SuccessResponse | ErrorResponse;

abstract class BaseCommand {
  abstract run(db: Kysely<IDatabase>, content?: string): Promise<CommandResponse>;
}

export default BaseCommand;
