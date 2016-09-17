import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {YoutubeService} from "../../providers/youtube-service";
import {YoutubeVideo} from "../../classes/YoutubeVideo";

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [YoutubeService]
})
export class SearchPage {

  searchInput:string;
  shouldShowCancel:boolean;
  searchResults: YoutubeVideo[] = [];

  constructor(private nav: NavController, private youtubeService: YoutubeService) {
  }

  onInput($event){
    if(this.searchInput == ""){
      this.searchResults = [];
    }else {
      this.youtubeService.searchVideo(this.searchInput).then(items => {
        this.searchResults = items.items;
      });
    }
  }


  onCancel($event){
    this.searchResults = [];
  }

  itemClicked(item:YoutubeVideo){
    alert(item.snippet.title);
  }

}
