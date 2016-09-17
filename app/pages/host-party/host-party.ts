import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';



/*
  Generated class for the HostPartyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/host-party/host-party.html',
})
export class HostPartyPage {
  constructor(private nav: NavController) {}


  goToTabsPage() {
    this.nav.setRoot(TabsPage);
  }
}
