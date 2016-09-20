import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import {SocketService} from "../../providers/socket-service";
import {MessageTimePipe} from "../../pipe/MessageTimePipe";
import {InfoModal} from "../../modals/info/info";
import {Content} from "ionic-angular/index";
import {Focuser} from "../../components/focuser/focuser";

/*
 Generated class for the ChatPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/chat/chat.html',
    pipes: [MessageTimePipe],
    directives: [Focuser]
})
export class ChatPage implements OnInit, AfterViewChecked {
    @ViewChild(Content) content:Content;

    room:any;
    message:string;
    socketId:string;
    userName:string;
    hasUsername:boolean;

    constructor(private navController:NavController, private socketService:SocketService) {
        this.room = this.socketService.room;
        this.socketId = this.socketService.socketId;
        this.userName = '';
        this.hasUsername = false;
    }

    ngOnInit() {
        try {
            this.content.scrollToBottom();
        } catch (e) {

        }
    }

    ngAfterViewChecked() {
        try {
            this.content.scrollToBottom();
        } catch (e) {

        }
    }

    onKey($event) {
        /* check if Enter key */
        if ($event.which === 13) {
            this.sendMessage();
        }
    }

    onKeyUsername($event) {
        if ($event.which === 13) {
            this.setUsername();
        }
    }

    setUsername() {
        if (this.userName.length != 0) {
            this.hasUsername = true;
        }
    }

    sendMessage() {
        if (this.message != "") {
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

    presentInfoModal() {
        console.log(this.socketService.room);
        this.navController.present(Modal.create(InfoModal, {roomName: this.socketService.room.id}));
    }
}
