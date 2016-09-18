import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import {SocketService} from "./socket-service";

declare var Scandit: any;

@Injectable()
export class BarcodeService {
    picker: any;

    constructor(private socketService:SocketService) {
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
                    alert(session.newlyRecognizedCodes[0].data);
                    self.socketService.sendMessage('joinRoom', { id: Number(session.newlyRecognizedCodes[0].data) });
                }, function manual(content) {
                    alert("Manual: " + content);
                },
                function failure(error) {
                    if (error != "Canceled") alert("Failed: " + error);
                });
            this.picker.startScanning();
    }
}

