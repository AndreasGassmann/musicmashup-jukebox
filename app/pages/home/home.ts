import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {InfoModal} from "../../modals/info/info";
import {SearchPage} from "../search/search";
import {BeaconService} from "../../providers/beacon-service";
import {SocketService} from "../../providers/socket-service";
import {Events} from "ionic-angular/index";
import {YoutubeVideo} from "../../classes/YoutubeVideo";
import {Video} from "../../classes/Video";
declare var document: any;
declare var YT: any;
declare var target: any;



@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [BeaconService]
})
export class HomePage {

  room:any;
  playingVideo:any;

  constructor(private navController: NavController, private beaconService: BeaconService, private socketService: SocketService, public events: Events) {
     this.room = this.socketService.room;

    this.playLogic();

    this.events.subscribe("roomUpdated", room =>{
      this.room = this.socketService.room;
      this.playLogic();
    });

    if (this.room.hasBeacon) {
      this.beaconService.stopMonitoring().then(() => {
        this.startAdvertising();
      });
    }
  }

  public playLogic(){
    console.log('check for play');
    console.log('is admin: ' + this.socketService.isAdmin);
    if(this.socketService.isAdmin && this.room.queue.length > 0 && typeof this.playingVideo === 'undefined'){

      console.log('before init' + this.room.queue[0].title);
      this.playingVideo = this.room.queue[0];
      this.socketService.sendMessage("playingVideo", this.room.queue[0]);
      console.log('after init' + this.room.queue[0].title);

      // Replace the 'video' element with an <iframe> and
      // YouTube player after the API code downloads.
        let self = this;

      var player = new YT.Player('video', {
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
      
      this.playingVideo = self.room.queue[0];
      player.loadVideoById(this.playingVideo.videoId);
    }
  }
          }
        });
      
    }
  }

  


  public voteUp(video:Video){
    video.voteValue = 1;
    this.socketService.sendMessage("addVote", video);
  }

  public voteDown(video:Video){
    video.voteValue = -1;
    this.socketService.sendMessage("addVote", video);
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

