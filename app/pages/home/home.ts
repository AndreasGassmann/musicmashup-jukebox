import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SearchPage} from "../search/search";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navController: NavController) {
  }

  public goToSearchPage(){
    this.navController.push(SearchPage);
  }
}

