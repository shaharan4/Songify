import React from 'react';
import SearchResultCard from './searchResultCard.js';
import PlayMusicOverlay from './playMusicOverlay.js';
import "./overlay.css";


class SearchResultStoryOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSong: {
                album: {
                    images: [
                        {
                            url: ""
                        }
                    ]
                },
                artists: [
                    {
                        name: "null"
                    }
                ],
                name: "null",
            },
            songSelected: false
        }
    }
    hide = () => {
        // window.document.getElementById("search_result_overlay_container_story").style.display = "none";
        this.props.setRenderSearchResultOverlay(false);
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
    goPrevSong = () => {

    }
    goNextSong = () => {

    }
    addToMixtape = (song) => {
        this.props.addToMixtape(song);
    }
    selectSong = (song) => {
        this.props.selectSong(song)
    }
    setPlayMusicOverlay = (val) => {
        this.props.setPlayMusicOverlay(val);
    }
    renderSearchResultCard = () => {
        if (this.props.tracks) {
            return (
                this.props.tracks.tracks.items && this.props.tracks.tracks.items.map((track) => {
                    return (
                        <SearchResultCard 
                        track={track}
                        setSelectedSong={this.setSelectedSong}
                        // setPlayMusicOverlay={this.props.setPlayMusicOverlay}
                        setPlayMusicOverlay={this.setPlayMusicOverlay}
                        addToMixtape={this.addToMixtape}
                        selectSong={this.selectSong}
                        ></SearchResultCard>
                    )
                })
            )
        }
    }
    render() {
        return(
            <div id="search_result_overlay_container_story">
                <div className="story_play_music_overlay_wrapper_story">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="story_play_music_exit_story"onClick={this.hide}>
                    <i class="fa fa-times-circle fa-5x play_music_exit_story" ></i>
                </div>
                <div id="search_result_overlay_content_story">
                    <div id="search_result_table_header">
                        <div className="search_result_table_header_name">
                            Search Results 
                        </div>
                    </div>
                    <div id="search_result_table">
                        <table className="search_result_table_tag">
                                {/* {this.props.tracks.tracks.items && this.props.tracks.tracks.items.map((track) => {
                                    return (
                                        <SearchResultCard 
                                        track={track}
                                        setSelectedSong={this.setSelectedSong}
                                        addToMixtape={this.addToMixtape}
                                        ></SearchResultCard>
                                    )
                                })} */}
                                {this.renderSearchResultCard()}
                                {/* {console.log(this.props)} */}
                        </table>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}


export default SearchResultStoryOverlay;