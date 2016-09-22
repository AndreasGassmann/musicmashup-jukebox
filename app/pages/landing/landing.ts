import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HostPartyPage } from '../host-party/host-party';
import { Keyboard } from 'ionic-native';

declare var cloudSky: any;

@Component({
    templateUrl: 'build/pages/landing/landing.html',
})
export class LandingPage {

    id:string;

    constructor(private nav:NavController) {
        /*
         setTimeout(() => {
         this.beaconService.startScanning();
         }, 2000);
         */
    }

    openScanner() {
        cloudSky.zBar.scan({}, scan => {
            alert(scan);
        }, err => {
            alert(err);
        })
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
