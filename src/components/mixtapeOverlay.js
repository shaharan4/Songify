import React from 'react';
import "./overlay.css";
import MixtapeOverlayCard from './mixtapeOverlayCard';
import Search from './search';
import SearchResultOverlay from './searchResultOverlay';
import DatabaseHandler from './databaseHandler';
import {uuid} from 'uuidv4';


class MixtapeOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mixtape: this.props.mixtape,
            user: this.props.user,
            searchResult: [],
            renderSearchResult: false,
            selectedSong: null,
            selectedMixtape: null
        }
        console.log(this.props.mixtape);
        // this.state = {
        //     tracksURL: this.props.mixtape.tracks.href
        // }
        // let search = new Search();
        // search.getTrackWithURL(this.state.tracksURL, (res) => {
        //     this.state = {
        //         tracks: res
        //     }
        //     console.log(this.state.tracks);
        // })
        // for (var i=0; i<this.state.songs.length; i++) {
        //     this.state.songs[i].index = i + 1;
        // }
    }
    getResizedPhoto = () => {
        let lastIndex = this.props.mixtape.mixtape_photo.lastIndexOf("/") + 1;
        let url = this.props.mixtape.mixtape_photo.substring(0, lastIndex) + "600";
        return url;
    }
    showAddMusicOverlay  = () => {
        window.document.getElementById("add_to_mixtape_overlay_container").style.display = "block";
    }
    showPlayMusicOverlay  = () => {
        window.document.getElementById("play_music_overlay_container").style.display = "block";
      }
    hide  = () => {
        // document.getElementById("mixtape_overlay_container").style.display = "none";
        this.props.setRenderMixtapeOverlay(false);
        let db = new DatabaseHandler();
        db.refreshUser(this.props.user);
    }
    show  = () => {
        document.getElementById("mixtape_overlay_container").style.display = "block";
    }
    // resetSongsIndices = () => {
    //     for (var i=0; i<this.songs.length; i++) {
    //         this.state.songs[i].index = i + 1;
    //     }
    // }
    setSelectedSong = (track) => {
        this.props.setSelectedSong(track);
    }
    setSelectedMixtape = (mixtape) => {
        console.log(mixtape)
        this.setState({
            selectedMixtape: mixtape
        })
    }

    moveUp = (index) => {
        // this.props.moveUp(index);
        if (index > 0) {
            let newMixtape = this.state.mixtape;
            let temp = newMixtape.items[index];
            newMixtape.items[index] = newMixtape.items[index-1]
            newMixtape.items[index-1] = temp;
            this.setState({
                mixtape: newMixtape
            })
        }
    }
    moveDown = (index) => {
        // this.props.moveDown(index);
        if (index < this.state.mixtape.items.length - 1) {
            let newMixtape = this.state.mixtape;
            let temp = newMixtape.items[index];
            newMixtape.items[index] = newMixtape.items[index+1]
            newMixtape.items[index+1] = temp;
            this.setState({
                mixtape: newMixtape
            })
        }
    }
    remove = (index) => {
        // this.props.remove(index);
        let newMixtape = this.state.mixtape;
        newMixtape.items.splice(index, 1);
        this.setState({
            mixtape: newMixtape
        })
    }
    addSong = () => {
        this.props.addSong();
    }
    // goPrevSong = () => {
        
    // }
    // goNextSong = (index) => {
    //     this.props.goNextSong(index);
    // }
    saveChange = () => {
        // console.log(this.props);
        // console.log(this.state);
        if (this.props.user) {
            console.log(this.props.user)
            this.state.user.mixtapes = this.state.user.mixtapes.map((mixtape) => {
                if (mixtape.id == this.state.mixtape.id) {
                    return this.state.mixtape;
                }
                else return mixtape;
            })
        }
        console.log(this.state);
    }

    setImgURL = () => {
        let url = document.getElementById("mixtape_overlay_img_url_input").value;
        // let img = document.getElementById("new_mixtape_page_img_url");
        let mixtape = this.state.mixtape;
        mixtape.images[0].url = url;
        this.setState({
            mixtape: mixtape
        })
    }

    onKeyDown = (e) => {
        if (e.keyCode == 13) {
          console.log("prevent default", e.keyCode)
          e.preventDefault();
          this.search();
        }
    }

    search = (e) => {
        if (e) {
            e.preventDefault();
        }
        let search_input = document.getElementById("mixtape_overlay_search_input").value;
        if (search_input != "") {
            new Search(search_input, "track", this.setSearchResult);
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

    renderSearchResult = () => {
        if (this.state.renderSearchResult) {
            return <SearchResultOverlay
                    tracks={this.state.searchResult}
                    searchResult={this.state.searchResult.tracks}
                    setSelectedSong={this.setSelectedSong}
                    setSelectedMixtape={this.setSelectedMixtape}
                    addToMixtape={this.addToMixtape}
                    setRenderSearchResult={this.setRenderSearchResult}
                    setPlayMusicOverlay={this.setPlayMusicOverlay}
                    ></SearchResultOverlay>
        }
    }

    setPlayMusicOverlay = () => {

    }

    addToMixtape = (track) => {
        let newMixtape = this.state.mixtape;
        if (this.state.mixtape.items) {
            let item = {
                track: track
            }
            newMixtape.items.push(item);
            this.setState({
                mixtape: newMixtape,
                selectedMixtape: newMixtape
            })
        }
        else {
            newMixtape.items = [];
            let item = {
                track: track
            }
            newMixtape.items.push(item);
            this.setState({
                mixtape: newMixtape,
                selectedMixtape: newMixtape
            })
        }
        
    }

    setSelectedSong = (song) => {
        this.setState({
            selectedSong: song
        })
        this.props.setSelectedSong(song);
    }

    save = () => {
        // console.log(this.state.mixtape)
        // console.log(this.state.user.mixtapes)
        let newMixtapeName = document.getElementById("mixtape_overlay_mixtape_name").value;
        if (newMixtapeName != "") {
            let mixtape = this.state.mixtape;
            mixtape.name = newMixtapeName;
            this.setState({
                mixtape: mixtape
            })
        }
        let user = this.state.user;
        user.mixtapes = user.mixtapes.map((mixtape) => {
            if (mixtape.id != this.state.mixtape.id) {
                return mixtape;
            }
            else {
                // let updatedMixtape = this.state.mixtape;
                // updatedMixtape.id = uuid();
                // this.setState({mixtape: updatedMixtape}, () => {return this.state.mixtape})
                return this.state.mixtape
            }
        })
        this.setState({
            user: user
        }, () => {
            let db = new DatabaseHandler()
            db.updateUser(this.state.user, () => {
                // localStorage.setItem('user', JSON.stringify(this.state.user));
                // window.location.href = './my_mixtape_page';
                db.refreshUser(this.state.user);
            })
        })
        //send to db
        
    }
    render() {
        return(
            <div id="mixtape_overlay_container">
                {/* <button onClick={this.saveChange}>Save Change</button> */}
                <div className="mixtape_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x mixtape_overlay_exit pointer_on_hover" onClick={this.hide}></i>
                    {/* <div className="mixtape_overlay_photo_container"> */}
                        <img className="mixtape_overlay_photo" src={this.state.mixtape.images[0].url}></img>
                        <input id="mixtape_overlay_img_url_input" className="mixtape_overlay_img_url_input"></input><button className="mixtape_overlay_img_url_input_btn btn btn-light" onClick={this.setImgURL}>set img url</button>
                    {/* </div> */}
                    
                    <table className="mixtape_overlay_song_table">
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
                                    <MixtapeOverlayCard 
                                    index={index}
                                    track={item.track} 
                                    setSelectedSong={this.setSelectedSong}
                                    moveUp={this.moveUp}
                                    moveDown={this.moveDown}
                                    remove={this.remove}
                                    setPlayMusicOverlay={this.props.setPlayMusicOverlay}
                                    ></MixtapeOverlayCard>
                                );
                            })}
                            {/* <tr>
                                <td>
                                    <input id="mixtape_overlay_search_input" className="search_bar" type="search" placeholder="Search" aria-label="Search" onKeyDown={this.onKeyDown}/>
                                </td>
                                <td onClick={this.search} className="pointer_on_hover mixtape_overlay_add">
                                Add songs...
                                <i id="add_song_button" className= 'glyphicon glyphicon-plus'></i>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                    <input id="mixtape_overlay_search_input" className="search_bar" type="search" placeholder="Search new songs to add" aria-label="Search" onKeyDown={this.onKeyDown}/>
                    
                    <i id="add_song_button" onClick={this.search} className= 'glyphicon glyphicon-plus fa-3x'></i>
                    <button className="mixtape_overlay_save btn btn-light fa-2x" onClick={this.save}>Save Changes</button>
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
                {this.renderSearchResult()}
            </div>
    )
    }
}

export default MixtapeOverlay;