import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BarcodeService } from "../../providers/barcode-service";
import { HostPartyPage } from '../host-party/host-party';
import {Keyboard} from 'ionic-native';


@Component({
    templateUrl: 'build/pages/landing/landing.html',
})
export class LandingPage {

    id:string;

    constructor(private nav:NavController, private barcodeService:BarcodeService) {
        /*
         setTimeout(() => {
         this.beaconService.startScanning();
         }, 2000);
         */
    }

    openScanner() {
        this.barcodeService.openScanner();
    }

    goToHostPartyPage() {
        this.nav.push(HostPartyPage);
    }

    goToJoinPartyPage() {
        this.nav.setRoot(TabsPage, {
            id: this.id
        });
        Keyboard.close();
    }

    onKey($event) {
        /* check if Enter key */
        if ($event.which === 13) {
            this.goToJoinPartyPage();
        }
    }

}
