import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { LoadingPage } from "../loading/loading";

declare var cloudSky: any;

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})

export class LandingPage {

    id: string;

    constructor(private nav:NavController) { }

    openScanner() {
        cloudSky.zBar.scan({}, scan => {
          this.nav.setRoot(LoadingPage, {
            id: scan
          });
        }, err => {
            alert(err);
        })
    }

    goToHostPartyPage() {
        this.nav.push(LoadingPage);
    }

    goToJoinPartyPage() {
        this.nav.setRoot(LoadingPage, {
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
