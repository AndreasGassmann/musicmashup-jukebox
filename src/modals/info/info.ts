import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import {SocketService} from "../../providers/socket-service";
import {LandingPage} from "../../pages/landing/landing";

@Component({
  templateUrl: 'info.html'
})
export class InfoModal {
  roomName: string;

  constructor(private viewCtrl: ViewController, private _navParams: NavParams, private socketService: SocketService, private navController: NavController) {
    this.roomName = this._navParams.get("roomName").toString();
  }

  share() {
    SocialSharing.share("Add and vote for songs to make this party awesome!", "Join my party!", "", "http://google.ch/");
  }

  leaveRoom() {
    this.viewCtrl.dismiss();
    this.socketService.sendPlainMessage('leaveRoom', () => {
      this.socketService.reset();
      this.navController.setRoot(LandingPage);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
