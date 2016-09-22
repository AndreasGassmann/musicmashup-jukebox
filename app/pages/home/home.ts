import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {InfoModal} from "../../modals/info/info";
import {SearchPage} from "../search/search";
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
  pipes: [VideoDurationPipe]
})
export class HomePage {

  localVotes: Array<{id: number, isUpvote: boolean}>;
  room:any;
  playingVideo:any;
  player:any;
  playerStatus: any;
  range: number;


  constructor(private navController: NavController, private socketService: SocketService, public events: Events) {
    this.localVotes = [];
    this.playerStatus = {
      time: 0,
      duration: 0
    };

    this.room = this.socketService.room;
    this.playLogic();
    this.matchVotes();

    this.events.subscribe("roomUpdated", room => {
      this.room = this.socketService.room;
      this.playLogic();
      this.matchVotes();
    });

    /*
    if (this.room.hasBeacon) {
      this.beaconService.stopMonitoring().then(() => {
        this.startAdvertising();
      });
    }
    */
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

      // https://developers.google.com/youtube/player_parameters
      this.player = new YT.Player('video', {
          autoplay: 1,
          height: '390',
          width: '640',
          playerVars: {
            iv_load_policy: 3,
            rel: 0,
            showinfo: 0,
            playsinline: 1,
            controls: 0,
            disablekb: 1
          },
          videoId: this.playingVideo.videoId,
          events: {
            'onReady': (event) =>{
              event.target.playVideo();
              this.getDuration();
            },
            'onStateChange': (event)=> {

              let updateTimeInterval;
              let self = this;
              let setIntervalAndExecute = function() {
                 updateTimeInterval = setInterval(() => {
                   console.log('interval! updating time');
                   self.getTime();
                }, 500);
              };

              /**
               YT.PlayerState.ENDED
               YT.PlayerState.PLAYING
               YT.PlayerState.PAUSED
               YT.PlayerState.BUFFERING
               YT.PlayerState.CUED
               */
              if (event.data == YT.PlayerState.ENDED) {
                console.log('video ended, notify server');
                self.socketService.sendMessage("playingVideo", self.room.queue[0]);
                console.log('start next video: ' + self.room.queue[0].title);
                clearInterval(updateTimeInterval);

                this.playNextSong();
              }

              if (event.data == YT.PlayerState.PLAYING) {
                setIntervalAndExecute();
              }

              if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.BUFFERING || event.data == YT.PlayerState.CUED) {
                clearInterval(updateTimeInterval);
              }

              }
          }
        });
      
    }
  }

  public rangeChanged() {
    let seconds = Math.floor(Number(this.getDuration()) * (this.range / 10000));
    console.log(seconds);
    this.seekToTime(seconds);
  }

  public togglePlayVideo() {
    /**
     -1 – nicht gestartet
     0 – beendet
     1 – wird wiedergegeben
     2 – pausiert
     3 – wird gepuffert
     5 – Video positioniert
     */
    if (this.player.getPlayerState() === 1) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }

  public seekToTime(second) {
    this.player.seekTo(second, true);
  }

  public playNextSong() {
    this.playingVideo = this.room.queue[0];
    this.player.loadVideoById(this.playingVideo.videoId);
    this.getDuration();
    this.socketService.sendMessage("playingVideo", this.playingVideo);
  }

  public getTime() {
    this.playerStatus.time = this.player.getCurrentTime();
    console.log('Time: '+ this.playerStatus.time);
    console.log('Duration' + this.getDuration());
    console.log('Percentage');
    this.range = (this.playerStatus.time / this.getDuration()) * 10000;
    console.log(this.range);
    return this.playerStatus.time;
  }

  public getDuration() {
    this.playerStatus.duration = this.player.getDuration();
    return this.playerStatus.duration;
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

  /*
  startAdvertising() {
    this.beaconService.createLocalBeacon(this.socketService.room.id);
  }

  startListening() {
    this.beaconService.startScanning();
  }
  */
  presentInfoModal() {
    console.log(this.socketService.room);
    this.navController.present(Modal.create(InfoModal, {roomName: this.socketService.room.id}));
  }
}

