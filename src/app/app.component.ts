import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from 'ionic-native';

import { LandingPage } from "../pages/landing/landing";
import { SocketService } from "../providers/socket-service";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(platform: Platform, public _socketService: SocketService) {
    platform.ready().then(() => {

      ThreeDeeTouch.isAvailable().then(isAvailable => console.log("3D Touch available? " + isAvailable));

      ThreeDeeTouch.watchForceTouches()
        .subscribe(
          (data: ThreeDeeTouchForceTouch) => {
            console.log("Force touch %" + data.force);
            console.log("Force touch timestamp: " + data.timestamp);
            console.log("Force touch x: " + data.x);
            console.log("Force touch y: " + data.y);
          }
        );

      let actions: Array<ThreeDeeTouchQuickAction> = [
        {
          type: 'checkin',
          title: 'Check in',
          subtitle: 'Quickly check in',
          iconType: 'Compose'
        },
        {
          type: 'share',
          title: 'Share',
          subtitle: 'Share like you care',
          iconType: 'Share'
        },
        {
          type: 'search',
          title: 'Search',
          iconType: 'Search'
        },
        {
          type: 'test',
          title: 'Show favorites',
          iconType: 'HeartTemplate'
        }
      ];
      ThreeDeeTouch.configureQuickActions(actions);

      ThreeDeeTouch.onHomeIconPressed().subscribe(
        (payload) => {
          // returns an object that is the button you presed
          console.log('Pressed the ${payload.title} button');
          console.log(payload.type);

        });

      this._socketService.initialize();
      this._socketService.socketService.subscribe(event => {

      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
