
export class YoutubeVideo {
    id:{
        kind:string;
        videoId:string;
    };
    snippet:{
        channelTitle:string;
        description:string;
        thumbnails:{
            "default":{
                height:number;
                url:string;
                width:number;
            }
        };
        title:string;
    }
}

export class YoutubeVideoResponse {
    items: YoutubeVideo[];
}