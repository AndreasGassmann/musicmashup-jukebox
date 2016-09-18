import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import { LandingPage } from './pages/landing/landing';
import {BeaconService} from "./providers/beacon-service";
import {WebSocketService} from "./providers/websocket-service";
import {SocketService} from './providers/socket-service';

declare var evothings: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform, public socket: SocketService) {
    this.rootPage = LandingPage;

    platform.ready().then(() => {

      this.socket.initialize();
      this.socket.socketService.subscribe(event => {
      });

/*
      function foundBeacon(beacon)
      {
        // Note that beacon.url will be null until the URL
        // has been received. Also note that not all Eddystone
        // beacons broadcast URLs, they may send UIDs only.
        console.log('Found beacon: ' + beacon.url);
        console.log('Address: ' + beacon.address);
        console.log(JSON.stringify(beacon));
        console.log(beacon);
      }

      function scanError(error)
      {
        console.log('Eddystone scan error: ' + error)
      }

      evothings.eddystone.startScan(foundBeacon, scanError);
*/
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [BeaconService, SocketService, WebSocketService]);
