import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SocketService} from "../../providers/socket-service";

/*
  Generated class for the HistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {

  room:any;

  constructor(private nav: NavController, private socketService: SocketService) {
    this.room = socketService.room;

    console.log(this.room.history);
  }
}
