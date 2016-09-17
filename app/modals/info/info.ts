import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { QRCodeComponent } from 'ng2-qrcode';

@Component({
  templateUrl: 'build/modals/info/info.html',
  directives: [QRCodeComponent]
})
export class InfoModal {

  constructor(private viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
