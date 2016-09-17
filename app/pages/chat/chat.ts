import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat/chat.html',
})
export class ChatPage {
  messages: any;
  events: any;

  constructor(private nav: NavController) {
    this.messages = [
      {
        id: 1,
        userName: 'Andy',
        message: 'Hi',
        timestamp: Date.now(),
        avatarUrl: '',
        isOwnMessage: true
      },
      {
        id: 2,
        userName: 'Lukas',
        message: 'Super siite',
        timestamp: Date.now(),
        avatarUrl: '',
        isOwnMessage: false
      }
    ];

    this.events = [
      {
        userName: "Pascal",
        action: 'just added',
        videoName: "Kygo - Stay"
      }
    ]
  }
}
