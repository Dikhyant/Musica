export interface MusicItem {
    id: string;
    name:string;
    thumbnailUrl:string;
    runtime:number; //seconds
    isLiked:boolean;
    artistName?:string;
}

export interface Song extends MusicItem {
    artistName:string;
}

export interface Album extends MusicItem {
    artistName:string;
}

export interface Playlist extends MusicItem {
    
}