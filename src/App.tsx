import React from 'react';
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

import HomePage from './Pages/HomePage';
import MyCollections from './Pages/MyCollections';
import { routes } from './utils/navigationData';

type NavBtnProp = {
  route:string;
  icon:string;
  label:string;
  history?: any;
}

function NavBtn(props: NavBtnProp) {
  let isActive:boolean = props.history?.location.pathname === props.route;
  props.history?.listen((location: any) => {
    console.log({answer: location.pathname === props.route});
    isActive = location.pathname === props.route;
  })

  return (
    <Link to={props.route} className="nav-btn" style={{color: "rgba( 239, 238, 224, 0.25)"}} >
      <div><img src={props.icon} alt="I" className="nav-bar-icon" /></div>
      <div className="nav-btn-label" style={{color: `${isActive ? "#ffffff" : "#000000"}`}} >{props.label}</div>
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
        <div>
          <img src={MusicaLogo} alt="" className="musica-logo" />
        </div>
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
            <NavBtn icon={HomeIcon} label="Home" route={"/"+routes.HOME} />
            <NavBtn icon={PlaylistIcon} label="Home" route={"/"+routes.MY_COLLECTIONS} />
            <NavBtn icon={RadioIcon} label="Home" route="/" />
            <NavBtn icon={VideoIcon} label="Home" route="/" /> 
          </div>

          <div className="personal-bar">
          <NavBtn icon={ProfileIcon} label="Home" route="/" />
          <NavBtn icon={LogoutIcon} label="Home" route="/" />
          </div>
        </div>


        <div className="content-wrapper">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/my-collections" component={MyCollections} />
        </div>
      </div>

      <div className="nav-drawer-mobile">
        <div></div>
        <NavBtn icon={HomeIcon} label="Home" route={"/"+routes.HOME} history={history} />
        <NavBtn icon={PlaylistIcon} label="My collections" route={"/"+routes.MY_COLLECTIONS} history={history} />
        <NavBtn icon={RadioIcon} label="Radio" route="/" />
        <NavBtn icon={VideoIcon} label="Music videos" route="/" />
        <NavBtn icon={ProfileIcon} label="Profile" route="/" />
        <NavBtn icon={LogoutIcon} label="Log out" route="/" />
      </div>
    </div>
  );
}

export default App;
