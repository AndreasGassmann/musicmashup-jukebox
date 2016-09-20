import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import {SocketService} from "../../providers/socket-service";
import {InfoModal} from "../../modals/info/info";

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

  constructor(private navController: NavController, private socketService: SocketService) {
    this.room = socketService.room;
  }

  presentInfoModal() {
    this.navController.present(Modal.create(InfoModal, {roomName: this.socketService.room.id}));
  }
}
