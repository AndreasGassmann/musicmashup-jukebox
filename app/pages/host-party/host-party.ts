import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {SocketService} from "../../providers/socket-service";
import {Keyboard} from 'ionic-native';
import {Focuser} from "../../components/focuser/focuser";
import {Events} from "ionic-angular/index";



/*
  Generated class for the HostPartyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/host-party/host-party.html',
  directives: [Focuser]
})
export class HostPartyPage {
  beacon: boolean;
  YTMusic: boolean;

  constructor(private nav: NavController, private socketService: SocketService, private events: Events) {
    this.beacon = true;
    this.YTMusic = true;
  }

  goToTabsPage() {
    this.socketService.isAdmin = true;
    Keyboard.close();
    this.nav.setRoot(TabsPage);
  }

  
  onKey($event){
      /* check if Enter key */
      if($event.which === 13){
        this.goToTabsPage();
      }
  }

}
