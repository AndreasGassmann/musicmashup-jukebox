import {Component} from '@angular/core'
import {HomePage} from '../home/home';
import {HistoryPage} from '../history/history';
import {ChatPage} from '../chat/chat';
import {WebSocketService} from "../../providers/websocket-service";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor(private webSocketService: WebSocketService) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = ChatPage;
    this.tab3Root = HistoryPage;

  }
}
