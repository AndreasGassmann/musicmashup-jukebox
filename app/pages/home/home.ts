import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {InfoModal} from "../../modals/info/info";
import {SearchPage} from "../search/search";
import {BeaconService} from "../../providers/beacon-service";
import {SocketService} from "../../providers/socket-service";
import {Events} from "ionic-angular/index";
import {YoutubeVideo} from "../../classes/YoutubeVideo";
import {Video} from "../../classes/Video";
import {VideoDurationPipe} from "../../pipe/VideoDurationPipe";
declare var document: any;
declare var YT: any;
declare var target: any;



@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [BeaconService],
  pipes: [VideoDurationPipe]
})
export class HomePage {

  localVotes: Array<{id: number, isUpvote: boolean}>;
  room:any;
  playingVideo:any;
  player:any;

  constructor(private navController: NavController, private beaconService: BeaconService, private socketService: SocketService, public events: Events) {
    this.room = this.socketService.room;
    this.localVotes = [];

    this.playLogic();

    this.events.subscribe("roomUpdated", room => {
      console.log('roomUpdated!');
      this.room = this.socketService.room;
      this.playLogic();
      this.matchVotes();
    });

    if (this.room.hasBeacon) {
      this.beaconService.stopMonitoring().then(() => {
        this.startAdvertising();
      });
    }
  }

  public matchVotes() {
    for(var i = 0; this.localVotes.length; i++) {
      let match = this.room.queue.find((item) => { return item.globalVideoId === this.localVotes[i].id});
      if (match) {
        match.hasOwnVote = true;
        match.ownIsUpvote = this.localVotes[i].isUpvote;
        console.log(match.globalVideoId + ' has ' + this.localVotes[i].isUpvote);
      }
    }
  }

  public playLogic() {
    if(this.socketService.isAdmin && this.room.queue.length > 0 && typeof this.playingVideo === 'undefined'){

      console.log('before init' + this.room.queue[0].title);
      this.playingVideo = this.room.queue[0];
      this.socketService.sendMessage("playingVideo", this.room.queue[0]);
      console.log('after init' + this.room.queue[0].title);

      // Replace the 'video' element with an <iframe> and
      // YouTube player after the API code downloads.
      let self = this;

      this.player = new YT.Player('video', {
          autoplay: 1,
          height: '390',
          width: '640',
          videoId: this.playingVideo.videoId,
          events: {
            'onReady': (event) =>{
              event.target.playVideo();
          },
            'onStateChange': (event)=> {
              if (event.data == YT.PlayerState.ENDED) {
                console.log('video ended, notify server');
                self.socketService.sendMessage("playingVideo", self.room.queue[0]);
                console.log('start next video: ' + self.room.queue[0].title);
                
                this.playNextSong();
              }
            }
          }
        });
      
    }
  }

  public playNextSong() {
    this.playingVideo = this.room.queue[0];
    this.player.loadVideoById(this.playingVideo.videoId);
    this.socketService.sendMessage("playingVideo", this.playingVideo);
  }

  private addToLocalVotes(globalVideoId, isUpvote, callback) {
    let localVote = this.localVotes.find((vote) => { return vote.id === globalVideoId });
    if (!localVote) {
      this.localVotes.push({id: globalVideoId, isUpvote: isUpvote});
      callback(1);
    } else {
      for(var i = 0; this.localVotes.length; i++) {
        if (this.localVotes[i].id === globalVideoId) {
          this.localVotes.splice(i, 1);
        }
      }
      callback(-1);
    }
  }

  public voteUp(video:Video){
    video.voteValue = 1;
    this.addToLocalVotes(video.globalVideoId, true, (data) => {
      video.voteValue = data;
      this.socketService.sendMessage("addVote", video);
    });
  }

  public voteDown(video:Video){
    video.voteValue = -1;
    this.addToLocalVotes(video.globalVideoId, false, (data) => {
      video.voteValue = data;
      this.socketService.sendMessage("addVote", video);
    });
  }

  public goToSearchPage(){
    this.navController.push(SearchPage);
  }

  startAdvertising() {
    this.beaconService.createLocalBeacon(this.socketService.room.id);
  }

  startListening() {
    this.beaconService.startScanning();
  }

  presentInfoModal() {
    console.log(this.socketService.room);
    this.navController.present(Modal.create(InfoModal, {roomName: this.socketService.room.id}));
  }
}

