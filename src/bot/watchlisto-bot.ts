import {
  ChannelGuid,
  ChannelMessageCreatedEvent,
  ChannelMessageCreateRequest,
  ChannelMessageEvent,
  MessageType,
  RootApiException,
  RootBotStartState,
  rootServer,
} from "@rootsdk/server-bot";
import { Kysely } from "kysely";

import IDatabase from "../db/db-interface";
import BaseCommand from "./commands/base-command";
import { BotCommandName, validBotCommands } from "./commands/meta";
import getCommand from "./commands/run-command";

class WatchlistoBot {
  private _db: Kysely<IDatabase>;

  constructor(db: Kysely<IDatabase>) {
    this._db = db;
  }

  async initialize(_state: RootBotStartState) {
    rootServer.community.channelMessages.on(
      ChannelMessageEvent.ChannelMessageCreated,
      (state) => this._onMessage(state),
    );
  }

  private async _onMessage(e: ChannelMessageCreatedEvent) {
    if (e.messageType === MessageType.System) return;

    const msg = e.messageContent;
    const firstSpace = msg.indexOf(" ");
    let command: string, content: string;

    if (firstSpace !== -1) {
      command = msg.substring(1, firstSpace);
      content = msg.substring(firstSpace).trim();
    } else {
      command = msg.substring(1);
      content = "";
    }

    await this._executeCommand(e.channelId, command, content);
  }

  private _isValidCommand(command: string): command is BotCommandName {
    return validBotCommands.includes(command as BotCommandName);
  }

  private async _sendMessage(channelId: ChannelGuid, msg: string) {
    const createMessageRequest: ChannelMessageCreateRequest = {
      channelId,
      content: msg,
    };

    try {
      await rootServer.community.channelMessages.create(createMessageRequest);
    } catch (err) {
      if (err instanceof RootApiException) {
        console.error("RootApiException:", err.errorCode);
      } else {
        console.error("Unknown error:", err);
      }
    }
  }

  private async _sendErrorMessage(channelGuid: ChannelGuid, msg: string) {
    await this._sendMessage(
      channelGuid,
      `🤖 Fatal Error!!1 🤖\nJust kidding... ${msg}`,
    );
  }

  private async _executeCommand(
    channelGuid: ChannelGuid,
    command: string,
    content: string,
  ) {
    if (!this._isValidCommand(command)) return;

    const commandRunner = getCommand(command);

    if (!(commandRunner instanceof BaseCommand)) {
      this._sendErrorMessage(
        channelGuid,
        `The command \`${command}\` is not implemented yet`,
      );
      return;
    }

    const response = await commandRunner.run(this._db, content);

    if (!response.success) {
      await this._sendErrorMessage(channelGuid, response.error);
      return;
    }

    await this._sendMessage(channelGuid, response.output);
  }
}

export default WatchlistoBot;
