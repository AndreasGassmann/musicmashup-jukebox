import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import { LandingPage } from './pages/landing/landing';


declare var evothings: any;
declare var cordova: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = LandingPage;

    platform.ready().then(() => {
/*
      var uuid = '00000000-0000-0000-0000-000000000000';
      var identifier = 'advertisedBeacon';
      var minor = 2000;
      var major = 5;
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

      cordova.plugins.locationManager.isAdvertisingAvailable()
          .then(function(isSupported){

            if (isSupported) {
              console.log('supported!')
              cordova.plugins.locationManager.startAdvertising(beaconRegion)
                  .fail(console.error)
                  .done();
            } else {
              console.log("Advertising not supported");
            }
          })
          .fail(function(e) { console.error(e); })
          .done();
*/
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

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp)
