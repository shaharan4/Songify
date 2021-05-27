import React from 'react';
import DatabaseHandler from './databaseHandler';
import './overlay.css';
import SendMixtapeOverlayCard from './sendMixtapeOverlayCard';


class SendMixtapeOverlay extends React.Component {
    constructor(props) {
        super(props);
        // this.db = new DatabaseHandler();
        // console.log(this.props)
        this.state = {
            user: this.props.user
        }
    }
    hide = () => {
        // document.getElementById("send_mixtape_overlay_wrapper").style.width = "0px";
        // document.getElementById("sidebar_container").style.opacity = "0";
        document.getElementById("send_mixtape_overlay_container").style.display = "none";
    }
    show = () => {
        window.document.getElementById("my_mixtape_more_overlay_container").style.display = "block";
    }
    showMixtape = () => {
        window.document.getElementById("mixtape_overlay_container").style.display = "block";
    }

    removeMixtape = () => {
        this.props.removeMixtape(this.props.mixtape);
    }

    renderFriendList = () => {
        if (this.state.user.friend_system.friends) {
            return this.state.user.friend_system.friends.map((friend) => {
                // let found_friend = this.db.findUsername(friend.username, (res) => console.log(res));
                return(
                        // <tr className="friend" onClick={this.sendMixtapeTo(friend)}>
                        //     <td>
                        //         <img src="https://source.unsplash.com/user/erondu/80x80" className="circle_img"></img>
                        //     </td>
                        //     <td>
                        //         <p className="friend_name" style={{color: 'white'}}>{friend.username}</p>
                        //         <p className="friend_mood">"{friend.mood}"</p>
                        //     </td>
                        // </tr>
                    <SendMixtapeOverlayCard
                    friend={friend}
                    sendMixtapeTo={this.sendMixtapeTo}
                    ></SendMixtapeOverlayCard>
                )
            })
        }
        // return <div>asd</div>
    }
    
    sendMixtapeTo = (friend) => {
        let db = new DatabaseHandler();
        console.log("from", this.state.user.username, "to", friend.username);
        db.sendMixtapeTo(this.state.user, friend, this.props.mixtape, (res)=>{
            this.props.setRenderSendMixtapeOverlay(false);
        });
    }

    close = () => {
        this.props.setRenderSendMixtapeOverlay(false);
    }

    onClick = () => {
        console.log(this.props);
    }

    render() {
        return(
            <div id="send_mixtape_overlay_container">
                {/* <button onClick={this.onClick}>click</button> */}
                <div id="send_mixtape_overlay_wrapper">
                <i class="fa fa-times-circle fa-5x send_mixtape_overlay_closebtn" onClick={this.close}></i>
                    <table className="friend_list">
                        <tr className="friend_list_header">
                            Your Friends
                        </tr>
                        {this.renderFriendList()}
                    </table>
                </div>
            </div>
        )
    }
}
  
export default SendMixtapeOverlay;