import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './storyPage.css'
import { Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import StoryMusicOverlay from './storyMusicOverlay';
import DatabaseHandler from './databaseHandler';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';


class StoryBoxesItem extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = ({
            getUserProfilePic: "",
            renderDeleteButton: false
        })
        this.setUserProfilePic();
    }
    renderTitle() {
        // console.log(this.props)
        return (
            <span>{this.props.story_message}</span>
        )
    }
    renderPublisher() {
        return (
            <span>{this.props.story_publisher}</span>
        )
    }
    showSidebar = () => {
        document.getElementById("sidebar_wrapper").style.width = "400px";
        document.getElementById("sidebar_container").style.display = "block";
      }

    renderButtons() {
        return(
            <span>
                <button>Edit</button>
                <button>Delete</button>
            </span>
        )
    }
    show = () => {
        // window.document.getElementById("story_play_music_overlay_container").style.display = "block";
        this.props.setPlayMusicOverlay(true);
        this.props.setSelectedStory(this.props);
        // console.log(this.props)
    }

    getStoryTrackImage = () => {
        // console.log(this.props)
        if (this.props.track && this.props.track.album.images[0].url != "") {
            // console.log(this.props.track)
            return this.props.track.album.images[0].url;
        }
        else {
            return "https://source.unsplash.com/user/erondu/100x100";
        }
    }
    setUserProfilePic = () => {
        // if (this.props.user.account_profile_pic != "") {
        //     return this.props.user.account_profile_pic;
        // }
        // else {
        //     return "https://source.unsplash.com/user/erondu/100x100"
        // }
        this.getUser(this.props.story_publisher, (res) => {
            if (res[0]) {
                // console.log(this.props.story_publisher);
                // console.log(res[0].account_profile_pic)
                this.setState({
                    userProfilePic: res[0].account_profile_pic
                })
                if (res[0].account_profile_pic == "") {
                    this.setState({
                        userProfilePic: "https://source.unsplash.com/user/erondu/100x100"
                    })
                }
            }
            else {
                this.setState({
                    userProfilePic: "https://source.unsplash.com/user/erondu/100x100"
                })
            }
        });        
    }

    setRenderDeleteButton = (val) => {
        this.setState({
            renderDeleteButton: val
        })
    }

    renderDeleteButton = () => {
        // console.log(this.props.isFromMyStories)
        if (this.state.renderDeleteButton) {
            return(
                <i class="fa fa-times-circle fa-5x story_item_delete_button" onClick={this.deleteStory}></i>
                // <button onClick={this.deleteStory}>delete</button>
            )
        }
    }

    deleteStory = (e) => {
        e.stopPropagation();
        console.log("delete")
        let db = new DatabaseHandler();
        db.deleteStory(this.props, this.props.user, (res) => {
            if (res.status == 200) {
                db.refreshUser(this.props.user);
            }
        })
    }

    getUser = (account_name, callback) => {
        let db = new DatabaseHandler();
        db.findAccountName(account_name, (res) => {
            callback(res)
        })
    }

    render() {
        return (
            <tr className = "storyBox" onClick= {this.show} 
            onMouseEnter={()=> {this.setRenderDeleteButton(true)}}
            onMouseLeave={()=> {this.setRenderDeleteButton(false)}}>
                <th scope="row" className="pointer_on_hover">
                    <img src={this.getStoryTrackImage()} id="_1"></img>
                </th>
                <td> 
                    <div className = "storybox_title">
                        {this.renderTitle()}
                    </div>
                    <td>
                        <img src={this.state.userProfilePic} className="publisher_profile_pic circle_img pointer_on_hover" onClick={this.showSidebar}></img>
                    </td>
                    <td>
                        <div className = "storybox_publisher">
                            {this.renderPublisher()}
                        </div>
                    </td>
                </td>
                {this.renderDeleteButton()}
            </tr>
        )
    }
}


  export default StoryBoxesItem;