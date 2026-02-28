export const validBotCommands = [
  "add-media",
  "clear",
  "update-name",
  "remove",
  "rate",
  "unrate",
  "watch",
  "unwatch",
  "list",
] as const;

export type BotCommandName = (typeof validBotCommands)[number];
