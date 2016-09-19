import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {YoutubeVideoResponse, YoutubeVideoContentDetails} from "../classes/YoutubeVideo";


@Injectable()
export class YoutubeService {

    constructor(private http:Http) {

    }

    searchVideo(search: string): Promise<{ videos: YoutubeVideoResponse, details: YoutubeVideoContentDetails}>{
        return new Promise((resolve, reject) => {
            let params:URLSearchParams = new URLSearchParams();
            params.set('key', "AIzaSyCY6vunaNGae5ava4cmofVIq96Lre8YgOc");
            params.set('type', "video");
            params.set('videoEmbeddable', "true");
            params.set('videoSyndicated', "true");
            params.set('eventType', "completed"); //only include completed videos, no broadcasts/upcoming streams
            params.set('videoCategoryId', "10"); //only include completed videos, no broadcasts/upcoming streams
            params.set('maxResults', "30");
            params.set('part', "id,snippet");
            params.set('fields', "items(id,snippet(title,description,thumbnails(default),channelTitle))");
            params.set('q', search);
            this.http.get('https://www.googleapis.com/youtube/v3/search', {
                    search: params
                })
                .subscribe(data => {
                    let idList = '';

                    let items = data.json().items;

                    for(let i = 0; i < items.length; i++) {
                        idList += (!(idList.length === 0) ? ',' : '') + items[i].id.videoId;
                    }

                    this.getVideoDetails(idList).then(res => {
                        resolve({ videos: data.json(), details: res });
                    }).catch(err => {
                        reject(err);
                    });

                }, err => {
                    reject(err);
                });
        });
    }

    getVideoDetails(idList: string) {
        return new Promise((resolve, reject) => {
            let params:URLSearchParams = new URLSearchParams();
            params.set('key', "AIzaSyCY6vunaNGae5ava4cmofVIq96Lre8YgOc");
            params.set('id', idList);
            params.set('part', "contentDetails");

            this.http.get('https://www.googleapis.com/youtube/v3/videos', {
                    search: params
                })
                .subscribe(data => {
                    resolve(data.json());
                }, error => {
                    reject(error);
                });
        });
    }

}
