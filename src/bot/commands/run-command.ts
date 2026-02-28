import BaseCommand from "./base-command";
import AddMediaCommand from "./add-media";
import ListMediaCommand from "./list-media";
import { BotCommandName } from "./meta";
import ClearMediaCommand from "./clear-media";

const commands: Record<BotCommandName, BaseCommand | string> = {
  "add-media": new AddMediaCommand(),
  list: new ListMediaCommand(),
  clear: new ClearMediaCommand(),
  "update-name": "",
  remove: "",
  rate: "",
  unrate: "",
  watch: "",
  unwatch: "",
};

export default function getCommand(command: BotCommandName) {
  return commands[command];
}
