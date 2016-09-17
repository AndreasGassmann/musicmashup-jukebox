import {JukeboxUser} from "./JukeboxUser";
import {Room} from "./Room";
export class Video {
  id:number;
  url:string;
  user:JukeboxUser;
  datetime_added:Date;
  room:Room;
  played:boolean;
}