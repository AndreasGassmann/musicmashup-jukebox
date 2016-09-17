import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { IBeacon } from 'ionic-native';
import { Delegate, BeaconRegion } from "ionic-native/dist/index";
import { LocalNotifications } from 'ionic-native';
declare var cordova: any;

@Injectable()
export class BeaconService {
    delegate: Delegate;
    region: BeaconRegion;

    constructor() {

        if (typeof cordova !== 'undefined') {
            // Request permission to use location on iOS
            IBeacon.requestAlwaysAuthorization();
            // create a new delegate and register it with the native layer
            this.delegate = IBeacon.Delegate();

            this.createLocalNotification();
        }
    }

    createLocalNotification() {
        console.log("Creating local notification");
        LocalNotifications.schedule({
            title: "MusicMashup Room Detected!",
            text: "There is a MusicMashup room somewhere close to you. Come join it!",
            at: new Date(),
            sound: null
        });
    };

    startScanning() {
        // Subscribe to some of the delegate's event handlers
        /*
        this.delegate.didRangeBeaconsInRegion()
            .subscribe(
                data => console.log('didRangeBeaconsInRegion: ', data),
                error => console.error()
            );
        this.delegate.didStartMonitoringForRegion()
            .subscribe(
                data => console.log('didStartMonitoringForRegion: ', data),
                error => console.error()
            );*/
        this.delegate.didEnterRegion()
            .subscribe(
                data => {
                    console.log('didEnterRegion: ', data);
                }
            );

        this.delegate.didExitRegion()
            .subscribe(
                data => {
                    console.log('didExitRegion', data);
                }
            );
/*
        let beaconRegion = IBeacon.BeaconRegion('MusicMashupBeacon','00000000-0000-0000-0000-000000000000');

        IBeacon.startMonitoringForRegion(beaconRegion)
            .then(
                () => console.log('Native layer recieved the request to monitoring'),
                error => console.error('Native layer failed to begin monitoring: ', error)
            );*/
    }

    isBluetoothEnabled() {
        return IBeacon.isBluetoothEnabled();
    }

    createLocalBeacon() {

        this.region = IBeacon.BeaconRegion('MusicMashupBeacon', '00000000-0000-0000-0000-000000000000', 5, 2000, true)

        IBeacon.startAdvertising(this.region, 100).then(
            (data) => {
                console.log('Started advertising');
                console.log(data);
            }
        );
        /*
        var uuid = '00000000-0000-0000-0000-000000000000';
        var identifier = 'advertisedBeacon';
        var minor = 2000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        // The Delegate is optional
        var delegate = new cordova.plugins.locationManager.Delegate();

        // Event when advertising starts (there may be a short delay after the request)
        // The property 'region' provides details of the broadcasting Beacon
        delegate.peripheralManagerDidStartAdvertising = function(pluginResult) {
            console.log('peripheralManagerDidStartAdvertising: '+ JSON.stringify(pluginResult.region));
        };
        // Event when bluetooth transmission state changes
        // If 'state' is not set to BluetoothManagerStatePoweredOn when advertising cannot start
        delegate.peripheralManagerDidUpdateState = function(pluginResult) {
            console.log('peripheralManagerDidUpdateState: '+ pluginResult.state);
        };

        cordova.plugins.locationManager.setDelegate(delegate);


        // Verify the platform supports transmitting as a beacon
        cordova.plugins.locationManager.isAdvertisingAvailable()
            .then(function(isSupported){

                if (isSupported) {
                    console.log("Advertising working!");

                    cordova.plugins.locationManager.startAdvertising(beaconRegion)
                        .fail(console.error)
                        .done();

                } else {
                    console.log("Advertising not supported");
                }
            })
            .fail(function(e) { console.error(e); })
            .done();*/
    }

    deactivateLocalBeacon() {
        IBeacon.stopAdvertising(this.region).then(
            (data) => {
                console.log('Stopped advertising');
                console.log(data);
            }
        );

        /*
        cordova.plugins.locationManager.stopAdvertising()
            .fail(function(e) { console.error(e); })
            .done();*/
    }
}
