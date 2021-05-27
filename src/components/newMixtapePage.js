import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./myMixtapePage.css";
import "./newMixtapePage.css";
import NewMixtapePageCard from './newMixtapePageCard.js';
import {Navbar} from "react-bootstrap";
import PlayMusicOverlay from './playMusicOverlay';
import Search from './search.js';
import SearchResultOverlay from './searchResultOverlay.js';
import DatabaseHandler from './databaseHandler';
import Sidebar from './sidebar.js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {uuid} from 'uuidv4';

class NewMixtapePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        user: this.props.user?this.props.user:{
          _id: "",
          username: "",
          password: "",
          account_name: "",
          stories: [],
          mixtapes: [],
          account_profile_pic: "",
          account_email: "",
          friend_system: {
            friends: [],
            received_requests: [],
            sent_requests: [],
            received_mixtapes: [],
            set_mixtapes: []
          },
          state: {
            mood: "",
            song: ""
          }
        },
            newMixtape: {
                _id: "",
                name: "",
                images: [
                    {
                        url: "https://source.unsplash.com/user/erondu/800x600"
                    }
                ],
                owner: {
                    display_name: this.props.user.account_name
                },
                tracks: {
                    href: "",
                    total: 0
                },
                items: [],
                href: ""
            },
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
            searchResult: {
                tracks: {
                    items: []
                }
            },
            renderSearchResult: false,
            renderPlayMusicOverlay: false
        }
        // this.updateSongIndex();
    }
    showAddMusicOverlay = function() {
        window.document.getElementById("add_to_mixtape_overlay_container").style.display = "block";
    }
    showPlayMusicOverlay = function() {
        window.document.getElementById("play_music_overlay_container").style.display = "block";
      }
    hide = function() {
        document.getElementById("mixtape_overlay_container").style.display = "none";
    }
    show = function() {
        document.getElementById("mixtape_overlay_container").style.display = "block";
    }
    showSidebar = () => {
        if (this.props.user) {
          document.getElementById("sidebar_wrapper").style.width = "400px";
          document.getElementById("sidebar_container").style.display = "block";
        }
        else {
          //show sign in overlay
          console.log("login")
          window.document.getElementById("login_overlay_container").style.display = "block";
        }
    }
    getUserImage = () => {
        if (this.props.user) {
          // return "https://picsum.photos/100";
          return this.props.user.account_profile_pic;
        }
        else {
          return "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg";
        }
      }
  
        

    // componentDidMount = () => {
    //     let db = new DatabaseHandler();
    //     db.findUserWithPassword("123abc", "123456", (res) => {
    //       if (res.status == 200 && res.data != []) {
    //         let user = res.data[0];
    //         this.setState({
    //           user: user
    //         });
    //         console.log(this.state.user)
    //       }
    //       else {
    //         console.log(res);
    //       }
    //     })
    //   }

    addSong = () => {
        let newSong = {
            song_author: "author name" + (this.state.newMixtape.items.length + 1),
            song_name: "song name" + (this.state.newMixtape.items.length + 1),
            index: this.state.newMixtape.items.length + 1
        };
        let newMixtape = this.state.newMixtape
        newMixtape.items.push(newSong)
        // this.updateSongIndex();
        this.setState({
            newMixtape: newMixtape
        });
    }

    addMixtape = async () => {
        let mixtapeName = document.getElementById("new_mixtape_page_search_bar").value;
        let newMixtape = this.state.newMixtape;
        if (mixtapeName != "") {
            newMixtape.name = mixtapeName;
        }
        else {
            newMixtape.name = "Untitled Mixtape";
        }
        newMixtape.id = uuid();
        newMixtape.owner.display_name = this.state.user.username;
        this.state.user.mixtapes.push(newMixtape);
        let db = new DatabaseHandler();
        db.addMixtapeToUser(this.state.user, (res) => {
            if (res.data != null && res.data != []) {
                this.setState({
                    user: res.data
                })
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.href = "/my_mixtape_page";
                // db.refreshUser(this.state.user);
            }
            else {
                console.log("user not found");
            }
            
        });
    }


    updateSongIndex = () => {
        let newMixtape = this.state.newMixtape;
        if (newMixtape.items != null) {
            for (let i=0; i<newMixtape.items.length; i++) {
                newMixtape.items[i].index = i+1;
            }
        }
        this.setState({
            newMixtape: newMixtape
        })
    }

    setSelectedSong = (song) => {
        this.setState({
            selectedSong: song
        })
    }
    moveUp = (index) => {
        if (index > 0) {
            let newMixtape = this.state.newMixtape;
            let temp = newMixtape.items[index];
            newMixtape.items[index] = newMixtape.items[index-1]
            newMixtape.items[index-1] = temp;
            // temp = newMixtape.items[index].index;
            // newMixtape.items[index].index = newMixtape.items[index-1].index;
            // newMixtape.items[index-1].index = temp;

            this.setState({
                newMixtape: newMixtape
            })
        }
    }
    moveDown = (index) => {
        if (index < this.state.newMixtape.items.length-1) {
            let newMixtape = this.state.newMixtape;
            let temp = newMixtape.items[index];
            newMixtape.items[index] = newMixtape.items[index+1]
            newMixtape.items[index+1] = temp;
            // temp = newMixtape.items[index].index;
            // newMixtape.items[index].index = newMixtape.items[index].index;
            // newMixtape.items[index].index = temp;

            this.setState({
                newMixtape: newMixtape
            })
        }
    }
    remove = (index) => {
        if (index >= 0 && index < this.state.newMixtape.items.length) {
            // this.state.newMixtape.items.splice(index, 1);
            let newMixtape = this.state.newMixtape;
            newMixtape.items = [...this.state.newMixtape.items];
            newMixtape.items.splice(index, 1);
            this.setState({
                newMixtape: newMixtape
            })
            console.log("remove", index, this.state.newMixtape.items);
        }
    }
    search = (e) => {
        if (e) {
            e.preventDefault();
        }
        let search_input = document.getElementById("new_mixtape_page_search_input").value;
        if (search_input != "") {
            new Search(search_input, "track", this.setSearchResult);
            // this.setState({
            //     displaySearchResult: true
            // })
            // this.showSearchResultOverlay();
        }
    }
    showSearchResultOverlay = () => {
        document.getElementById("search_result_overlay_container").style.display = "block";
        // if (this.state.displaySearchResult) {
        //     console.log("show");
        //     return <SearchResultOverlay
        //         tracks={this.state.searchResult}
        //         setSelectedSong={this.setSelectedSong}
        //         setSelectedMixtape={this.setSelectedMixtape}
        //         addToMixtape={this.addToMixtape}
        //     ></SearchResultOverlay>
        // }
    }
    setSearchResult = (result) => {
        this.setState({
          searchResult: result,
          renderSearchResult: true
        })
        console.log(this.state.searchResult)
    }
    setRenderSearchResult = (val) => {
        this.setState({
            renderSearchResult: val
        })
    }
    onKeyDown = (e) => {
        if (e.keyCode == 13) {
          console.log("prevent default", e.keyCode)
          e.preventDefault();
          this.search();
        }
    }
    goNextSong = (currentSongIndex) => {
        if (this.state.selectedMixtape.items != []) {
            if (currentSongIndex < this.state.selectedMixtape.items.length) {
                let nextSong = this.state.selectedMixtape.items[currentSongIndex]
                this.setSelectedSong(nextSong);
            }
        }
    }
    goPrevSong = (currentSongIndex) => {
        if (this.state.selectedMixtape.items != []) {
            if (currentSongIndex > 1) {
                let prevSong = this.state.selectedMixtape.items[currentSongIndex - 2]
                this.setSelectedSong(prevSong);
            }
        }
    }
    addToMixtape = (track) => {
        console.log("add", track);
        let newMixtape = this.state.newMixtape;
        let item = {
            track: track
        }
        newMixtape.items.push(item);
        this.setState({
            newMixtape: newMixtape
        })
        // this.updateSongIndex();
    }

    setSelectedMixtape = (mixtape) => {
        this.setState({
            selectedMixtape: mixtape
        })
    }

    onClick = () => {
        console.log(uuid());
    }

    setPlayMusicOverlay = (val) => {
        this.setState({
          renderPlayMusicOverlay: val
        })
      }
  
    renderPlayMusicOverlay = () => {
        if (this.state.renderPlayMusicOverlay) {
          return <PlayMusicOverlay 
          song={this.state.selectedSong}
          mixtape={this.state.newMixtape}
          goPrevSong={this.goPrevSong}
          goNextSong={this.goNextSong}
          setPlayMusicOverlay={this.setPlayMusicOverlay}
        ></PlayMusicOverlay>
        }
    }

    setImgURL = () => {
        let url = document.getElementById("new_mixtape_page_img_url_input").value;
        // let img = document.getElementById("new_mixtape_page_img_url");
        let mixtape = this.state.newMixtape;
        mixtape.images[0].url = url;
        this.setState({
            newMixtape: mixtape
        })
    }

    renderSearchResult = () => {
        if (this.state.renderSearchResult) {
            return <SearchResultOverlay
                    tracks={this.state.searchResult}
                    setSelectedSong={this.setSelectedSong}
                    setSelectedMixtape={this.setSelectedMixtape}
                    addToMixtape={this.addToMixtape}
                    setRenderSearchResult={this.setRenderSearchResult}
                    setPlayMusicOverlay={this.setPlayMusicOverlay}
                ></SearchResultOverlay>
        }
    }

    render() {
        document.body.style = 'background: #2d2d31;'
        return(
            <div id="new_mixtape_page_container">
                <Navbar bg="#2d2d31" variant="dark" expand="md">
                    <a class="navbar-brand" className="new_mixtape_page_songify nav_bar" id="new_mixtape_songify_link" href="/main_page">Songify</a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav"></div>
                            <a class="nav-item nav-link active" className="my_mixtape_page_my_mixtapes nav_bar" id="new_mixtape_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
                            <a class="nav-item nav-link active" className="my_mixtape_page_story nav_bar" id="new_mixtape_story_link" href="/story_page">Story</a>
                    </div>
                    <div>
                        <img src={this.getUserImage()} className="my_mixtape_page_profile_pic circle_img pointer_on_hover hundredPixel" onClick={this.showSidebar}></img>
                    </div>
                </Navbar>
                <div className="new_mixtape_page_img_container">
                    <img id="new_mixtape_page_img_url" src={this.state.newMixtape.images[0].url}></img>
                </div>
                <input id="new_mixtape_page_img_url_input"></input><button id="new_mixtape_page_img_button btn btn-light"onClick={this.setImgURL}>set img url</button>
                <div className="new_mixtape_page_table_container">
                    <table className="new_mixtape_page_table">
                        <div className="new_mixtape_page_table_head">
                            <input id="new_mixtape_page_search_bar" className="new_mixtape_page_search_bar" placeholder="Name of Your Mixtape"></input>
                            <p className="new_mixtape_page_create" onClick={this.addMixtape}>Create</p>
                        </div>
                        {/* <tbody> */}
                            <div id="new_mixtape_page_table_body" className="new_mixtape_page_table_body">
                                {this.state.newMixtape.items && this.state.newMixtape.items.map((item, index) => {
                                return(
                                    <NewMixtapePageCard 
                                        index={index}
                                        song={item.track} 
                                        setSelectedSong={this.setSelectedSong}
                                        setPlayMusicOverlay={this.setPlayMusicOverlay}
                                        moveUp={this.moveUp}
                                        moveDown={this.moveDown}
                                        remove={this.remove}
                                    ></NewMixtapePageCard>
                                    );
                                })}
                                <tr>
                                    <td>
                                        <input id="new_mixtape_page_search_input" className="search_bar" type="search" placeholder="Search" aria-label="Search" onKeyDown={this.onKeyDown}/>
                                    </td>
                                    <td>
                                        <div className="pointer_on_hover" onClick={this.search}>
                                            + Add Song
                                        </div>
                                    </td>

                                </tr>
                            </div>
                        {/* </tbody> */}
                    </table>
                </div>
                {/* <PlayMusicOverlay 
                    song={this.state.selectedSong}
                    goPrevSong={this.goPrevSong}
                    goNextSong={this.goNextSong}
                ></PlayMusicOverlay> */}
                {this.renderPlayMusicOverlay()}
                {/* <SearchResultOverlay
                    tracks={this.state.searchResult}
                    setSelectedSong={this.setSelectedSong}
                    setSelectedMixtape={this.setSelectedMixtape}
                    addToMixtape={this.addToMixtape}
                ></SearchResultOverlay> */}
                {this.renderSearchResult()}
                {/* {this.showSearchResultOverlay()} */}
            </div>
    )
    }
}

export default NewMixtapePage;