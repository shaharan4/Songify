import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Navbar} from "react-bootstrap";
import AddToMixtapeOverlay from './addToMixtapeOverLay';
import MixtapeTable from './mixtapeTable';
import './myMixtapePage.css';
import PlayMusicOverlay from './playMusicOverlay';
import MyMixtapePageMoreOverlay from './myMixtapePageMoreOverlay';
import Sidebar from './sidebar';
import MixtapeOverlay from './mixtapeOverlay'
import Search from './search.js';
import SearchResultCard from './searchResultCard';
import SearchResultOverlay from './searchResultOverlay';
import DatabaseHandler from './databaseHandler';
import LoginOverlay from './LoginOverlay';
import SignupOverlay from './SignUpOverlay';
import SendMixtapeOverlay from './sendMixtapeOverlay';
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

var json = require('./data/playlists.json');

class MixtapePage extends React.Component {
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
        // user: this.props.user,
        selectedMixtape: {
          name: "",
          images: [""],
          owner: {
            display_name: ""
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
        renderMixtapeOverlay: false,
        renderMore: null,
        renderPlayMusicOverlay: false,
        renderSearchResult: false,
        renderSendMixtapeOverlay: false
      }

      console.log(this.props)
      // this.updateSongIndices(this.state.selectedMixtape);
    }

    // componentDidMount = () => {
    //   let db = new DatabaseHandler();
    //   db.findUserWithPassword("123abc", "123456", (res) => {
    //     if (res.status == 200 && res.data != []) {
    //       let user = res.data[0];
    //       this.setState({
    //         user: user
    //       });
    //       console.log(this.state.user)
    //     }
    //     else {
    //       console.log(res);
    //     }
    //   })
    // }
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
    goToNewMixtapePage = function() {

    }
    search = (e) => {
      if (e) {
        e.preventDefault();
      }
      let search_input = document.getElementById("search_input").value;
      if (search_input != "") {
        // console.log(search_input)
        new Search(search_input, "track", this.setSearchResult);
        // let search = new Search();
        // search.getTrack(search_input, this.setSelectedMixtape);
        // search.getTrack(search_input, (tracks)=>{this.setSearchResult(tracks)});
        // this.showSearchResultOverlay();
        // let search = new Search(search_input, "track", this.setSearchResult);
        // search.getTrack("https://api.spotify.com/v1/playlists/37i9dQZF1DXbTxeAdrVG2l/tracks", (data) => {console.log(data)});
      }
    }
    showSearchResultOverlay = () => {
      document.getElementById("search_result_overlay_container").style.display = "block";
    }
    renderSearchResult = () => {
      if (this.state.renderSearchResult) {
        return  <SearchResultOverlay
                tracks={this.state.searchResult}
                setSelectedSong={this.setSelectedSong}
                setSelectedMixtape={this.setSelectedMixtape}
                setPlayMusicOverlay={this.setPlayMusicOverlay}
                addToMixtape={this.addToMixtape}
                setRenderSearchResult={this.setRenderSearchResult}
                isFromMainPage={true}
            ></SearchResultOverlay>
      }
    }
    setSearchResult = (result) => {
      this.setState({
        searchResult: result,
        renderSearchResult: true
      })
      let mixtape = this.state.selectedMixtape?this.state.selectedMixtape:{};
      mixtape.items = result.tracks.items;
      this.setState({
        selectedMixtape: mixtape
      })
      // console.log(this.state.searchResult)
    }

    setRenderSearchResult = (val) => {
      this.setState({
          renderSearchResult: val
      })
    }
    setSelectedMixtape = (mixtape) => {
      // console.log("set mixtape");
      // console.log(mixtape);
      this.setState({
        selectedMixtape: mixtape
      })
      // let search = new Search();
      // search.getTrackWithURL(mixtape.tracks.href, (res) => {
      //   this.state.selectedMixtape.items = res.items;
      //   for (var i=0; i<this.state.user.mixtapes.length; i++) {
      //     // console.log(this.state.user);
      //     if (this.state.selectedMixtape.href == this.state.user.mixtapes[i].href) {
      //       this.state.user.mixtapes[i].items = this.state.selectedMixtape.items;
      //       break;
      //     }
      //   }
      //   let db = new DatabaseHandler();
      //   db.updateUser(this.state.user, (res) => console.log(res));
      // })

      // this.updateSongIndices(mixtape);
    }
    setSelectedSong = (track) => {
      console.log("set track", track);
      this.setState({
        selectedSong: track
      })
      // console.log("set song", track);
    }
    updateSongIndices = (mixtape) => {
      for (var i=0; i<mixtape.songs.length; i++) {
        mixtape.songs[i].index = i+1;
      }
      this.setState({
        selectedMixtape: mixtape
      })
      console.log("updated", this.state.selectedMixtape)
    }
    moveUp = (index) => {
      if (index > 1) {
        let temp = this.state.selectedMixtape.songs[index-1];
        this.state.selectedMixtape.songs[index-1] = this.state.selectedMixtape.songs[index-2]
        this.state.selectedMixtape.songs[index-2] = temp;
        temp = this.state.selectedMixtape.songs[index-1].index;
        this.state.selectedMixtape.songs[index-1].index = this.state.selectedMixtape.songs[index-2].index;
        this.state.selectedMixtape.songs[index-2].index = temp;
      }
    }
    moveDown = (index) => {
      if (index < this.state.selectedMixtape.songs.length) {
        let temp = this.state.selectedMixtape.songs[index-1];
        this.state.selectedMixtape.songs[index-1] = this.state.selectedMixtape.songs[index]
        this.state.selectedMixtape.songs[index] = temp;
        temp = this.state.selectedMixtape.songs[index-1].index;
        this.state.selectedMixtape.songs[index-1].index = this.state.selectedMixtape.songs[index].index;
        this.state.selectedMixtape.songs[index].index = temp;
      }
    }
    remove = (index) => {
      if (index >= 1 && index <= this.state.selectedMixtape.songs.length) {
        this.state.selectedMixtape.songs = this.state.selectedMixtape.songs.filter((song) => {
          return song.index != index;
        })
      }
      // this.updateSongIndices(this.state.selectedMixtape)
    }
    addSong = () => {
      // let newSong = {
      //   song_name: "song name" + this.state.selectedMixtape.songs.length,
      //   song_author: "song author" + this.state.selectedMixtape.songs.length,
      //   song_photo: "https://source.unsplash.com/user/erondu/600x600",
      //   index: this.state.selectedMixtape.songs.length + 1
      // }
      // let updatedMixtape = this.state.selectedMixtape
      // updatedMixtape.songs.push(newSong);
      // this.setState({
      //   selectedMixtape: updatedMixtape
      // })

    }
    play = (e) => {
      e.preventDefault();
      console.log("play")
      let url = "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86";
      var a = new Audio(url);
      a.play();
    }
    onKeyDown = (e) => {
      if (e.keyCode == 13) {
        console.log("prevent default", e.keyCode)
        e.preventDefault();
        this.search();
      }
    }
    goNextSong = (currentSongIndex) => {
      if (this.state.selectedMixtape.songs != []) {
        if (currentSongIndex < this.state.selectedMixtape.songs.length) {
          let nextSong = this.state.selectedMixtape.songs[currentSongIndex]
          this.setSelectedSong(nextSong);
        }
      }
    }
    goPrevSong = (currentSongIndex) => {
      if (this.state.selectedMixtape.songs != []) {
        if (currentSongIndex > 1) {
          let prevSong = this.state.selectedMixtape.songs[currentSongIndex - 2]
          this.setSelectedSong(prevSong);
        }
      }
    }
    addToMixtape = (song) => {
      return;
    }

    renderMixtapeTable = () => {
      // console.log(this.props.user)
      // console.log(localStorage.getItem("user"));
      // let user = localStorage.getItem("user");
      return <MixtapeTable 
      mixtapes={this.state.user.mixtapes} 
      // mixtapes={user.mixtapes} 
      user={this.state.user}
      selectedMixtape = {this.state.selectedMixtape}
      setSelectedMixtape={this.setSelectedMixtape}
      setRenderMixtapeOverlay={this.setRenderMixtapeOverlay}
      setRenderMore={this.setRenderMore}
      setRenderSendMixtapeOverlay={this.setRenderSendMixtapeOverlay}
      currentUser={this.props.user}
      ></MixtapeTable>
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

    setRenderMixtapeOverlay = (val) => {
      this.setState({
        renderMixtapeOverlay: val
      })
    }

    renderMixtapeOverlay = () => {
      if (this.state.renderMixtapeOverlay) {
        return <MixtapeOverlay 
                mixtape={this.state.selectedMixtape} 
                setSelectedSong={this.setSelectedSong}
                selectedSong={this.state.selectedSong}
                moveUp={this.moveUp}
                moveDown={this.moveDown}
                remove={this.remove}
                addSong={this.addSong}
                setRenderMixtapeOverlay={this.setRenderMixtapeOverlay}
                user={this.props.user}
                setPlayMusicOverlay={this.setPlayMusicOverlay}
              ></MixtapeOverlay>
      }
    }

    removeMixtape = (mixtapeToRemove) => {
      if (this.state.user) {
        // this.state.user.mixtapes = this.state.user.mixtapes.filter((mixtape) => {
        //   if (mixtape.id != mixtapeToRemove.id) {
        //     return mixtape;
        //   }
        // });
        // localStorage.setItem('user', JSON.stringify(this.state.user));
        let db = new DatabaseHandler();
        db.deleteMixtape(this.state.user, mixtapeToRemove, (res) => {
          // console.log(this.state.user);
          this.setRenderMore(false);
          db.refreshUser(this.state.user);
        });
        
      }
      console.log(mixtapeToRemove);
    }

    setRenderMore = (mixtape) => {
      this.setState({
        renderMore: mixtape
      })
    }

    renderMore = () => {
      if (this.state.renderMore) {
        return<MyMixtapePageMoreOverlay
        mixtape={this.state.selectedMixtape}
        removeMixtape={this.removeMixtape}
        setRenderMore={this.setRenderMore}
        currentUser={this.state.user}
        setRenderMixtapeOverlay={this.setRenderMixtapeOverlay}
        setSelectedMixtape={this.setSelectedMixtape}
        setRenderSendMixtapeOverlay={this.setRenderSendMixtapeOverlay}
        ></MyMixtapePageMoreOverlay>
      }
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
        mixtape={this.state.selectedMixtape}
        goPrevSong={this.goPrevSong}
        goNextSong={this.goNextSong}
        setPlayMusicOverlay={this.setPlayMusicOverlay}
      ></PlayMusicOverlay>
      }
    }

    renderSendMixtapeOverlay = () => {
      if (this.state.renderSendMixtapeOverlay) {
        console.log("true")
        return(
            <SendMixtapeOverlay
              user={this.state.user}
              mixtape={this.state.selectedMixtape}
              setRenderSendMixtapeOverlay={this.setRenderSendMixtapeOverlay}
            ></SendMixtapeOverlay>
        )
      }
    }

    setRenderSendMixtapeOverlay = (val) => {
      console.log("set")
      this.setState({
        renderSendMixtapeOverlay: val
      })
    }

    onClick = () => {
      console.log(this.props)
    }
    render() {
        return(
          <div className="my_mixtape_page" id ="my_mixtape_page">
            <center>
            {/* <buton onClick={this.onClick}>asdasdasdasd</buton> */}
            {/* <Navbar bg="#2d2d31" variant="dark" expand="md"> */}
            <a class="navbar-brand" className="my_mixtape_page_songify nav_bar" id="mixtape_songify_link" href="/main_page">Songify</a>
                {/* <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" className="my_mixtape_page_my_mixtapes nav_bar" id="mixtape_my_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link active" className="my_mixtape_page_story nav_bar"id="mixtape_story_link" href="/story_page">Story</a>
                    </div>
                </div> */}
                <a class="nav-item nav-link active" className="my_mixtape_page_my_mixtapes nav_bar" id="mixtape_my_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" className="my_mixtape_page_story nav_bar"id="mixtape_story_link" href="/story_page">Story</a>
                <div>
                  <img src={this.getUserImage()} id="my_mixtape_page_profile_pic_icon" className="my_mixtape_page_profile_pic circle_img pointer_on_hover" onClick={this.showSidebar}></img>
                </div>
            {/* </Navbar> */}
            <div className="search_bar_container">
            <form className="search_container">
                <input id="search_input" className="search_bar" type="search" placeholder="Search" aria-label="Search" onKeyDown={this.onKeyDown}/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <button id="search" className="search_button" type="submit"><i class="fa fa-search" onClick={this.search}></i></button>
            </form>
            </div>
            {this.renderMixtapeTable()}
            {this.renderPlayMusicOverlay()}
            <AddToMixtapeOverlay></AddToMixtapeOverlay>
            {/* <MyMixtapePageMoreOverlay></MyMixtapePageMoreOverlay> */}
            {this.renderMore()}
            <Sidebar
            handleLogout={this.props.handleLogout}
            user={this.state.user}
            ></Sidebar>
            {this.renderSendMixtapeOverlay()}
            {this.renderMixtapeOverlay()}
            {this.renderSearchResult()}
            <LoginOverlay
              handleSubmit={this.props.handleSubmit}
              // handleLogout={this.props.handleLogout}
            ></LoginOverlay>
            <SignupOverlay
              // onSignUp={this.onSignUp}
              handleSubmit={this.props.handleSubmit}
            ></SignupOverlay>
            </center>
          </div>
        )
    }
  }
  
  export default MixtapePage;