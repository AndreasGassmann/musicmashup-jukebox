import { Component } from '@angular/core';
import { AlertController, ViewController, NavParams, NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import { SocketService } from "../../providers/socket-service";

@Component({
  templateUrl: 'info.html'
})
export class InfoModal {
  roomName: string;

  constructor(private viewCtrl: ViewController, private _navParams: NavParams, public alertCtrl: AlertController) {
    this.roomName = this._navParams.get("roomName").toString();
  }

  share() {
    SocialSharing.share("Add and vote for songs to make this party awesome!", "Join my party!", "", "http://google.ch/");
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Leave room',
      message: 'Do you really want to leave this room?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.leaveRoom();
          }
        }
      ]
    });
    confirm.present();
  }

  leaveRoom() {
    console.log('Leaving room');
    // TODO: Let server know we are leaving
    window.location.reload();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
