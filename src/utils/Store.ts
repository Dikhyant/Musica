import create from "zustand";
import { IStore } from "./Interfaces";

export const useStore = create<IStore>( set => ({
    albums: [],
    songs: [],
    addAlbums: (albums) => set( state => ({
        albums: [...state.albums , ...albums]
    }) ),
    addSongs: (songs) => set( state => ({
        songs: [...state.songs, ...songs]
    }) )
}) )