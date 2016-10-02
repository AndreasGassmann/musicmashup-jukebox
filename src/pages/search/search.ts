import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YoutubeService } from "../../providers/youtube-service";
import { YoutubeVideo } from "../../classes/YoutubeVideo";
import { Video } from "../../classes/Video";
import { SocketService } from "../../providers/socket-service";
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  searchInput:string;
  shouldShowCancel:boolean;
  searchResults: YoutubeVideo[] = [];

  constructor(private nav: NavController, private youtubeService: YoutubeService, private socketService: SocketService) {
  }

  onInput($event){
    if(this.searchInput == ""){
      this.searchResults = [];
    }else {
      this.youtubeService.searchVideo(this.searchInput).then(result => {
        console.log(result);
        this.searchResults = result.items;
      });
    }
  }


  onCancel($event){
    this.searchResults = [];
  }

  itemClicked(item:YoutubeVideo){
    var video = new Video();
    video.title = item.snippet.title;
    video.datetime_added = new Date();
    video.played = false;
    video.thumbUrl = item.snippet.thumbnails.default.url;
    video.url = "https://www.youtube.com/embed/" + item.id;
    video.videoId = item.id;
    video.voteCount = 0;
    video.duration = item.contentDetails.duration;
    video.channelTitle = item.snippet.channelTitle;

    this.socketService.sendMessage("addVideo", video);

    Keyboard.close();

    this.nav.pop();
  }

}
