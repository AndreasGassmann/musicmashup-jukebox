import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';

import { SocketService } from "../../providers/socket-service";

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})

export class LoadingPage {

  constructor(private socketService: SocketService, private navParams: NavParams, public navCtrl: NavController, private events: Events) {
    this.events.subscribe("roomUpdated", room => {
      this.navCtrl.setRoot(TabsPage);
    });

    if (this.navParams.data.id) {
      this.socketService.sendMessage("joinRoom", {id: Number(this.navParams.data.id)});
    } else {
      // TODO pass parameters
      this.socketService.sendMessage('createRoom', { title: "Title", hasBeacon: true });
    }
  }

  ionViewDidLoad() {
    console.log('Hello Loading Page');
  }

}
