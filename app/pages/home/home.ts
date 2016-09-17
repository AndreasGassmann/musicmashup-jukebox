import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
declare var Scandit: any;



@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navController: NavController) {
/*
      Scandit.License.setAppKey("ceKIGYn3xZidfbLaDQvWRxE90mlLjhxRqTj/8Q7dGko");

      var settings = new Scandit.ScanSettings();
      settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
      settings.setSymbologyEnabled(Scandit.Barcode.Symbology.UPC12, true);
      settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, true);
// Instantiate the barcode picker by using the settings defined above.
      var picker = new Scandit.BarcodePicker(settings);

      console.log(picker);

      picker.show(function success(session) {
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
            alert("Failed: " + error);
          });
       picker.startScanning();
*/
  }
}
