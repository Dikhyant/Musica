import React from "react";

import "../styles/Playlist.css";

import PlayAllIcon from "../icons/play_all_icon.svg";
import AddToCollectionIcon from "../icons/add_to_collection_icon.svg";

export default class Playlist extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="playlist" >
                <div className="lead-info-container">
                    <img src="https://ilogo.in/ajax/thumbnail.php?id=106094&width=540&height=540&face=front&force=1" alt="I" className="lead-image" />

                    <div className="other-things">
                        <div className="name">Tomorrow’s tunes</div>
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
                            <div className="like-btn"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}