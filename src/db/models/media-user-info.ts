import { Generated } from "kysely";
import { UUID } from "node:crypto";

export default interface MediaUserInfo {
  mediaId: UUID;
  userId: UUID;
  rating: number | null;
  watched: Generated<boolean>;
}
