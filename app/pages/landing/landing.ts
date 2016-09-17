import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BarcodeService } from "../../providers/barcode-service";


/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/landing/landing.html',
  providers: [BarcodeService]
})
export class LandingPage {
  constructor(private nav: NavController, private _barcodeService: BarcodeService) {

  }

    openScanner() {
      this._barcodeService.openScanner();
    }
    goToTabsPage() {
      this.nav.setRoot(TabsPage);
    }

}
