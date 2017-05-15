import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { YoutubeVideoResponse } from "../classes/YoutubeVideo";
import { YoutubeVideo } from "../classes/YoutubeVideo";

@Injectable()
export class YoutubeService {

    constructor(private http:Http) {}

    searchVideo(search: string): Promise<YoutubeVideoResponse>{
        return new Promise((resolve, reject) => {
            let params:URLSearchParams = new URLSearchParams();
            params.set('key', "AIzaSyCY6vunaNGae5ava4cmofVIq96Lre8YgOc");
            params.set('type', "video");
            //params.set('videoEmbeddable', "true");
            //params.set('videoSyndicated', "true");
            params.set('videoCategoryId', "10"); // only music videos
            params.set('maxResults', "30");
            params.set('part', "id");
            params.set('fields', "items(id(videoId))");
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
                        console.log(res);
                        for(var i = 0; i < res.items.length; i++) {
                            res.items[i].contentDetails.duration = '' + this.parseDuration(res.items[i].contentDetails.duration)
                        }
                        resolve(res);
                    }).catch(err => {
                        reject(err);
                    });

                }, err => {
                    reject(err);
                });
        });
    }

    getVideoDetails(idList: string): Promise<{ items: Array<YoutubeVideo> }> {
        return new Promise((resolve, reject) => {
            let params:URLSearchParams = new URLSearchParams();
            params.set('key', "AIzaSyCY6vunaNGae5ava4cmofVIq96Lre8YgOc");
            params.set('id', idList);
            params.set('part', "contentDetails,snippet");
            params.set('fields', "items(id,snippet(title,description,thumbnails(default),channelTitle),contentDetails(duration))");

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

    parseDuration(PT: string) {
        var durationInSec = 0;
        var matches = PT.match(/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)W)?(?:(\d*)D)?T(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/i);
        var parts = [
            { // years
                pos: 1,
                multiplier: 86400 * 365
            },
            { // months
                pos: 2,
                multiplier: 86400 * 30
            },
            { // weeks
                pos: 3,
                multiplier: 604800
            },
            { // days
                pos: 4,
                multiplier: 86400
            },
            { // hours
                pos: 5,
                multiplier: 3600
            },
            { // minutes
                pos: 6,
                multiplier: 60
            },
            { // seconds
                pos: 7,
                multiplier: 1
            }
        ];
        for (var i = 0; i < parts.length; i++) {
            if (typeof matches[parts[i].pos] != 'undefined') {
                durationInSec += parseInt(matches[parts[i].pos]) * parts[i].multiplier;
            }
        }
        return durationInSec;
    }

}
