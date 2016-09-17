import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';

declare var Scandit: any;

@Injectable()
export class BarcodeService {
    picker: any;

    constructor() {
        if (typeof Scandit !== 'undefined') {
            Scandit.License.setAppKey("ceKIGYn3xZidfbLaDQvWRxE90mlLjhxRqTj/8Q7dGko");
            var settings = new Scandit.ScanSettings();
            settings.setSymbologyEnabled(Scandit.Barcode.Symbology.QR, true);
            this.picker = new Scandit.BarcodePicker(settings);
        }
    }

    openScanner() {
            this.picker.show(function success(session) {
                    alert("Scanned " + session.newlyRecognizedCodes[0].symbology + " code: " + session.newlyRecognizedCodes[0].data);
                    // If you are using continuous scanning you might want to stop here. Please note that
                    // stopScanning is an asynchronous call because of the nature of how phonegap plugin works.
                    // This means that more codes might still be scanned after you call it. You should make use
                    // of {@link Scandit.ScanSettings.codeDuplicateFilter ScanSettings.codeDuplicateFilter} to
                    // minimize/eliminate such problems.
                    session.stopScanning();
                }, function manual(content) {
                    alert("Manual: " + content);
                },

                function failure(error) {
                    if (error != "Canceled") alert("Failed: " + error);
                });
            this.picker.startScanning();
    }
}
