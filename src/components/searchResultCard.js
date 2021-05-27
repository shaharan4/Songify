import React from 'react';
import "./overlay.css";
import PlayMusicOverlay from './playMusicOverlay';


class SearchResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.isPlaying = false;
        this.audio = null;
    }
    // setSelectedSong = () => {
    //     let song = {
    //         song_name: this.props.track.name,
    //         song_author: this.props.track.artists[0].name,
    //         song_photo: this.props.track.album.images[0].url,
    //         song_length: this.props.track.duration_ms / 1000,
    //         song_url: this.props.track.preview_url
    //     }
    //     this.props.setSelectedSong(song);
    //     this.showPlayMusicOverlay();
    // }
    // showPlayMusicOverlay = () => {
    //     window.document.getElementById("play_music_overlay_container").style.display = "block";
    // }
    play = () => {
        if (!this.isPlaying) {
            let url = this.props.track.preview_url;
            this.audio = new Audio(url);
            this.audio.play();
            this.isPlaying = true;
        }
        else {
            this.audio.pause();
            this.isPlaying = false;
        }
    }
    addToMixtape = () => {
        // let song = {
        //     song_name: this.props.track.name,
        //     song_author: this.props.track.artists[0].name,
        //     song_photo: this.props.track.album.images[0].url,
        //     song_length: this.props.track.duration_ms / 1000,
        //     song_url: this.props.track.preview_url
        // }
        this.props.addToMixtape(this.props.track);
    }
    setSelectedSong = () => {
        this.props.setSelectedSong(this.props.track);
        this.props.setPlayMusicOverlay(true);
    }
    renderPlayOrAdd = () => {
        if (this.props.isFromMainPage) {
            return(
                <td>
                    <div className="search_result_card_play" onClick={this.setSelectedSong}>
                        <i class="fa fa-play"></i>
                    </div>
                </td>
            )
            
        }
        else {
            return(
                <td>
                    <div className="search_result_card_add" onClick={this.addToMixtape}>
                        <i class="fa fa-plus"></i>
                    </div>
                </td>
            )
        }
    }
    render() {
        return(
            <div className="search_result_card_container" onClick={this.setSelectedSong}>
                <tr>
                    <td>
                        <img src={this.props.track.album.images[0].url} className="search_result_card_img"></img>
                    </td>
                    <td>
                        <div className="search_result_card_info">
                            <div style={{overflow: "hidden;"}}>
                                Name: {this.props.track.name}
                            </div>
                            <div>
                                Artist: {this.props.track.artists[0].name}
                            </div>
                        </div>
                    </td>
                    {/* <td>
                        <div className="search_result_card_play" onClick={this.setSelectedSong}>
                            <i class="fa fa-play"></i>
                        </div>
                    </td> */}
                    {/* <td>
                        <div className="search_result_card_add" onClick={this.addToMixtape}>
                            <i class="fa fa-plus"></i>
                        </div>
                    </td> */}
                    {this.renderPlayOrAdd()}
                </tr>

            </div>
        )
    }
}


export default SearchResultCard;