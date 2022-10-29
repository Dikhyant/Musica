import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";

import { Playlist, MusicItem, Album } from "../utils/Interfaces";

import HeartIcon from "../icons/Heart_icon.svg";
import { routes } from "../utils/navigationData";
import { api, backendUrl } from "../utils/Networks";
import { useStore } from "../utils/Store";

const toHHMMSS = (seconds: number) => {
    var hours   = Math.floor(seconds / 3600)
    var minutes = Math.floor(seconds / 60) % 60
    seconds = seconds % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

type ChartCardProps = {
    playlist: Playlist
}

function ChartCard({playlist}:ChartCardProps) {
    const history = useHistory();
    return (
        <div className="chart-card" onClick={()=>{
            history.push("/" + routes.PLAYLIST + "/" + playlist.id);
        }} >
            <div className="thumbnail-wrapper">
                <img src={playlist.thumbnailUrl} alt="T" className="thumbnail" />
            </div>
            <div className="text-wrapper">
                <div className="playlist-name" >{playlist.name}</div>
                <div className="playlist-runtime">{toHHMMSS(playlist.runtime)}</div>
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
    const history = useHistory();
    const albumData = useStore(state => state.albums);
    let albums: Album[] = new Array<Album>();
    albumData.forEach((album: Album) => {
        albums.push(album);
    })

    if(albums.length === 0) return(<></>);

    let chartCards = [];

    for(let i = 1; i < ( 4 < albums.length ? 4 : albums.length); i++) {
        chartCards[i] = <ChartCard playlist={albums[i]} />
    }


    return(
        <div className="playlist-container" >
            <div className="currated-playlist" style={{backgroundImage: `url(${albums[0].thumbnailUrl})`}}
                onClick={()=>{
                    history.push("/" + routes.PLAYLIST + "/" + albums[0].id);
                }}
            >
                <div className="currated-playlist-text" >Currated playlist</div>
                <div className="playlist-name" >{albums[0].name}</div>
            </div>

            <div className="top-charts" >
                <div style={{color: "#EFEEE0", fontFamily: "Quicksand-Bold", fontSize: "24px"}} >Top Charts</div>
                <div className="chart-cards-container">
                    {chartCards}
                </div>
                
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
        <div className="music-card" onClick={handleOnClick} >
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

export default function HomePage() {
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
    return (
        <div className="homepage" >
            <PlaylistsRenderer />
            <HorizontallyLinedMusic heading="New releases." musicItems={albums} style={{marginTop: "6.129vh"}} />
            <HorizontallyLinedMusic heading="Popular in your area" musicItems={albums} style={{marginTop: "5.408vh"}} />
        </div>
    )
}