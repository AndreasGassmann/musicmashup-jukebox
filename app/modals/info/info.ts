import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { QRCodeComponent } from 'ng2-qrcode';
import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/modals/info/info.html',
  directives: [QRCodeComponent]
})
export class InfoModal {
  roomName: string;

  constructor(private viewCtrl: ViewController, private _navParams: NavParams) {
    this.roomName = this._navParams.get("roomName").toString();
  }

  share() {
    SocialSharing.share("Add and vote for songs to make this party awesome!", "Join my party!", "", "http://google.ch/");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
