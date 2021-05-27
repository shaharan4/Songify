import React from 'react';
import './overlay.css';
// import 'font-awesome/css/font-awesome.min.css';

class PlayMusicOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: this.props.song,
            prev_button_class: "fa fa-backward play_music_previous",
            next_button_class: "fa fa-forward play_music_next",
            isPlaying: false,
            player: null,
            playButtonClass: "fa fa-play-circle-o fa-2x play_music_pause_play",
            mixtape: {
                items: []
            }
        }
        // this.prev_button_class = "fa fa-backward play_music_previous";
        // this.next_button_class = "fa fa-forward play_music_next";
        // if (this.state.song == null) {
        //     let newSong = {
        //         song_name: "null",
        //         song_author: "null",
        //         song_length: -1,
        //         song_photo: "https://source.unsplash.com/user/erondu/600x600"
        //     }
        //     this.state = {
        //         song: newSong
        //     }
        // }
        // else {
        //     let newSong =  {
        //         song_name: this.props.song.song_name,
        //         song_author: this.props.song.song_author,
        //         song_length: this.props.song.song_length,
        //         song_photo: this.props.song.song_photo
        //     }
        //     this.setState({
        //         song: newSong
        //     })
        // }

        if (this.props.song.index == 1) {
        //    this.prev_button_class += " disable";
           this.setState({
               prev_button_class: "fa fa-backward play_music_previous" + " disable"
           })
        }
        let modefiedMixtape = this.props.mixtape;
        if (this.props.mixtape.items[0].track) {
            for (var i=0; i< this.props.mixtape.items; i++) {
                modefiedMixtape.items[i] = this.props.mixtape.items[i].track;
                // modefiedMixtape.items[i].track = null;
            }
            this.setState({
                mixtape: modefiedMixtape
            })
            this.state.mixtape = modefiedMixtape
            console.log(this.state.modefiedMixtape)
        }
        else {
            console.log(this.props.mixtape)
            this.setState({
                mixtape: this.props.mixtape
            })
            this.state.mixtape = this.props.mixtape
            console.log(this.state.mixtape)
        }
    }
    hide = () => {
        // window.document.getElementById("play_music_overlay_container").style.display = "none";
        if (this.player) {
            this.player.pause();
        }
        this.props.setPlayMusicOverlay(false);
        if(this.state.isPlaying && this.state.player){
            this.state.player.pause();
            this.setState({
                playButtonClass: "fa fa-play-circle-o fa-2x play_music_pause_play",
                isPlaying: false
            })

        }
    }
    show = () => {
        // window.document.getElementById("play_music_overlay_container").style.display = "block";
    }
    showAddMusicOverlay = function() {
        // window.document.getElementById("add_to_mixtape_overlay_container").style.display = "block";
    }
    goNextSong = () => {
        // this.props.goNextSong(this.props.song.index);
        // this.disableButtons();
        let index = this.findIndex(this.state.song);
        console.log(index);
        if(this.state.isPlaying){
            if(this.state.player){
                this.state.player.pause();
            }
        }
        this.setState({
            isPlaying: false
        })
        if(this.state.isPlaying){
            this.setState({
                playButtonClass: "fa fa-play-circle-o fa-2x play_music_pause_play",
                isPlaying: false
            })
        }
        if (index < this.state.mixtape.items.length-1) {
            this.setState({
                song: this.state.mixtape.items[index+1].track?this.state.mixtape.items[index+1].track:this.state.mixtape.items[index+1]
            })
        }


    }
    goPrevSong = () => {
        // this.props.goPrevSong(this.props.song.index);
        // this.disableButtons();
        let index = this.findIndex(this.state.song);
        if(this.state.isPlaying){
            if(this.state.player){
                this.state.player.pause();
            }
        }
        this.setState({
            isPlaying: false
        })
        if(this.state.isPlaying){
        this.setState({
            playButtonClass: "fa fa-play-circle-o fa-2x play_music_pause_play",
            isPlaying: false
        })
    }
        if (index > 0) {
            this.setState({
                song: this.state.mixtape.items[index-1].track?this.state.mixtape.items[index-1].track:this.state.mixtape.items[index-1]
            })
        }
    }

    findIndex = (song) => {        
        for (var i=0; i<this.props.mixtape.items.length; i++) {
            let matchId = this.props.mixtape.items[i].track?this.props.mixtape.items[i].track.id:this.props.mixtape.items[i].id
            // if (song.id == this.props.mixtape.items[i].track.id) {
            if (song.id == matchId) {
                return i;
            }
        }
        return -1
    }
    disableButtons = () => {
        if (this.props.song.index == 1) {
            this.setState({
                prev_button_class: "fa fa-backward play_music_previous" + " disable"
            })
         }
        else {
            this.setState({
                prev_button_class: "fa fa-backward play_music_previous"
            })
        }
        if (this.props.song.index == 1) {
            this.setState({
                prev_button_class: "fa fa-backward play_music_previous" + " disable"
            })
         }
        else {
            this.setState({
                prev_button_class: "fa fa-backward play_music_previous"
            })
        }
    }
    play = () => {
        console.log(this.props);
        if (this.state.song.preview_url) {
            if (!this.state.isPlaying) {
                this.state.player = new Audio(this.state.song.preview_url);
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
    convertMsToMin = () => {
        if (this.state.song.duration_ms) {
            let ms = this.state.song.duration_ms;
            let min = Math.floor((ms/1000/60) << 0);
            let sec = Math.floor((ms/1000) % 60);
            return min + "" + ":" + sec;
        }
    }
    onClick = () => {
        console.log(this.props);
    }
    render() {
        return(
                <div id="play_music_overlay_container" className="play_music_overlay_color" style={{width: this.props.mainPageFlag?'2000px':'100%', left: this.props.mainPageFlag?'-200px':'0',
                height: this.props.mainPageFlag?'800px':'100%', top: this.props.mainPageFlag?'-10px':'0'}}>
                    {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}
                    <div className="play_music_overlay_wrapper">
                        {this.props.mainPageFlag?  <i class="fa fa-times-circle fa-2x play_music_exit"  onClick={this.hide}></i>:                       
                        <i class="fa fa-times-circle fa-5x play_music_exit"  onClick={this.hide}></i>
                        }

                        <div className="play_music_photo_container">
                        <img className="play_music_photo" src={this.state.song.album.images[0].url}></img>
                        </div>
                        <div className="play_music_progress_bar">
                            <div className="play_music_progress_bar_whole">
                                <div className="play_music_progress_bar_part"></div>
                            </div>
                        </div>
                        <div className="play_music_info">
                            <div className="play_music_name">
                                <p>{this.state.song.name}</p><br/>
                            </div>
                            
                            <div className="play_music_author">{this.state.song.artists[0].name}</div>
                            {/* <div className="play_music_length"> {this.state.song.duration_ms}</div> */}
                            <div className="play_music_length"> {this.convertMsToMin()}</div>
                        </div>
                        {/* <div className="play_music_add" onClick={this.showAddMusicOverlay}> &#9776;</div> */}
                        <div className="play_music_tools">                            
                            <i id="prev_button" class={this.state.prev_button_class} onClick={this.goPrevSong}></i>
                            <i id="playPauseButton" class={this.state.playButtonClass} onClick={this.play}></i>
                            <i id="next_button" class={this.state.next_button_class} onClick={this.goNextSong}></i>
                        </div>
                    </div>
                </div>
        )
    }
}
  
export default PlayMusicOverlay;