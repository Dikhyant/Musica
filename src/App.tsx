import React , { useState } from 'react';
import { Route , Link , useHistory } from "react-router-dom";
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

import HomeActiveIcon from "./icons/Home_active_icon.svg";
import PlaylistActiveIcon from "./icons/playlist_active_icon.svg";
import RadioActiveIcon from "./icons/radio_active_icon.svg";
import VideoActiveIcon from "./icons/videos_active_icon.svg";

import HomePage from './Pages/HomePage';
import MyCollections from './Pages/MyCollections';
import { routes } from './utils/navigationData';
import Playlist from './Pages/Playlist';

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
  history.listen((location) => {
    console.log({location: location});
  })
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
          <img src={HamburgerIcon} alt="H" className="hamburger-icon" />
        </div>
      </header>

      <div className="body-wrapper">
        <div className="nav-bar-wrapper">
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
            <Route exact path={"/" + routes.PLAYLIST + "/:id"} component={Playlist} />
        </div>
      </div>

      <div className="background"></div>
    </div>
  );
}

export default App;
