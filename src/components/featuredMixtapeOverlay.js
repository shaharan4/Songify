import React from 'react';
import "./overlay.css";
import FeaturedMixtapeOverlayCard from './featuredMixtapeOverlayCard';
import PlayMusicOverlay from './playMusicOverlay.js'


class FeaturedMixtapeOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedMixtape: this.props.mixtape,
              selectedSong: {
                name: "",
                album: {
                    artists: [{
                        name: ""
                    }],
                    images: [{
                        url: ""
                    }],
                    name: ""
                },
                artists: [
                    {
                        name: ""
                    }
                ],
                duration_ms: 0,
                song_index: -1,
              },
              renderPlayMusicOverlay: false,
        }
    }
    setSelectedSong = (track) => {
        // console.log("set track", track);
        this.setState({
          selectedSong: track
        })
        // console.log("set song", track);
      }
      goNextSong = (currentSongIndex) => {
        if (this.state.tracks.songs != []) {
          if (currentSongIndex < this.state.selectedMixtape.songs.length) {
            let nextSong = this.state.tracks.songs[currentSongIndex]
            this.setSelectedSong(nextSong);
          }
        }
      }
      goPrevSong = (currentSongIndex) => {
        if (this.state.track.songs != []) {
          if (currentSongIndex > 1) {
            let prevSong = this.state.tracks.songs[currentSongIndex - 2]
            this.setSelectedSong(prevSong);
          }
        }
      }
      renderPlayMusicOverlay = () => {

        if (this.state.renderPlayMusicOverlay) {
            console.log("wow")
          return <PlayMusicOverlay 
          song={this.state.selectedSong}
          mixtape={this.props.trackList}
          goPrevSong={this.goPrevSong}
          goNextSong={this.goNextSong}
          setPlayMusicOverlay={this.setPlayMusicOverlay}
          mainPageFlag={true}
        ></PlayMusicOverlay>
        }

      }
      setPlayMusicOverlay = (val) => {
          this.setState({renderPlayMusicOverlay: val})
      }
      hide  = () => {
        // document.getElementById("mixtape_overlay_container").style.display = "none";
        window.document.getElementById("featured_mixtape_overlay_container").style.display = "none";
        this.props.resetSelectedMixtape();
    }
      

    render(){
        return(
            <div id="featured_mixtape_overlay_container">
                <div className="featured_mixtape_overlay_wrapper">
                    <i class="fa fa-times-circle fa-2x featured_mixtape_overlay_exit pointer_on_hover" onClick={this.hide}></i>
                    {/* <div className="mixtape_overlay_photo_container"> */}
                        <img className="featured_mixtape_overlay_photo" src={this.state.selectedMixtape.images[0].url}></img>
                    {/* </div> */}
                    
                    <table className="featured_mixtape_overlay_song_table">
                        <thead className="featured_mixtape_overlay_song_table_head">
                            <tr>
                                <td>
                               <div style={{position: 'relative', fontFamily: 'cursive', fontWeight: 'bold', left: '100%', color: 'white'}}> {this.state.selectedMixtape.name.length>0?this.state.selectedMixtape.name:null}</div>
                                </td>
                            </tr>
                        </thead>
                        <tbody className="featured_mixtape_overlay_song_table_body">
                            {this.props.trackList.items && this.props.trackList.items.map((item, index) => {
                                return(
                                    <FeaturedMixtapeOverlayCard 
                                    index={index}
                                    track={item.track} 
                                    setSelectedSong={this.setSelectedSong}
                                    setPlayMusicOverlay={this.setPlayMusicOverlay}
                                    ></FeaturedMixtapeOverlayCard>
                                );
                            })}
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                    {this.renderPlayMusicOverlay()}

                    {/* <div className="mixtape_overlay_progress_bar">
                        <p className="mixtape_overlay_progress_bar_whole"></p>
                        <p className="mixtape_overlay_progress_bar_part"></p>
                    </div> */}
                    {/* <div className="mixtape_overlay_info">
                        <p className="mixtape_overlay_song_name">{this.props.selectedSong.song_name}</p><br/>
                        <div className="mixtape_overlay_song_author">{this.props.selectedSong.song_author}</div>
                        <div className="mixtape_overlay_song_length">- {this.props.selectedSong.song_length}</div>
                    </div> */}
                    {/* <div className="mixtape_overlay_add pointer_on_hover" onClick={this.showAddMusicOverlay}> &#9776;</div> */}
                    {/* <div className="mixtape_overlay_tools">
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                        <i class="fa fa-backward fa-5x mixtape_overlay_previous"></i>
                        <i class="fa fa-play-circle-o mixtape_overlay_pause_play" style={{fontSize:120}}></i>
                        <i class="fa fa-forward fa-5x mixtape_overlay_next"></i>
                    </div> */}

                </div>
            </div>
    )
    }
}
export default FeaturedMixtapeOverlay;