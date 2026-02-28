import { UUID } from "node:crypto";

export default interface Media {
  id: UUID;
  name: string;
}
