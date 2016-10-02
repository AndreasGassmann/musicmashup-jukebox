import { JukeboxUser } from "./JukeboxUser";
import { Room } from "./Room";

export class UserToRoom {
  id: number;
  user: JukeboxUser;
  room: Room;
  datetime_joined: Date;
}
