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
    songUrl: string;
}

export interface Album extends MusicItem {
    artistName:string;
}

export interface Playlist extends MusicItem {
    
}

export enum PlayState {
    PLAYING,
    PAUSED,
    STOPPED
}

export interface IStore {
    currentSong: Song,
    playState: PlayState,
    currentVolume: number,
    albums: Map<string, Album>,
    groupIdToSongsMap: Map<string, Song[]>,
    addAlbums: (albums: Album[]) => void,
    addSongsToGroup: (id:string , songs: Song[]) => void,
    changePlayState: (newPlayState: PlayState) => void,
    changeVolume: (newVolume: number) => void,
    changeCurrentSong: (newSong: Song) => void,
}