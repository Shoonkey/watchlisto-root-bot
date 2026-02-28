import Media from "./models/media";
import MediaUserInfo from "./models/media-user-info";

export default interface IDatabase {
  media: Media;
  media_user_info: MediaUserInfo;
}
