import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BarcodeService } from "../../providers/barcode-service";
import { HostPartyPage } from '../host-party/host-party';
import { JoinPartyPage } from '../join-party/join-party';
import {BeaconService} from "../../providers/beacon-service";

@Component({
  templateUrl: 'build/pages/landing/landing.html',
  providers: [BarcodeService]
})
export class LandingPage {
  constructor(private nav: NavController, private barcodeService: BarcodeService, private beaconService: BeaconService) {
    setTimeout(() => {
      this.beaconService.startScanning();
    }, 2000);
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
