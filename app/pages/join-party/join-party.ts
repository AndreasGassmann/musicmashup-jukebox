import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {SocketService} from "../../providers/socket-service";
import {BarcodeService} from "../../providers/barcode-service";

/*
  Generated class for the JoinPartyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/join-party/join-party.html',
})
export class JoinPartyPage {

  id:string;

  constructor(private nav: NavController, private socketService: SocketService, private barcodeService: BarcodeService) {
  }

  goToTabsPage() {
    this.socketService.sendMessage('joinRoom', { id: Number(this.id) });
  }

  onKey($event){
      /* check if Enter key */
      if($event.which === 13){
        this.goToTabsPage();
      }
  }
  openScanner() {
    this.barcodeService.openScanner();
  }
}
