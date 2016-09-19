
export class YoutubeVideo {
    id: string;
    contentDetails: YoutubeVideoContentDetails;
    snippet: {
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

export class YoutubeVideoContentDetails {
    caption: string;
    definition: string;
    dimension: string;
    duration: string;
    licensedContent: boolean;
    projection: string;
    regionRestriction: {
        blocked: Array<string>;
    };
    etag: string;
    id: string;
    kind: string;
}