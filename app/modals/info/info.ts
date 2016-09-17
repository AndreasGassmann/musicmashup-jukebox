import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { QRCodeComponent } from 'ng2-qrcode';
import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/modals/info/info.html',
  directives: [QRCodeComponent]
})
export class InfoModal {
  roomName: string;

  constructor(private viewCtrl: ViewController) {
    this.roomName = '1';
  }

  share() {
    SocialSharing.share("Add and vote for songs to make this party awesome!", "Join my party!", "", "http://google.ch/");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
