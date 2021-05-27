import React from 'react';
import DatabaseHandler from './databaseHandler';
import FriendOverlay from "./FriendOverlay";
import ManageAccountOverlay from './ManageAccountOverlay';
import './overlay.css'
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.db = new DatabaseHandler();
        console.log(this.props)
        this.state = {
            user: this.props.user,
            renderManageAccount: false
        }
        // window.addEventListener("click", (e) => {console.log(e.target)});
    }
    hide = function() {
        document.getElementById("sidebar_wrapper").style.width = "0px";
        // document.getElementById("sidebar_container").style.opacity = "0";
        document.getElementById("sidebar_container").style.display = "none";
    }
    show = function() {
        document.getElementById("sidebar_wrapper").style.width = "400px";
        document.getElementById("sidebar_container").style.display = "block";
    }
    showFriendOverlay = () => {
        document.getElementById("friend_overlay_container").style.display = "block";
        this.onAddUser();
    }
    onAddUser = () => {
        // let account_name = document.getElementById("friend_search_bar").value;
        // this.db.findAccountName(account_name, (data) => {
        //     console.log(data);
        // })
    }
    renderManageAccount = () => {
        if (this.state.renderManageAccount) {
            return <ManageAccountOverlay
                user={this.props.user}
                setRenderManageAccount={this.setRenderManageAccount}
            ></ManageAccountOverlay>
        }
    }
    setRenderManageAccount = (val) => {
        this.setState({
            renderManageAccount: val
        })
    }
    removeFriend = (friend) => {
        let db = new DatabaseHandler();
        db.removeFriend(this.props.user.username, friend.username, (res) => {
            console.log(res);
            // if (res.status == 200) {
                db.refreshUser(this.props.user);
            // }
        });
        console.log(this.props.user.username, "remove", friend.username);
        // console.log("remove firned")
    }
    handleLogout = () =>{
        this.props.handleLogout();

    }
    
    renderFriendList = () => {
        if (this.state.user.friend_system.friends) {
            return this.state.user.friend_system.friends.map((friend) => {
                // let found_friend = this.db.findUsername(friend.username, (res) => console.log(res));
                return(
                        <tr className="friend">
                            <td>
                                <img src="https://source.unsplash.com/user/erondu/80x80" className="circle_img hundredPixel"></img>
                            </td>
                            <td>
                                <p className="friend_name">{friend.username}</p>
                                <p className="friend_mood">"{friend.mood}"</p>
                            </td>
                            {/* <td onClick={() => this.removeFriend(friend)}>x</td> */}
                            <td className="delete_friend_button btn btn-danger" onClick={() => this.removeFriend(friend)}>Remove Friend</td>
                        </tr>
                )
            })
        }
        // return <div>asd</div>
    }

    render() {
        return (
            <div id="sidebar_container" >
                <div id="sidebar_wrapper">
                <i class="fa fa-times-circle fa-5x sidebar_closebtn" onClick={this.hide}></i>
                    <div className="sidebar_head">
                        <img src={this.state.user.account_profile_pic} className="circle_img hundredPixel"></img>
                        <p className="sidebar_head_name">{this.state.user.account_name}</p>
                        <p className="sidebar_head_mood">"{this.state.user.state.mood}"</p>
                    </div>
                    <div className="sidebar_body">
                        {/* <div className="friend_table"> */}
                            <div className= "friend_table_head_wrapper">
                                <div className="friend_table_head">
                                    Friends
                                    <input className="friend_search_bar" id="friend_search_bar"/>
                                    <p className="friend_add_button" onClick={this.showFriendOverlay}>+</p>
                                </div>
                            </div>
                            
                            <table className="friend_list">
                                {this.renderFriendList()}
                            </table>
                        {/* </div> */}
                    </div>
                    <div className="sidebar_foot">
                        <p className="manage_account" onClick={this.setRenderManageAccount}>Manage Account</p>
                        <p className="manage_account" onClick={this.handleLogout}>Log Out</p>
                    </div>
                </div>
                <FriendOverlay
                user={this.props.user}
                ></FriendOverlay>
                {this.renderManageAccount()}
            </div>
        )
    }
}

export default Sidebar;