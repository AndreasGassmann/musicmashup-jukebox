import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LandingPage } from "../pages/landing/landing";
import { SocketService } from "../providers/socket-service";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(platform: Platform, public _socketService: SocketService) {
    platform.ready().then(() => {

      this._socketService.initialize();
      this._socketService.socketService.subscribe(event => {

      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
