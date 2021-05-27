import { Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import React from 'react';
import styles from './mainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageTable from './mainPageTable.js';
import {Navbar} from 'react-bootstrap';
import LoginOverlay from './LoginOverlay';
import SignupOverlay from './SignUpOverlay';
import Search from './search.js';
import SearchResultOverlay from './searchResultOverlay.js';
import PlayMusicOverlay from './playMusicOverlay.js';
import Sidebar from './sidebar.js';
import './mainPage.css';
import DatabaseHandler from './databaseHandler';

function reroute() {
    window.location.href='/main_page'
}
function rerouteMixtapePage() {
  window.location.href='/my_mixtape_page'
}
function rerouteStoryPage() {
  window.location.href='/story_page'
}

class MainPage extends React.Component{
  constructor(props){
    super(props);
    {this.getMixtapes()};
    this.state={
      user: this.props.user?this.props.user:{
        _id: "",
        username: "",
        password: "",
        account_name: "",
        stories: [],
        // mixtapes: this.mixtapes? JSON.parse(localStorage.getItem('data')): null,
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
      mixtapes: [],
      loggedIn : false,
      account: [{
        id: '',
        name: '',
      }],
      selectedMixtape: null,
      selectedSong: null,
      searchResult: {
        tracks: {
          items: []
        }
      },
      renderSearchResult: false,
      renderPlayMusicOverlay: false
    }
    // console.log(this.props);

  }
  // componentDidMount(){
  //   {this.getMixtapes()};
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
    let search_input = document.getElementById("search_input").value;
    if (search_input != "") {
      new Search(search_input, "track", this.setSearchResult);
      // this.showSearchResultOverlay();
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
    console.log(this.state.searchResult)
  }
  setRenderSearchResult = (val) => {
    this.setState({
        renderSearchResult: val
    })
  }
  renderSearchResult = () => {
    if (this.state.renderSearchResult) {
      return  <SearchResultOverlay
              tracks={this.state.searchResult}
              setSelectedSong={this.setSelectedSong}
              setSelectedMixtape={this.setSelectedMixtape}
              addToMixtape={this.addToMixtape}
              setRenderSearchResult={this.setRenderSearchResult}
              setPlayMusicOverlay={this.setPlayMusicOverlay}
              isFromMainPage={true}
          ></SearchResultOverlay>
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
  goPrevSong = () => {
    console.log(this.state.selectedMixtape)
  }
  goNextSong = () => {
    console.log(this.state.selectedMixtape)
  }
  setSelectedMixtape = (mixtape) => {
    console.log("set mixtape")
    this.setState({
      selectedMixtape: mixtape
    })
    // this.updateSongIndices(mixtape);
  }
  setSelectedSong = (song) => {
    this.setState({
      selectedSong: song
    })
    console.log("set song", song);
  }
  showSearchResultOverlay = () => {
    document.getElementById("search_result_overlay_container").style.display = "block";
  }
  addToMixtape = (song) => {
    return;
  }
  onSignIn = (user) => {
    // this.props.onSignIn(user);
    console.log(this.props);
  }
  onClick = () => {
    let db = new DatabaseHandler();
    db.test();
  }
  onSignUp = () => {

  }
  // handleSubmit = () => {
  //   console.log("subgmit");
  //   console.log(this.props);
  // }
  getUserImage = () => {
    if (this.props.user) {
      // return "https://picsum.photos/100";
      return this.props.user.account_profile_pic;
    }
    else {
      return "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg";
    }
  }
  // getMixtapes = () =>{
  //   let db = new DatabaseHandler;
  //   db.getMixtapes((data)=>{this.setState({mixtapes: data});
  //   localStorage.setItem('data', JSON.stringify(data))});

  // }
  getMixtapes = () =>{
    let db = new DatabaseHandler;
    db.getMixtapes((data)=>{this.setState({mixtapes: data});
    localStorage.setItem('data', JSON.stringify(data))});

  }
  setLoggedIn = () =>{
    this.setState({loggedIn: true});
  }
  setLoggedOut = () =>{
    this.setState({loggedIn: false});
  }

  render(){
    return (
      <div className="main_page" id="MainPage">
        <center>
        {/* <Navbar bg="#2d2d31" variant="dark" expand="md"> */}
          <a class="navbar-brand" className="my_mixtape_page_songify nav_bar" id="main_songify_link" href="/main_page">Songify</a>
          {/* <span className="my_mixtape_page_songify">Songify</span> */}
            {/* <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link active" className="my_mixtape_page_my_mixtapes nav_bar" id="main_my_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" className="my_mixtape_page_story nav_bar" id="main_story_link" href="/story_page">Story</a>
              </div>
            </div> */}
            {/* {this.state.loggedIn && */}
           {/* <div id="main_page_links_wrapper"> */}
           {localStorage.getItem('user') && 
            <a class="nav-item nav-link active" className="my_mixtape_page_my_mixtapes nav_bar" id="main_my_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
           }
            {localStorage.getItem('user') && 
            <a class="nav-item nav-link active" className="my_mixtape_page_story nav_bar" id="main_story_link" href="/story_page">Story</a>
           }
            {/* </div> */}
            {/* // } */}
        {/* </Navbar> */}
        {/* <nav className="navbar navbar-expand-sm bg-dark"> */}
                <div>
                  <img src={this.getUserImage()} id="main_page_profile_pic_icon" className="my_mixtape_page_profile_pic circle_img pointer_on_hover" onClick={this.showSidebar}></img>
                </div>
        {/* </nav> */}
        <div className="search_bar_container_main">
        <form className="search_container" id ="main_page_search">
          <input id="search_input" className="search_bar" type="search" placeholder="Search" aria-label="Search for music" onKeyDown={this.onKeyDown}/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <button className="search_button" type="submit"><i class="fa fa-search" onClick={this.search}></i></button>
        </form>
        </div>
        <MainPageTable
          mixtapes={this.state.mixtapes}
        ></MainPageTable>
        <LoginOverlay
          handleSubmit={this.props.handleSubmit}
          handleLogout={this.props.handleLogout}
        ></LoginOverlay>
        <SignupOverlay
          onSignUp={this.onSignUp}
          handleSubmit={this.props.handleSubmit}
        ></SignupOverlay>
          <Sidebar
            handleLogout={this.props.handleLogout}
            user={this.state.user}
          ></Sidebar>
        {this.renderSearchResult()}
        {this.renderPlayMusicOverlay()}
        {/* <SearchResultOverlay
          tracks={this.state.searchResult}
          setSelectedSong={this.setSelectedSong}
          setSelectedMixtape={this.setSelectedMixtape}
          addToMixtape={this.addToMixtape}
        ></SearchResultOverlay> */}
        {/* <PlayMusicOverlay 
          song={this.state.selectedSong}
          goPrevSong={this.goPrevSong}
          goNextSong={this.goNextSong}
        ></PlayMusicOverlay> */}
        </center>
      </div>
    );
    }
  }


export default MainPage;