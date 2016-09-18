import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SocketService} from "../../providers/socket-service";

/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat/chat.html',
})
export class ChatPage {
  room: any;
  message:string;
  socketId:string;

  constructor(private nav: NavController, private socketService:SocketService) {
    this.room = this.socketService.room;
    this.socketId = this.socketService.socketId;

    console.log(this.room.messages);
    console.log(this.socketId);
  }

  sendMessage(){
    if(this.message != "") {
      this.socketService.sendMessage("chatMessage", {
        id: 1,
        userId: this.socketService.socketId,
        userName: 'Andy',
        message: this.message,
        timestamp: Date.now(),
        avatarUrl: '',
        isOwnMessage: true
      });
      this.message = "";
    }
  }
}
