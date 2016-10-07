import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Keyboard, ZBar } from "ionic-native";
import { LoadingPage } from "../loading/loading";

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})

export class LandingPage {

    id: string;

    constructor(private nav:NavController) { }

    openScanner() {
       ZBar.scan({}).then(scan => {
          this.nav.setRoot(LoadingPage, {
            id: scan
          });
        }).catch(err => {
            alert(err);
        });
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
