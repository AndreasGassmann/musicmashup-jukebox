import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { IBeacon } from 'ionic-native';
import { Delegate, BeaconRegion } from "ionic-native/dist/index";
import { LocalNotifications } from 'ionic-native';
import {SocketService} from "./socket-service";
declare var cordova: any;

@Injectable()
export class BeaconService {
    delegate: Delegate;
    region: BeaconRegion;
    beaconRegion: BeaconRegion;

    constructor(private socketService: SocketService) {

        if (typeof cordova !== 'undefined') {
            // Request permission to use location on iOS
            IBeacon.requestAlwaysAuthorization();
            // create a new delegate and register it with the native layer
            this.delegate = IBeacon.Delegate();

            this.beaconRegion = IBeacon.BeaconRegion('MusicMashupBeacon','00000000-0000-0000-0000-000000000000');
        }

    }

    createLocalNotification(roomId) {
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

        this.delegate.didRangeBeaconsInRegion()
            .subscribe(
                data => {
                    console.log('didRangeBeaconsInRegion: ', data);
                    console.log('Has Beacons:', data.beacons);
                },
                error => console.error()
            );

        this.delegate.didStartMonitoringForRegion()
            .subscribe(
                data => console.log('didStartMonitoringForRegion: ', data),
                error => console.error()
            );

        this.delegate.didEnterRegion()
            .subscribe(
                data => {
                    console.log('didEnterRegion: ', data);
                    if (data.beacons) {
                        this.createLocalNotification(data.beacons[0].minor);
                        this.socketService.sendMessage('joinRoom', { id: data.beacons[0].minor });
                    }
                }
            );

        this.delegate.didExitRegion()
            .subscribe(
                data => {
                    console.log('didExitRegion', data);
                }
            );

        IBeacon.startMonitoringForRegion(this.beaconRegion)
            .then(
                () => console.log('Native layer recieved the request to monitoring'),
                error => console.error('Native layer failed to begin monitoring: ', error)
            );

        IBeacon.startRangingBeaconsInRegion(this.beaconRegion)
            .then(
                () => console.log('StartRangingBeaconsInRegions'),
                error => console.error('StartRangingBeaconsInRegion', error)
            );
    }

    stopMonitoring() {
        return IBeacon.stopMonitoringForRegion(this.beaconRegion);
    }

    isBluetoothEnabled() {
        return IBeacon.isBluetoothEnabled();
    }

    createLocalBeacon(roomId) {

        this.region = IBeacon.BeaconRegion('MusicMashupBeacon', '00000000-0000-0000-0000-000000000000', 0, roomId, true);

        IBeacon.startAdvertising(this.region, 100).then(
            (data) => {
                console.log('Started advertising');
                console.log(data);
            }
        );
    }

    deactivateLocalBeacon() {
        IBeacon.stopAdvertising(this.region).then(
            (data) => {
                console.log('Stopped advertising');
                console.log(data);
            }
        );
    }
}
