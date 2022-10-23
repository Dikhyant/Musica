import create from "zustand";
import { Album, IStore, Song } from "./Interfaces";

export const useStore = create<IStore>( set => ({
    albums: new Map<string, Album>(),
    groupIdToSongsMap: new Map(),
    addAlbums: (albums: Album[]) => set( state => {
        let newMap: Map<string, Album> = new Map<string, Album>();
        state.albums.forEach((album: Album, id: string) => {
            newMap.set(id, album);
        })

        albums.forEach((album: Album) => {
            newMap.set(album.id, album);
        })
        
        return ({
            albums: newMap
        })
    } ),
    addSongsToGroup: (id, songs) => set( state => {
        let oldSongsList: Song[] = state.groupIdToSongsMap.get(id) as Song[];
        if(oldSongsList === undefined) {
            oldSongsList = [];
        }

        state.groupIdToSongsMap.set(id, [...oldSongsList, ...songs]);
        let newMap = new Map();
        state.groupIdToSongsMap.forEach((song: Song[], id: string) => {
            newMap.set(id, song);
        })

        return ({
            groupIdToSongsMap: newMap
        })
    } )
}) )