import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {WebSocketService} from "../../providers/websocket-service";

/*
  Generated class for the JoinPartyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/join-party/join-party.html',
})
export class JoinPartyPage {
  constructor(private nav: NavController, private webSocketService: WebSocketService) {

    this.webSocketService.connect(1);
    console.log('logged');

  }

  goToTabsPage() {
    this.nav.setRoot(TabsPage);
  }
}
