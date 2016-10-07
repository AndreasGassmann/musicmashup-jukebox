import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { InfoModal } from "../modals/info/info";

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HistoryPage } from "../pages/history/history";
import { LandingPage } from "../pages/landing/landing";
import { LoadingPage } from "../pages/loading/loading";
import { SearchPage } from "../pages/search/search";
import { ChatPage } from "../pages/chat/chat";

import { Focuser } from "../components/focuser/focuser";
import { NowPlayingHeader } from "../components/now-playing-header/now-playing-header";

import { MessageTimePipe } from "../pipe/MessageTimePipe";
import { VideoDurationPipe } from "../pipe/VideoDurationPipe";

import { BeaconService } from "../providers/beacon-service";
import { SocketService } from "../providers/socket-service";
import { YoutubeService } from "../providers/youtube-service";

@NgModule({
  declarations: [
    MyApp,
    InfoModal,
    HomePage,
    TabsPage,
    ChatPage,
    HistoryPage,
    LandingPage,
    LoadingPage,
    SearchPage,
    Focuser,
    NowPlayingHeader,
    //QRCodeComponent,
    MessageTimePipe,
    VideoDurationPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, { mode:'md', tabsPlacement: 'top' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoModal,
    HomePage,
    TabsPage,
    ChatPage,
    HistoryPage,
    LandingPage,
    LoadingPage,
    SearchPage
  ],
  providers: [
    //BeaconService,
    SocketService,
    YoutubeService
  ]
})
export class AppModule {}
