import React from 'react';
import "./overlay.css";
import MixtapeOverlayCard from './mixtapeOverlayCard';
import Search from './search';
import SearchResultOverlay from './searchResultOverlay';
import DatabaseHandler from './databaseHandler';
import ReceivedMixtapeOverlayCard from './receivedMixtapeOverlayCard';
import PlayMusicOverlay from './playMusicOverlay';


class ReceivedMixtapeOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mixtape: this.props.mixtape,
            user: this.props.user,
            searchResult: [],
            renderSearchResult: false,
            selectedSong: null,
            selectedMixtape: null,
            renderPlayMusicOverlayL: false
        }
    }





    setSearchResult = (result) => {
        this.setState({
            searchResult: result,
            renderSearchResult: true
        })
    }

    setRenderSearchResult = (val) => {
        this.setState({
            renderSearchResult: val
        })
    }

    addToMixtape = (track) => {
        // console.log(this.state);
        // let newMixtape = this.state.mixtape;
        // let item = {
        //     track: track
        // }
        // newMixtape.items.push(item);
        // this.setState({
        //     mixtape: newMixtape
        // })
    }
    setPlayMusicOverlay = (val) => {
        this.setState({
            renderPlayMusicOverlay: val
        })
    }

    setSelectedSong = (song) => {
        this.setState({
            selectedSong: song
        })
        // this.props.setSelectedSong(song);
    }
    renderPlayMusicOverlay = () => {
        if (this.state.renderPlayMusicOverlay) {
            return <PlayMusicOverlay 
            song={this.state.selectedSong}
            mixtape={this.props.mixtape}
            // goPrevSong={this.goPrevSong}
            // goNextSong={this.goNextSong}
            setPlayMusicOverlay={this.setPlayMusicOverlay}
          ></PlayMusicOverlay>
          }
    }

    render() {
        return(
            <div id="mixtape_overlay_container">
                <div className="mixtape_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x mixtape_overlay_exit pointer_on_hover" onClick={() => this.props.setRenderReceivedMixtapeOverlay(false)}></i>
                    {/* <div className="mixtape_overlay_photo_container"> */}
                        <img className="mixtape_overlay_photo" src={this.state.mixtape.images[0].url}></img>
                        {/* <input id="mixtape_overlay_img_url_input" className="mixtape_overlay_img_url_input"></input><button className="mixtape_overlay_img_url_input" onClick={this.setImgURL}>set img url</button> */}
                    {/* </div> */}
                    
                    <table className="mixtape_overlay_song_table" style={{height: '88%'}}>
                        <thead className="mixtape_overlay_song_table_head">
                            <tr>
                                <td>
                                    <input id="mixtape_overlay_mixtape_name" className="mixtape_overlay_mixtape_name" placeholder={this.props.mixtape.name}></input>
                                    {/* <p className="mixtape_overlay_mixtape_name_edit_btn">Edit &#9998;</p> */}
                                </td>
                            </tr>
                        </thead>
                        <tbody className="mixtape_overlay_song_table_body">
                            {this.state.mixtape.items && this.state.mixtape.items.map((item, index) => {
                                return(
                                    <ReceivedMixtapeOverlayCard 
                                    index={index}
                                    track={item.track} 
                                    setSelectedSong={this.setSelectedSong}
                                    moveUp={this.moveUp}
                                    moveDown={this.moveDown}
                                    remove={this.remove}
                                    setPlayMusicOverlay={this.setPlayMusicOverlay}
                                    ></ReceivedMixtapeOverlayCard>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {this.renderPlayMusicOverlay()}
            </div>
    )
    }
}

export default ReceivedMixtapeOverlay;