import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SocketService } from "../../providers/socket-service";
import { InfoModal } from "../../modals/info/info";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {
  room: any;

  constructor(private socketService: SocketService, public modalCtrl: ModalController) {
    this.room = socketService.room;
  }

  presentInfoModal() {
    let modal = this.modalCtrl.create(InfoModal, {roomName: this.socketService.room.id});
    modal.present();
  }
}
