import React from "react";
import "../styles/HomePage.css";

import { albums, playlists } from "../localDb/LocalDb";
import { Playlist, MusicItem } from "../utils/Interfaces";

import HeartIcon from "../icons/Heart_icon.svg";

type ChartCardProps = {
    playlist: Playlist
}

function ChartCard({playlist}:ChartCardProps) {
    return (
        <div className="chart-card" >
            <div className="thumbnail-wrapper">
                <img src={playlist.thumbnailUrl} alt="T" className="thumbnail" />
            </div>
            <div className="text-wrapper">
                <div className="playlist-name" >{playlist.name}</div>
                <div className="playlist-runtime">{playlist.runtime}</div>
            </div>
            <div className="heart-icon-wrapper" >
                <div className="heart-icon-outer-ring" >
                    <img src={HeartIcon} alt="H" className="heart-icon" />
                </div>
            </div>
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
                <div className="currated-playlist-text" >Currated playlist</div>
                <div className="playlist-name" >{playlists[0].name}</div>
            </div>

            <div className="top-charts" >
                <div style={{color: "#EFEEE0", fontFamily: "Quicksand-Bold", fontSize: "24px"}} >Top Charts</div>
                {chartCards}
            </div>
        </div>
    )
}

type HorizontallyLinedMusicProps = {
    heading: string;
    musicItems: MusicItem[];
    style?: React.CSSProperties;
    className?: string;
}

type CardProps = {
    musicItem: MusicItem
}

function Card(props: CardProps) {
    return (
        <div className="music-card" >
            <div>
                <img src={props.musicItem.thumbnailUrl} alt="T" className="thumbnail" />
            </div>
            <div className="name" >{props.musicItem.name}</div>
            <div className="artist-name" >{props.musicItem.artistName}</div>
        </div>
    )
}

function HorizontallyLinedMusic(props: HorizontallyLinedMusicProps) {
    const cards = props.musicItems.map((item) => (
    <div style={{display: "flex"}} >
        <Card musicItem={item} />
        <div className="gap-btw-cards" ></div>
    </div>
        ))

    let isMouseDown:boolean = false;
    let mouseDownRelativeX:number;
    let initialScrollLeft:number;

    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e)=>{
        console.log("mouse down")
        isMouseDown = true;
        e.preventDefault();
        mouseDownRelativeX = e.pageX - e.currentTarget.offsetLeft;
        initialScrollLeft = e.currentTarget.scrollLeft;
    };

    const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = e=>{
        isMouseDown = false;
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = e=>{
        isMouseDown = false;
    };

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e=>{
        if(!isMouseDown) return;
        const displacement:number = e.pageX - e.currentTarget.offsetLeft - mouseDownRelativeX;
        e.currentTarget.scrollLeft = initialScrollLeft - displacement;
        console.log(displacement)
    };


    return (
        <div className={`horizontally-lined-music ${props.className}`} style={props.style} >
            <div className="heading" >{props.heading}</div>
            <div className="music-wrapper" 
            
            onMouseDown={handleMouseDown} 
            
            onMouseUp={handleMouseUp}

            onMouseLeave={handleMouseLeave}

            onMouseMove={handleMouseMove}
            >
                {cards}
            </div>
        </div>
    )
}

export default class HomePage extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="homepage" >
                <PlaylistsRenderer />
                <HorizontallyLinedMusic heading="New releases." musicItems={albums} style={{marginTop: "6.129vh"}} />
                <HorizontallyLinedMusic heading="Popular in your area" musicItems={albums} style={{marginTop: "5.408vh"}} />
            </div>
        )
    }
}