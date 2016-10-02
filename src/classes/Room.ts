import { JukeboxUser } from "./JukeboxUser";
export class Room {
  id: number;
  name: string;
  user: JukeboxUser;
  datetime_created: Date;
  datetime_closed: Date;
  latitude: number;
  longitude: number;
}
