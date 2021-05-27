import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
   } from "react-bootstrap";
import logo from '../logo.svg'
import styles from './storyPage.css'
import { Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import StoryBoxes from './StoryBoxes'
import StoryCreate from './StoryCreate'
import StoryMusicOverlay from './storyMusicOverlay';
import StoryAddOverlay from './storyAddOverlay';
import Sidebar from './sidebar';
import StoryTabs from './storyTabs';
import LoginOverlay from './LoginOverlay';
import SignupOverlay from './SignUpOverlay';
import { dark } from '@material-ui/core/styles/createPalette';
import DatabaseHandler from './databaseHandler';
import PlayMusicOverlay from './playMusicOverlay';
const mongoose = require('mongoose');
var Client = require('mongodb').MongoClient;

function reroute() {
    window.location.href='/main_page'
}
function rerouteMixtapePage() {
  window.location.href='/my_mixtape_page'
}
function rerouteStoryPage() {
  window.location.href='/story_page'
}



class storyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // storyItems: [
            //     // {
            //     //     title : 'It was a great day, today I bought a lottery ...',
            //     //     publisher : "Eric Kim",
            //     //     completed : false
            //     // },
            //     // {
            //     //     title : 'Today is a good day to listen songs ',
            //     //     publisher : "Xin",
            //     //     completed : false
            //     // },
            //     // {
            //     //     title : 'gim',
            //     //     publisher : "Xin",
            //     //     completed : false
            //     // },
            //     // {
            //     //     title : 'Today is a bad day to listen songs',
            //     //     publisher : "Shah",
            //     //     completed : false
            //     // }
            // ],
            renderSidebar: false,
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
              renderStoryAddOverlay: false,
              renderPlayMusicOverlay: false,
              randomStories: [],
              selectedStory: {},
              ifFromMyStories: true
        }
        let db = new DatabaseHandler();
        db.getRandomStories(10, (stories) => this.setState(
          {
            randomStories: stories
          }
        ))
    }

    
    createItem = (item, name) => {
        if(this.state.storyItems != null){
            // console.log("FIXED");
            this.state.storyItems.push({
                title : item,
                publisher : name,
                completed: false,
            })
            this.setState({
                username:this.username,
                publisher:this.publisher,
                storyItems:this.state.storyItems
            })
            console.log(this.state.storyItems);
            // console.log("FIXED");
        }
        // console.log("notFIXED");
    }

    deleteItem = (item) => {
        var index = this.state.storyItems.findIndex(x => x.title === "gim");
        console.log("index is this --> ",index);

        this.state.storyItems.splice(index, 1);
        this.setState({
            username:this.username,
            publisher:this.publisher,
            storyItems:this.state.storyItems
        })
        console.log(this.state.storyItems);
    }

    
    showSidebar = () => {
        // document.getElementById("sidebar_wrapper").style.width = "400px";
        // document.getElementById("sidebar_container").style.display = "block";
        this.setState({
            renderSidebar: true
        })
    }

    showSidebar = () => {
        if (this.props.user) {
            document.getElementById("sidebar_wrapper").style.width = "400px";
            document.getElementById("sidebar_container").style.display = "block";
        }
        else {
            window.document.getElementById("login_overlay_container").style.display = "block";
        }
    }


    showCreate = function() {
        document.getElementById("story_add_overlay_container").style.display = "block";
    }


   
    
    componentWillMount() {
        // fetch('api/')
        //     .then(res=>res.json())
        //     .then(data=>this.setState({username:data.username, password:data.password}));
        // console.log("first come ===" + this.props.user.stories);

        // this.setState({
          // username:this.props.user.account_name,
          // // publisher:this.publisher,
          // storyItems:this.props.user.storyies
      // })
    }

    // componentWillUpdate(){
        // var text = document.getElementById("story_input").value;
        // console.log("THE TEXT IS === ", text);
    // }

    setRenderStoryAddOverlay = (val) => {
      this.setState({
        renderStoryAddOverlay: val
      })
      // this.state.renderStoryAddOverlay = val;
      console.log("setRenderStoryAddOverlay", val)
    }

    setRenderStoryAddOverlayToTrue = () => {
      if (this.props.user) {
        this.setState({
          renderStoryAddOverlay: true
        })
      }
    }

    returnStoryAddOverlay = () => {
      if (this.state.renderStoryAddOverlay) {
        return(
          <StoryAddOverlay onSubmit={(textmessage) => {
            this.createItem(textmessage, "hi");
            this.setState({
                username:this.username,
                publisher:this.publisher,
                storyItems:this.state.storyItems,
            })
        }}
        user={this.state.user}
        setRenderStoryAddOverlay={this.setRenderStoryAddOverlay}
        setPlayMusicOverlay={this.setPlayMusicOverlay}
        setSelectedStory={this.setSelectedStory}
        ></StoryAddOverlay>
        )
      }
    }

    renderStoryBoxes = () => {
      if (this.props.user) {
        console.log(this.state.ifFromMyStories)
        return(
          <StoryBoxes 
          storyItems={this.props.user.stories}
          setSelectedStory={this.setSelectedStory}
          setPlayMusicOverlay={this.setPlayMusicOverlay}
          ifFromMyStories={this.state.ifFromMyStories}
          user={this.props.user}/>
        )
      }
      else {
        console.log(this.state.ifFromMyStories)
        return(
          <StoryBoxes 
          storyItems = {this.state.user.stories}
          setSelectedStory={this.setSelectedStory}
          setPlayMusicOverlay={this.setPlayMusicOverlay}
          ifFromMyStories={this.state.ifFromMyStories}
          user={this.state.user} />
        )
      }
    }

    setRandomStories = (stories) => {
      this.setState({
        randomStories: stories
      })
      // console.log(this.state.randomStories[0].story_message)
    }

    setSelectedStory = (story) => {
      this.setState({
        selectedStory: story
      })
    }
    setSelectedSong = (song) => {
      let story = this.state.selectedStory;
      story.track = song;
      this.setState({
        selectedStory: story
      })
    }
    setPlayMusicOverlay = (val) => {
      console.log(val);
      this.setState({
        renderPlayMusicOverlay: val
      })
    }

    renderRandomStories = () => {
      return(
        <StoryBoxes 
        storyItems = {this.state.randomStories}
        setSelectedStory={this.setSelectedStory}
        setPlayMusicOverlay={this.setPlayMusicOverlay}
        ifFromMyStories={false}
        user={this.props.user}
        />
      )
    }

    renderPlayMusicOverlay = () => {
      if (this.state.renderPlayMusicOverlay) {
      //   return <PlayMusicOverlay 
      //   song={this.state.selectedSong}
      //   mixtape={this.state.newMixtape}
      //   goPrevSong={this.goPrevSong}
      //   goNextSong={this.goNextSong}
      //   setPlayMusicOverlay={this.setPlayMusicOverlay}
      //   story={this.selectedStory}
      //   fromStoryPage={true}
      // ></PlayMusicOverlay>
        return <StoryMusicOverlay
        user={this.props.user}
        story={this.state.selectedStory}
        setPlayMusicOverlay={this.setPlayMusicOverlay}
        ></StoryMusicOverlay>
      }
    }

    goPrevSong = () => {

    }
    goNextSong = () => {
      
    }

    setPlayMusicOverlay = (val) => {
      this.setState({
        renderPlayMusicOverlay: val
      })
    }

    refresh = () => {
      console.log("on click")
      let db = new DatabaseHandler();
      db.getRandomStories(10, this.setRandomStories);

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


    //when function open use onClick={() => this.delete or create
    render() {
        

        

        return (
            
            <div className="story_page" id="story_page">
              <center>
              {/* <button className="tempButton btn btn-light" onClick={this.onClick}>See More Stories...</button> */}
              {/* <Navbar bg="#2d2d31" variant="dark" expand="md"> */}
            <a class="navbar-brand" className="story_page_songify nav_bar" id="story_page_songify_link" href="/main_page">Songify</a>
                {/* <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" className="story_page_my_mixtapes nav_bar" id="story_page_my_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link active" className="story_page_story nav_bar"id="story_page_story_link" href="/story_page">Story</a>
                    </div>
                </div> */}
                <a class="nav-item nav-link active" className="story_page_my_mixtapes nav_bar" id="story_page_my_mixtapes_link" href="/my_mixtape_page">My Mixtapes <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" className="story_page_story nav_bar"id="story_page_story_link" href="/story_page">Story</a>
                <div>
                  <img src={this.getUserImage()} id="story_page_page_profile_pic_icon" className="story_page_profile_pic circle_img pointer_on_hover" onClick={this.showSidebar}></img>
                </div>
            {/* </Navbar> */}
                {/* Head */}
                {/* <Router>
                    <div to="/main_page" onClick={reroute} id = "Songify"> 
                        <span>Songify</span>
                    </div>
                </Router>
                
                <Router>
                    <div to="/my_mixtape_page" onClick={rerouteMixtapePage} id = "MyMixtapes"> 
                        <span>My Mixtapes</span>
                    </div>
                </Router>
                <Router>
                    <div to="/story_page" onClick={rerouteStoryPage} id = "Story">
                        <span>Story </span>
                    </div>
                </Router> */}
                
                {/* <StyledTabs  aria-label="styled tabs example">
                    <StyledTab label="Workflows" />
                    <StyledTab label="Datasets" />
                    <StyledTab label="Connections" />
                </StyledTabs> */}
                <button className="btn btn-light" onClick={this.refresh}>Get Stories</button>
                <StyledTabs className = "storyTabs" defaultActiveKey="home" transition={false} >
                    <StyledTab eventKey="home" title="My Stories">
                        
                        <div className = "container" >
                          {this.renderStoryBoxes()}
                            {/* <StoryBoxes storyItems = {this.props.user.stories} /> */}
                        </div>
                    </StyledTab>
                    <StyledTab eventKey="profile" title="Stories">
                      <div className = "container" >
                        {this.renderRandomStories()}
                      </div>
                    </StyledTab>
                </StyledTabs>
                
                
                <div className="Addstory" onClick={this.setRenderStoryAddOverlayToTrue}> 
                        <span>Add Story </span>
                </div>
                {/* <StoryMusicOverlay></StoryMusicOverlay> */}
                {/* <StoryAddOverlay onSubmit={function(textmessage){
                    this.createItem(textmessage, "hi");
                    this.setState({
                        username:this.username,
                        publisher:this.publisher,
                        storyItems:this.state.storyItems,
                    })
                }.bind(this)}
                user={this.state.user}
                ></StoryAddOverlay> */}
                {this.returnStoryAddOverlay()}
                <Sidebar
                handleLogout={this.props.handleLogout}
                user={this.state.user}
                ></Sidebar>
                {/* {this.renderSidebar()} */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                
                <LoginOverlay
                handleSubmit={this.props.handleSubmit}
                ></LoginOverlay>
                <SignupOverlay
                handleSubmit={this.props.handleSubmit}
                ></SignupOverlay>
                </center>
                {this.renderPlayMusicOverlay()}
            </div>
            

            
            
        )
    }
}

const thisstyles = StyleSheet.create({
    container: {
        flex: 1,
        
      },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });

  const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  
  const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
  }))((props) => <Tab disableRipple {...props} />);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    padding: {
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
  }));
  

  export default storyPage;