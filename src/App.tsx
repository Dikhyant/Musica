import React from 'react';
import './App.css';

import MusicaLogo from "./Logo/musica_logo.svg";
import SearchIcon from "./icons/search_icon.svg";
import HomeIcon from "./icons/Home_icon.svg";
import PlaylistIcon from "./icons/playlist_icon.svg";
import RadioIcon from "./icons/radio_icon.svg";
import VideoIcon from "./icons/videos_icon.svg";
import ProfileIcon from "./icons/profile_icon.svg";
import LogoutIcon from "./icons/Logout_icon.svg";
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="app">
      <header>
        <div>
          <img src={MusicaLogo} alt="" className="musica-logo" />
        </div>
        <div>
          <img src={SearchIcon} alt="" className="search-icon" />
        </div>
        <div style={{color: "rgba(255,255,255,0.25)", textAlign: "center"}}>
          Search
        </div>
      </header>

      <div className="body-wrapper">
        <div className="nav-bar-wrapper">
          <div className="nav-bar" >
            <div>
              <img src={HomeIcon} alt="H" className="nav-bar-icon" />
            </div>
            <div>
              <img src={PlaylistIcon} alt="P" className="nav-bar-icon" />
            </div>
            <div>
              <img src={RadioIcon} alt="R" className="nav-bar-icon" />
            </div>
            <div>
              <img src={VideoIcon} alt="V" className="nav-bar-icon" />
            </div>
          </div>

          <div className="personal-bar">
            <div>
              <img src={ProfileIcon} alt="P" className="nav-bar-icon" />
            </div>
            <div>
              <img src={LogoutIcon} alt="L" className="nav-bar-icon" />
            </div>
          </div>
        </div>


        <div className="content-wrapper">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default App;
