import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {YoutubeService} from "../../providers/youtube-service";
import {YoutubeVideo} from "../../classes/YoutubeVideo";
import {Video} from "../../classes/Video";
import {NavOptions} from "ionic-angular/index";
import {SocketService} from "../../providers/socket-service";
import {Keyboard} from 'ionic-native';
import {Focuser} from "../../components/focuser/focuser";

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [YoutubeService],
  directives: [Focuser]
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
        this.searchResults = result.videos.items;
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
    video.url = "https://www.youtube.com/embed/" + item.id.videoId;
    video.videoId = item.id.videoId;
    video.voteCount = 0;

    this.socketService.sendMessage("addVideo", video);

    Keyboard.close();

    this.nav.pop();
  }

}
