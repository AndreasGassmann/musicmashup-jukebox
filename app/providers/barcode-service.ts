import { Injectable, forwardRef, Inject } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import {App} from "ionic-angular/index";
import {TabsPage} from "../pages/tabs/tabs";

declare var Scandit: any;

@Injectable()
export class BarcodeService {
    picker: any;

    constructor(private app: App) {
        if (typeof Scandit !== 'undefined') {
            Scandit.License.setAppKey("ceKIGYn3xZidfbLaDQvWRxE90mlLjhxRqTj/8Q7dGko");
            var settings = new Scandit.ScanSettings();
            settings.setSymbologyEnabled(Scandit.Barcode.Symbology.QR, true);
            this.picker = new Scandit.BarcodePicker(settings);
        }
    }

    openScanner() {
        let self = this;
            this.picker.show(function success(session) {
                    session.stopScanning();
                self.app.getActiveNav().setRoot(TabsPage, {id: new Number(session.newlyRecognizedCodes[0].data)});
                }, function manual(content) {
                    alert("Manual: " + content);
                },
                function failure(error) {
                    if (error != "Canceled") alert("Failed: " + error);
                });
            this.picker.startScanning();
    }
}

