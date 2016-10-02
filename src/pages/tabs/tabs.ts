import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ChatPage } from "../chat/chat";
import { HistoryPage } from "../history/history";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = ChatPage;
  tab3Root: any = HistoryPage;

  constructor() {}
}
