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

export interface IStore {
    albums: Map<string, Album>,
    groupIdToSongsMap: Map<string, Song[]>,
    addAlbums: (albums: Album[]) => void,
    addSongsToGroup: (id:string , songs: Song[]) => void,
}