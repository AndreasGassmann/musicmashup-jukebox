import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';


@Injectable()
export class WebSocket {

    isReady:boolean;
    socket:WebSocket;

    constructor() {

        this.isReady = false;
        this.socket = new WebSocket("wss://musicmashup-jukebox.herokuapp.com/");

        let self = this;
        socket.onopen = function () {
            self.isReady = true;
        }

        socket.onclose = function () {
            self.isReady = false;
        }

        socket.onmessage = function (e) {
            console.log(e.data);
        }
    }

    sendMessage(message: string){
        socket.send("Test");
    }

    /*

     getEvents(): Promise<EventsResponse> {
     return this._authService.get('events');
     }

     getPosts(eventUuid): Promise<PostsResponse> {
     return this._authService.get('posts', '?event=' + eventUuid);
     }
     createPost(object) {
     return this._authService.post('posts', object);
     }
     likePost(object){
     return this._authService.post('likes', object);
     }

     unlikePost(object) {
     return this._authService.put('posts/' + object.uuid + '/unlike', null);
     }

     private getProfiles(): Promise<ProfilesResponse> {
     return this._authService.get('profile');
     }

     getProfile(): Profile{
     return this.profile;
     }

     updateProfile(object): Promise<Profile>{
     return new Promise((resolve, reject) => {
     this._authService.put('profile/' + this.profile.uuid, object).then((profile) => {
     this.profile = profile as Profile;
     resolve(this.profile);
     })
     });
     }

     uploadFile(file: Blob, onProgress: (n: number) => any): Promise<File> {
     return this._authService.uploadFile('upload/', file, onProgress);
     }
     */
}
