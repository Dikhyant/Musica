import { useEffect } from "react";
import "../styles/MyCollections.css";

import PlayIcon from "../icons/Play_icon.svg";

// import { albums } from "../localDb/LocalDb";
import { useStore } from "../utils/Store";
import { Album, MusicItem } from "../utils/Interfaces";
import axios from "axios";
import { api, backendUrl } from "../utils/Networks";
import { useHistory } from "react-router";
import { routes } from "../utils/navigationData";

type CardProps = {
    musicItem: MusicItem;
}

function Card(props: CardProps) {
    const songs = (useStore( state => state.groupIdToSongsMap )).get(props.musicItem.id);
    const addSongsToGroup = useStore(state => state.addSongsToGroup);

    const history = useHistory();

    function handleOnClick() {   
        history.push("/" + routes.PLAYLIST + "/" + props.musicItem.id);

        if(songs?.length !== 0) return;

        axios.get(backendUrl + "/" + api.SONGS + "?albumId=" + props.musicItem.id)
        .then( response => {
            console.log("Songs");
            console.log(response.data);
            addSongsToGroup( props.musicItem.id, response.data);
        } )
        .catch(error => {
            console.error(error);
        })
    }
    return (
        <div className="card" style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(15, 18, 19, 0.85)) , url(${props.musicItem.thumbnailUrl})`}}
            onClick={handleOnClick}
        >
            <div className="name" >{props.musicItem.name}</div>
            <div className="artist-name">{props.musicItem.artistName}</div>
            <img src={PlayIcon} alt="I" className="play-icon" />
        </div>
    )
}

export default function MyCollections(){
    const albumData = useStore(state => state.albums);
    const addAlbums = useStore(state => state.addAlbums);

    let albums: Album[] = new Array<Album>();
    albumData.forEach((album: Album) => {
        albums.push(album);
    })

    useEffect(()=>{
        if(albumData.values.length !== 0) return;

        axios.get(backendUrl + "/" + api.ALBUMS)
        .then(response => {
            addAlbums(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        // eslint-disable-next-line
    } , [])
    const cards = albums.map(item => (
        <Card musicItem={item} />
    ))
    return (
        <div className="my-collections">
            <div className="tab-btn-container">
                <div className="my-collection"><div>My collection</div></div>
                <div className="likes" ><div>Likes</div></div>
            </div>

            <div className="music-item-container">
                {cards}
            </div>
        </div>
    )
}
