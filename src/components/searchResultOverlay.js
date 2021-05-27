import React from 'react';
import SearchResultCard from './searchResultCard.js';
import PlayMusicOverlay from './playMusicOverlay.js';
import "./overlay.css";


class SearchResultOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSong: {
                song_name: "null",
                song_author: "null",
                song_photo: "null",
                song_length: -1,
                song_url: "null"
            },
            songSelected: false
        }
        this.props.setSelectedMixtape(this.props.searchResult);
    }
    hide = () => {
        // window.document.getElementById("search_result_overlay_container").style.display = "none";
        this.props.setRenderSearchResult(false);
        // console.log(this.props);
    }

    // showPlayMusicOverlay = () => {
    //     // window.document.getElementById("play_music_overlay_container").style.display = "block";
    //     <PlayMusicOverlay
    //             song={this.state.selectedSong}
    //             goPrevSong={this.goPrevSong}
    //             goNextSong={this.goNextSong}
    //     ></PlayMusicOverlay>
    // }

    setSelectedSong = (song) => {
        this.props.setSelectedSong(song);
    }
    // goPrevSong = () => {

    // }
    // goNextSong = () => {

    // }
    addToMixtape = (song) => {
        this.props.addToMixtape(song);
    }


    render() {
        return(
            <div id="search_result_overlay_container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <i class="fa fa-times-circle fa-5x search_overlay_exit"  onClick={this.hide}></i>
                <div id="search_result_overlay_content">
                    <div id="search_result_table_header">
                        <div className="search_result_table_header_name">
                            Search Results
                        </div>
                    </div>
                    <div id="search_result_table">
                        <table className="search_result_table_tag">
                                {this.props.tracks.tracks.items && this.props.tracks.tracks.items.map((track) => {
                                    return (
                                        <SearchResultCard 
                                        track={track}
                                        setSelectedSong={this.setSelectedSong}
                                        addToMixtape={this.addToMixtape}
                                        setPlayMusicOverlay={this.props.setPlayMusicOverlay}
                                        isFromMainPage={this.props.isFromMainPage}
                                        ></SearchResultCard>
                                    )
                                })}
                                {/* {console.log(this.props)} */}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchResultOverlay;