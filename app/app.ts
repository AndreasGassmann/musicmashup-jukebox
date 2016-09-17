import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

declare var evothings: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {

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
      /*
        ble.isEnabled(
          function() {
            console.log("Bluetooth is enabled");
          },
          function() {
            console.log("Bluetooth is *not* enabled");
            alert("Bluetooth is *not* enabled");
          }
      );*/
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp)
