import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SocketService} from "../../providers/socket-service";
import {MessageTimePipe} from "../../pipe/MessageTimePipe";

/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat/chat.html',
  pipes: [MessageTimePipe]
})
export class ChatPage implements OnInit, AfterViewChecked {
  @ViewChild('scroll-content') private myScrollContainer: ElementRef;
  room: any;
  message:string;
  socketId:string;
  userName: string;
  hasUsername: boolean;

  constructor(private nav: NavController, private socketService:SocketService) {
    this.room = this.socketService.room;
    this.socketId = this.socketService.socketId;
    this.userName = '';
    this.hasUsername = false;

    console.log(this.room.messages);
    console.log(this.socketId);
  }
  ngOnInit() { 
        console.log('on init');
        this.scrollToBottom();
  }

  ngAfterViewChecked() {
        console.log('after view checked');
        this.scrollToBottom();        
  }

  scrollToBottom(): void {
    console.log('scroll to bottom');
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }


  onKey($event){
    /* check if Enter key */
    if($event.which === 13){
      this.sendMessage();
    }
  }

  onKeyUsername($event){
     if($event.which === 13){
      this.setUsername();
    } 
  }

  setUsername() {
    if (this.userName.length != 0) {
      this.hasUsername = true;
    }
  }

  sendMessage(){
    if(this.message != "") {
      this.socketService.sendMessage("chatMessage", {
        id: 1,
        userId: this.socketService.socketId,
        userName: this.userName,
        message: this.message,
        timestamp: Date.now(),
        avatarUrl: '',
        isOwnMessage: true
      });
      this.message = "";
    }
  }
}
