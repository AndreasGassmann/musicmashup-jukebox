import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BarcodeService } from "../../providers/barcode-service";
import { HostPartyPage } from '../host-party/host-party';
import { JoinPartyPage } from '../join-party/join-party';
import {Focuser} from "../../components/focuser/focuser";
import {SocketService} from "../../providers/socket-service";
import {Keyboard} from 'ionic-native';
import {BeaconService} from "../../providers/beacon-service";


@Component({
  templateUrl: 'build/pages/landing/landing.html',
  providers: [BarcodeService, SocketService, BeaconService],
  directives: [Focuser]
})
export class LandingPage {

  id:string;

  constructor(private nav: NavController, private barcodeService: BarcodeService, private socketService: SocketService, private beaconService: BeaconService) {
    /*
    setTimeout(() => {
      this.beaconService.startScanning();
    }, 2000);
    */
  }

    openScanner() {
      this.barcodeService.openScanner();
    }
    goToTabsPage() {
      this.socketService.sendMessage('joinRoom', { id: Number(this.id) });
      Keyboard.close();
    }
  goToHostPartyPage() {
    this.nav.push(HostPartyPage);
  }
  goToJoinPartyPage() {
    this.nav.push(JoinPartyPage);
  }

}
