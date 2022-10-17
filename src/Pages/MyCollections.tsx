import React from "react";
import "../styles/MyCollections.css";

import PlayIcon from "../icons/Play_icon.svg";

import { albums } from "../localDb/LocalDb";

type CardProps = {
    name: string;
    artistName?: string;
    thumbnailUrl: string;
}

function Card(props: CardProps) {
    console.log({backgroundImage: props.thumbnailUrl});
    return (
        <div className="card" style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(15, 18, 19, 0.85)) , url(${props.thumbnailUrl})`}} >
            <div className="name" >{props.name}</div>
            <div className="artist-name">{props.artistName}</div>
            <img src={PlayIcon} alt="I" className="play-icon" />
        </div>
    )
}

export default class MyCollections extends React.Component {
    render(): React.ReactNode {
        const cards = albums.map(item => (
            <Card name={item.name} artistName={item.artistName} thumbnailUrl={item.thumbnailUrl} />
        ))
        return (
            <div className="my-collections">
                <div className="tab-btn-container">
                    <div></div>
                    <div></div>
                </div>

                <div className="music-item-container">
                    {cards}
                    {cards}
                </div>
            </div>
        )
    }
}