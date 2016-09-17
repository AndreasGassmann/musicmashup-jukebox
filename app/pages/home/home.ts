import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {InfoModal} from "../../modals/info/info";
import {SearchPage} from "../search/search";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navController: NavController) {
  }

  public goToSearchPage(){
    this.navController.push(SearchPage);
  }

  presentInfoModal() {
    this.navController.present(Modal.create(InfoModal, {roomName: '1'}));
  }
}

