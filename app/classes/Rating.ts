import {JukeboxUser} from "./JukeboxUser";
import {Video} from "./Video";
export class Rating {
  id:number;
  name:string;
  video:Video;
  positive_rating:boolean;
}