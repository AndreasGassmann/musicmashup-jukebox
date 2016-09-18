import {JukeboxUser} from "./JukeboxUser";
import {Room} from "./Room";
export class Video {
  id:number;
  title:string;
  url:string;
  thumbUrl:string;
  user:JukeboxUser;
  videoId:string;
  datetime_added:Date;
  room:Room;
  played:boolean;
  voteCount:number;
  voteValue:number;
  globalVideoId:number;
}