export interface MusicItem {
    name:string;
    thumbnailUrl:string;
    runtime:number;
    isLiked:boolean;
}

export interface Song extends MusicItem{
    artistName:string;
}

export interface Playlist extends MusicItem{
    artistName?:string;
}