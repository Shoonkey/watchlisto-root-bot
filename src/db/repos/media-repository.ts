import crypto, { UUID } from "node:crypto";

import Media from "../models/media";
import BaseRepository from "./base-repository";

type MediaWithAverageRatings = Media & { avgRating: number | null };

type MediaUserInfoInput<T = {}> = T & {
  mediaId: UUID;
  userId: UUID;
};

class MediaRepository extends BaseRepository {
  async getAllMedia(): Promise<MediaWithAverageRatings[]> {
    const result = await this._db
      .selectFrom("media")
      .leftJoin("media_user_info", "media_user_info.mediaId", "media.id")
      .select(({ fn, lit }) => [
        "id",
        "name",
        fn.avg<number | null>("media_user_info.rating").as("avgRating"),
      ])
      .groupBy("id")
      .orderBy("name", "asc")
      .orderBy("avgRating", "desc")
      .execute();

    return result;
  }

  async addMedia(name: string) {
    const id = crypto.randomUUID();
    await this._db.insertInto("media").values({ id, name }).execute();
  }

  async clearMedia() {
    await this._db.deleteFrom("media").execute();
  }

  async getUserRating({
    mediaId,
    userId,
  }: MediaUserInfoInput): Promise<number | null> {
    const result = await this._db
      .selectFrom("media_user_info")
      .where("mediaId", "=", mediaId)
      .where("userId", "=", userId)
      .select(["rating"])
      .executeTakeFirst();

    return result?.rating || null;
  }

  async setUserRating({
    mediaId,
    userId,
    rating,
  }: MediaUserInfoInput<{
    rating: number;
  }>): Promise<void> {
    await this._db
      .insertInto("media_user_info")
      .values({
        mediaId,
        userId,
        rating,
      })
      .execute();
  }

  async setUserWatched({
    mediaId,
    userId,
    watched,
  }: MediaUserInfoInput<{ watched: boolean }>) {}

  async removeUserRating({ mediaId, userId }: MediaUserInfoInput) {}
}

export default MediaRepository;
