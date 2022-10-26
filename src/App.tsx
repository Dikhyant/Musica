import React , { useEffect, useRef, useState } from 'react';
import { Route , Link , useHistory, useParams } from "react-router-dom";
import './App.css';

import MusicaLogo from "./Logo/musica_logo.svg";
import SearchIcon from "./icons/search_icon.svg";
import HomeIcon from "./icons/Home_icon.svg";
import PlaylistIcon from "./icons/playlist_icon.svg";
import RadioIcon from "./icons/radio_icon.svg";
import VideoIcon from "./icons/videos_icon.svg";
import ProfileIcon from "./icons/profile_icon.svg";
import LogoutIcon from "./icons/Logout_icon.svg";
import HamburgerIcon from "./icons/hamburger_icon.svg";
import SuffleIcon from "./icons/shuffle_icon.svg";
import PreviousIcon from "./icons/previous_icon.svg";
import PlayControllerIcon from "./icons/play_controller_icon.svg";
import PauseIcon from "./icons/Pause_icon.svg";
import NextIcon from "./icons/next_icon.svg";
import RepeateIcon from "./icons/repeate_icon.svg";
import VolumeHighIcon from "./icons/volume_high_icon.svg";

import HomeActiveIcon from "./icons/Home_active_icon.svg";
import PlaylistActiveIcon from "./icons/playlist_active_icon.svg";
import RadioActiveIcon from "./icons/radio_active_icon.svg";
import VideoActiveIcon from "./icons/videos_active_icon.svg";

import HomePage from './Pages/HomePage';
import MyCollections from './Pages/MyCollections';
import { routeParams, routes } from './utils/navigationData';
import Playlist from './Pages/Playlist';
import { useStore } from './utils/Store';
import axios from 'axios';
import { api, backendUrl } from './utils/Networks';
import { PlayState } from './utils/Interfaces';

type NavBtnProp = {
  route:string;
  icon:string;
  activeStateIcon?: string;
  label:string;
  history?: any;
}

type NavBtnState = {
  isActive: boolean;
}

function NavBtn(props: NavBtnProp) {
  const [state, setState] = useState<NavBtnState>({isActive: props.history?.location.pathname === props.route});

  props.history?.listen((location: any) => {
    // console.log({answer: location.pathname === props.route});
    setState({
      isActive: location.pathname === props.route
    })
  })

  const icon:string = state.isActive ? (props.activeStateIcon !== undefined) ? props.activeStateIcon : props.icon : props.icon;

  return (
    <Link to={props.route} className="nav-btn" style={{color: "rgba( 239, 238, 224, 0.25)"}} >
      <div><img src={ icon } alt="I" className="nav-bar-icon" /></div>
      <div className="nav-btn-label" style={{color: `${state.isActive ? "#ffffff" : "rgba( 239, 238, 224, 0.25)"}`}} >{props.label}</div>
    </Link>
  )
}


function App() {
  const history = useHistory();

  const seekRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const volumeControllerRef = useRef<HTMLInputElement>(null);

  const currentSong = useStore( state => state.currentSong);
  const currentVolume = useStore( state => state.currentVolume);
  const changeVolume = useStore( state => state.changeVolume);
  const playState = useStore( state => state.playState);
  const changePlayState = useStore( state => state.changePlayState );
  const isNavBarOpen = useStore( state => state.isNavBarOpen);
  const changeIsNavBarOpen = useStore( state => state.changeIsNavBarOpen);

  useEffect(()=>{
    console.log("start loading");
    audioPlayerRef.current?.load();
  }, [currentSong])

  if( audioPlayerRef.current !== null) {
    audioPlayerRef.current.volume = (currentVolume >= 0 ? currentVolume <= 1 ? currentVolume : 1 : 0);
  }

  if(playState === PlayState.PLAYING) {
    console.log("play");
    audioPlayerRef.current?.play();
  }

  if(playState === PlayState.PAUSED) {
    audioPlayerRef.current?.pause();
  }

  setInterval(()=>{
    if(audioPlayerRef !== null && audioPlayerRef.current !== null && seekRef !== null && seekRef.current !== null) {
      seekRef.current.value = ( audioPlayerRef.current?.currentTime / audioPlayerRef.current?.duration * 100 ).toString();
    }
  } , 1000);

  

  function getIconForPlayState(playState: PlayState):string {
    if(playState === PlayState.PAUSED || playState === PlayState.STOPPED) return PlayControllerIcon;

    return PauseIcon;
  }

  const handleOnChangeSeek:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log({value: e.currentTarget.value});
    console.log({duration: audioPlayerRef.current?.duration});
    if(audioPlayerRef !== null && audioPlayerRef.current !== null)
      audioPlayerRef.current.currentTime = parseFloat(e.currentTarget.value) / 100.0  * audioPlayerRef.current.duration;
  }

  const handleOnChangeVolume:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    changeVolume(parseFloat(e.currentTarget.value));
  }

  return (
    <div className="app">
      <header>
          <img src={MusicaLogo} alt="" className="musica-logo" />
        <div className="search-icon-wrapper">
          <img src={SearchIcon} alt="" className="search-icon" />
        </div>
        <div className="search-text" style={{color: "rgba(255,255,255,0.25)", textAlign: "center", marginLeft: "1.56vw", fontSize: "14px"}}>
          Search
        </div>
        <div className="hamburger-icon-wrapper" >
          <img src={HamburgerIcon} alt="H" className="hamburger-icon" onClick={()=>{
            changeIsNavBarOpen(!isNavBarOpen);
          }} />
        </div>
      </header>

      <div className="body-wrapper">
        <div className={`nav-bar-wrapper ${isNavBarOpen ? "nav-bar-wrapper-openned" : "" }`}>
          <div className="nav-bar" >
            <NavBtn icon={HomeIcon} activeStateIcon={HomeActiveIcon} label="Home" route={"/"+routes.HOME} history={history} />
            <NavBtn icon={PlaylistIcon} activeStateIcon={PlaylistActiveIcon} label="My collections" route={"/"+routes.MY_COLLECTIONS} history={history} />
            <NavBtn icon={RadioIcon} activeStateIcon={RadioActiveIcon} label="Radio" route="/" />
            <NavBtn icon={VideoIcon} activeStateIcon={VideoActiveIcon} label="Music videos" route="/" /> 
          </div>

          <div className="personal-bar">
          <NavBtn icon={ProfileIcon} label="Profile" route="/" />
          <NavBtn icon={LogoutIcon} label="Log out" route="/" />
          </div>
        </div>


        <div className="content-wrapper">
            <Route exact path={"/" + routes.HOME} component={HomePage} />
            <Route exact path={"/" + routes.MY_COLLECTIONS} component={MyCollections} />
            <Route exact path={"/" + routes.PLAYLIST + "/:" + routeParams.ID} component={Playlist} />
        </div>
      </div>

      

      <div  className="music-player" >
        <div className="thumbnail-and-label-container" >
          <img src={currentSong.thumbnailUrl} alt="I" className="thumbnail" />
          <div className="label-container">
            <div className="name">{currentSong.name}</div>
            <div className="artist-name">{currentSong.artistName}</div>
          </div>
        </div>

        <div className="controller-container" >
          <div className="btn-container">
            <img src={SuffleIcon} alt="I" className="suffle-icon icon" />
            <img src={PreviousIcon} alt="I" className="previous-icon icon" />
            <img src={ getIconForPlayState(playState) } alt="I" className="play-controller-icon" onClick={()=>{
              if(playState === PlayState.PLAYING) {
                changePlayState(PlayState.PAUSED);
                return;
              }
              changePlayState(PlayState.PLAYING);
            }} />
            <img src={NextIcon} alt="I" className="next-icon icon" />
            <img src={RepeateIcon} alt="I" className="repeate-icon icon" />
          </div>

          <div className="seek-container">
            <input ref={seekRef} type="range" className="seek" onChange={handleOnChangeSeek} min={0} max={100} step={0.001} />
            
          </div>
        </div>

        <div className="volume-container" >
          <img src={VolumeHighIcon} alt="I" className="volume-icon" />
          <input ref={volumeControllerRef} type="range" className="volume-controller" onChange={handleOnChangeVolume} value={currentVolume} min={0} max={1} step={0.001} />
        </div>

        <audio id="audio-player" ref={audioPlayerRef} onLoadedData={()=>{
          console.log("loaded");
          changePlayState(PlayState.PLAYING);
        }} onEnded={()=>{
          changePlayState(PlayState.STOPPED);
        }}>
          <source src={currentSong.songUrl} />
        </audio>
      </div>

      <div className="background"></div>
    </div>
  );
}

export default App;
