import React from "react";
import { Album, PlayState, Song } from "../utils/Interfaces";

import "../styles/Playlist.css";

import PlayAllIcon from "../icons/play_all_icon.svg";
import AddToCollectionIcon from "../icons/add_to_collection_icon.svg";
import RedHeartIcon from "../icons/Red_Heart_icon.svg";
import WhiteOutlineHeartIcon from "../icons/White_Outline_Heart_icon.svg";
import ThreeDotsIcon from "../icons/Three_dots_icon.svg";

// import { songs } from "../localDb/LocalDb";
import { useParams } from "react-router";
import { useStore } from "../utils/Store";
import axios from "axios";
import { api, backendUrl } from "../utils/Networks";

const toHHMMSS = (seconds: number) => {
    var hours   = Math.floor(seconds / 3600)
    var minutes = Math.floor(seconds / 60) % 60
    seconds = seconds % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

type StrapComponentProps = {
    song: Song;
}

function StrapComponent(props: StrapComponentProps) {

    const changeCurrentSong = useStore( state => state.changeCurrentSong);
    const changePlayState = useStore( state => state.changePlayState);

    const handleOnClick:React.MouseEventHandler<HTMLDivElement> = (e) => {
        console.log({song: props.song});
        changePlayState(PlayState.STOPPED);
        changeCurrentSong({
            artistName: props.song.artistName,
            songUrl: props.song.songUrl,
            id: props.song.id,
            name: props.song.name,
            thumbnailUrl: props.song.thumbnailUrl,
            runtime: props.song.runtime,
            isLiked: props.song.isLiked
        });
    }
    return (
        <div className="strap" onClick={handleOnClick}>
            <img src={props.song.thumbnailUrl} alt="I" className="thumbnail" />
            <img src={WhiteOutlineHeartIcon} alt="I" className="heart_icon" />
            <div className="name">{props.song.name}</div>
            <div className="artist-name-wrapper">
                <div className="artist-name">{props.song.artistName}</div>
            </div>
            <div className="runtime">{toHHMMSS(props.song.runtime)}</div>
            <img src={ThreeDotsIcon} alt="I" className="three-dots-icon" />
        </div>
    )
}

export default function Playlist() {
    const { id } = useParams<{id: string}>();
    const album: Album = useStore(state => state.albums.get(id)) as Album;
    const groupIdToSongsMap = useStore( state => state.groupIdToSongsMap );
    const songs = groupIdToSongsMap.get(id) as Song[];
    const addSongsToGroup = useStore(state => state.addSongsToGroup);

    var songsComponents: JSX.Element[] = [];
    if(songs !== undefined && songs.length !== 0) {
        songsComponents = songs.map((item)=>(<StrapComponent song={item}  />))
    } else {
        axios.get(backendUrl + "/" + api.SONGS + "?albumId=" + id)
        .then( response => {
            console.log("Songs");
            console.log(response.data);
            addSongsToGroup( id, response.data);
        } )
        .catch(error => {
            console.error(error);
        })
    }

    let albumThumbnailUrl:string = "";
    let albumName:string = "";
    if(album !== undefined) {
        albumThumbnailUrl = album.thumbnailUrl;
        albumName = album.name;
    }

    // console.log({albumThumbnailUrl: albumThumbnailUrl});

    return (
        <div className="playlist" >
            <div className="lead-info-container">
                <img src={albumThumbnailUrl} alt="I" className="lead-image" />

                <div className="other-things">
                    <div className="name">{albumName}</div>
                    <div className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</div>
                    <div className="btns-container">
                        <div className="play-all-btn">
                            <img src={PlayAllIcon} alt="I" className="play-all-icon" />
                            <div className="play-all-text">Play all</div>
                        </div>

                        <div className="add-to-collection-btn">
                            <img src={AddToCollectionIcon} alt="I" className="icon" />
                            <div className="text">Add to collection</div>
                        </div>
                        <div className="like-btn">
                            <img src={RedHeartIcon} alt="I" className="icon" />
                            <div className="like-label" >Like</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="song-item-container" >
                {songsComponents}
            </div>

            <div className="background" style={{backgroundImage: ` linear-gradient(to bottom, rgba( 29, 33, 35, 0.8) , rgba( 29, 33, 35, 1)) , url(${albumThumbnailUrl})`}} ></div>
        </div>
    )
}