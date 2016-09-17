import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {InfoModal} from "../../modals/info/info";
import {SearchPage} from "../search/search";
import {BeaconService} from "../../providers/beacon-service";

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [BeaconService]
})
export class HomePage {
  constructor(private navController: NavController, private beaconService: BeaconService) {
  }

  public goToSearchPage(){
    this.navController.push(SearchPage);
  }

  startAdvertising() {
    this.beaconService.createLocalBeacon();
  }

  startListening() {
    this.beaconService.startScanning();
  }

  presentInfoModal() {
    this.navController.present(Modal.create(InfoModal, {roomName: '1'}));
  }
}

