import React from 'react';
import './storyoverlay.css';


class StoryMusicOverlay extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        // console.log(this.props.story);
        this.state = {
            isPlaying: false,
            player: null,
            playButtonClass: "fa fa-play-circle-o fa-2x play_music_pause_play",
            story: this.props.story
        }
    }
    hide = () => {
        // window.document.getElementById("story_play_music_overlay_container").style.display = "none";
        this.props.setPlayMusicOverlay(false);
    }
    show = () => {
        // window.document.getElementById("story_play_music_overlay_container").style.display = "block";
    }
    convertMsToMin = () => {
        if (this.props.story.track) {
            let ms = this.props.story.track.duration_ms;
            let min = Math.floor((ms/1000/60) << 0);
            let sec = Math.floor((ms/1000) % 60);
            return min + "" + ":" + sec;
        }
        else {
            return "00:00";
        }
    }
    play = () => {
        console.log(this.props);
        if (this.props.story.track.preview_url) {
            if (!this.state.isPlaying) {
                this.state.player = new Audio(this.props.story.track.preview_url);
                this.state.player.play();
                this.setState({
                    isPlaying: true
                })
            }
            else {
                this.state.player.pause();
                this.setState({
                    isPlaying: false
                })
            }
        }
        this.switchPlayPauseButton();
    }
    switchPlayPauseButton = () => {
        if (!this.state.isPlaying) {
            // document.getElementById("playPauseButton").className = "fa fa-play-circle-o fa-2x play_music_pause_play";
            console.log("play")
            this.setState({
                playButtonClass: "fa fa-pause-circle-o fa-2x play_music_pause_play",
                isPlaying: true
            })
        }
        else {
            console.log("pause")
            this.setState({
                playButtonClass: "fa fa-play-circle-o fa-2x play_music_pause_play",
                isPlaying: false
            })
        }
    }
    getTrackUrl = () => {
        if (this.props.story.track) {
            console.log(this.props.story)
            if (this.props.story.track.album) {
                return (this.props.story.track.album.images[0].url);
            }
        }
        else {
            return "";
        }
    }
    getTrackName = () => {
        if (this.props.story.track) {
            return (this.props.story.track.name);
        }
        else {
            return "";
        }
    }
    getTrackArtist = () => {
        if (this.props.story.track) {
            return (this.props.story.track.artists[0].name);
        }
        else {
            return "";
        }
    }
    render() {
        // console.log("GIMOTHI" + this.state)
        return(
            
                <div id="story_play_music_overlay_container" className="story_play_music_overlay_color">
                    <div className="story_play_music_overlay_wrapper">
                        <div className="story_play_music_exit"onClick={this.hide}>
                            <i class="fa fa-times-circle fa-5x play_music_exit" ></i>
                        </div>
                        <div className="story_play_music_photo_wrapper">
                            <img className="story_play_music_photo" src={this.getTrackUrl()}></img>
                        </div>
                        <p className="story_play_music_text">{this.props.story.story_message}</p>
                        <div className="story_play_music_progress_bar">
                            <p className="story_play_music_progress_bar_whole"></p>
                            <p className="story_play_music_progress_bar_part"></p>
                        </div>
                        <div className="story_play_music_info">
                            <p className="story_play_music_name">{this.getTrackName()}</p><br/>
                            <div className="story_play_music_author">{this.getTrackArtist()}</div>
                            <div className="story_play_music_length">{this.convertMsToMin()}</div>
                        </div>
                        <div className="story_play_music_tools">
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                            <i class="fa fa-backward play_music_previous"></i>
                            {/* <i class="fa fa-play-circle-o fa-2x play_music_pause_play"></i> */}
                            <i id="storyPlayPauseButton" class={this.state.playButtonClass} onClick={this.play}></i>
                            <i class="fa fa-forward play_music_next"></i>
                        </div>
                    </div>
                </div>
        )
    }
}
  
export default StoryMusicOverlay;