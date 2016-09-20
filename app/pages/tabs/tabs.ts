import {Component} from '@angular/core'
import {HomePage} from '../home/home';
import {HistoryPage} from '../history/history';
import {ChatPage} from '../chat/chat';
import {SocketService} from "../../providers/socket-service";
import {NavParams} from "ionic-angular/index";
import {Events} from "ionic-angular/index";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private room: any;

  constructor(private socketService: SocketService, private navParams: NavParams, public events:Events) {
    // this tells the tabs component which Pages
    // should be each tab's root Page

    this.events.subscribe("roomUpdated", room => {
      this.room = this.socketService.room;
      this.tab1Root = HomePage;
      this.tab2Root = ChatPage;
      this.tab3Root = HistoryPage;
    });

    if(this.navParams.data.id){
      this.socketService.sendMessage("joinRoom", {id: Number(this.navParams.data.id)});
    }else{
      // TODO pass parameters
      this.socketService.sendMessage('createRoom', { title: "Title", hasBeacon: true });
    }

  }
}
