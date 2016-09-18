import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BarcodeService } from "../../providers/barcode-service";
import { HostPartyPage } from '../host-party/host-party';
import { JoinPartyPage } from '../join-party/join-party';

/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/landing/landing.html',
  providers: [BarcodeService]
})
export class LandingPage {
  constructor(private nav: NavController, private barcodeService: BarcodeService) {

  }

    openScanner() {
      this.barcodeService.openScanner();
    }
    goToTabsPage() {
      this.nav.setRoot(TabsPage);
    }
  goToHostPartyPage() {
    this.nav.push(HostPartyPage);
  }
  goToJoinPartyPage() {
    this.nav.push(JoinPartyPage);
  }

}
