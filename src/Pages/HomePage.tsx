import React from "react";
import "../styles/HomePage.css";

import { playlists } from "../localDb/LocalDb";
import { Playlist } from "../utils/Interfaces";

type ChartCardProps = {
    playlist: Playlist
}

function ChartCard({playlist}:ChartCardProps) {
    return (
        <div className="chart-card" >
            <div className="thumbnail-wrapper">
                <img src={playlist.thumbnailUrl} alt="T" className="thumbnail" />
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

function PlaylistsRenderer() {
    if(playlists.length === 0) return(<></>);
    let chartCards = [];
    for(let i = 1; i < ( 4 < playlists.length ? 4 : playlists.length); i++) {
        chartCards[i] = <ChartCard playlist={playlists[i]} />
    }
    return(
        <div className="playlist-container" >
            <div className="currated-playlist" style={{backgroundImage: `url(${playlists[0].thumbnailUrl})`}} >
            </div>

            <div className="top-charts" >
                <div style={{color: "#EFEEE0"}} >Top Charts</div>
                {chartCards}
            </div>
        </div>
    )
}

export default class HomePage extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="homepage" >
                <PlaylistsRenderer />
            </div>
        )
    }
}