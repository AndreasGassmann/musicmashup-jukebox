import { Component, Input } from '@angular/core';

@Component({
  selector: 'now-playing-header',
  templateUrl: 'now-playing-header.html'
})

export class NowPlayingHeader {
  @Input() public pageTitle: string = "Test";

  constructor() {
    console.log(this.pageTitle);

    setTimeout(() => {
      console.log(this.pageTitle);
    }, 2000);
  }
}
