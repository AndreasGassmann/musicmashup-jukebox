import {JukeboxUser} from "./JukeboxUser";
import {Room} from "./Room";
export class ChatMessage {
  id:number;
  user:JukeboxUser;
  datetime:Date;
  room:Room;
  text:string;
}