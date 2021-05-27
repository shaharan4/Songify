import React from 'react';
import './overlay.css';
import DatabaseHandler from './databaseHandler';

class ManageAccountOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }
    
    save = () => {
        let newUsername = document.getElementById("manage_account_overlay_username").value;
        let password = document.getElementById("manage_account_overlay_password").value;
        let account_name = document.getElementById("manage_account_overlay_account_name").value;
        let account_email = document.getElementById("manage_account_overlay_email").value;
        let account_profile_pic = document.getElementById("manage_account_overlay_profile_pic").value;
        let newUser = this.state.user;
        if (newUsername != "") {
                let db = new DatabaseHandler();
                db.findUsername(newUsername, (data) => {
                if (data.length == 0) {
                    newUser.username = newUsername;
                }
            });
        }
        
        if (password != "") {
            newUser.password = password;
        }
        if (account_name != "") {
            newUser.account_name = account_name;
        }
        if (account_email != "") {
            newUser.account_email = account_email;
        }
        if (account_profile_pic != "") {
            newUser.account_profile_pic = account_profile_pic;
        }
        this.setState({
            user: newUser
        }, () => {
            let db = new DatabaseHandler();
            db.updateUser(this.state.user, () => {
                // localStorage.setItem('user', JSON.stringify(this.state.user));
                // window.location.reload();
                db.refreshUser(this.state.user);
            })    
        })
        
        // let db = new DatabaseHandler()
        // db.updateUser(this.state.user, () => {
        //     localStorage.setItem('user', JSON.stringify(this.state.user));
        //     window.location.reload();
        // })
    }
    close = () => {
        this.props.setRenderManageAccount(false);
    }
    render() {
        return(
                <div id="manage_account_overlay_container">
                    <div className="manage_account_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x manage_account_overlay_exit pointer_on_hover" onClick={this.close}></i>
                    <img src={this.state.user.account_profile_pic} className="manage_profile_photo"></img>
                        <div className="manage_account_overlay_profile_pic">
                            <text className="manage_account_overlay_profile_pic_1">Profile Picture URL: </text>
                            <input id="manage_account_overlay_profile_pic" placeholder={this.state.user.account_profile_pic}></input>
                        </div>
                        <div className="manage_account_overlay_username">
                            <text className="manage_account_overlay_username_1">Username : </text>
                            <input id="manage_account_overlay_username" placeholder={this.state.user.username}></input>
                        </div>
                        <div className="manage_account_overlay_password">
                            <text className="manage_account_overlay_password_1">Password : </text>
                            <input id="manage_account_overlay_password" placeholder={this.state.user.password}></input>
                        </div>
                        <div className="manage_account_overlay_account_name">
                            <text className="manage_account_overlay_account_name_1">Account Name : </text>
                            <input id="manage_account_overlay_account_name" placeholder={this.state.user.account_name}></input>
                        </div>
                        <div className="manage_account_overlay_email">
                            <text className="manage_account_overlay_email_1">Account Email : </text>
                            <input id="manage_account_overlay_email" placeholder={this.state.user.account_email}></input>
                        </div>
                        <button className="manage_save_button btn btn-light" onClick={this.save}>Save Changes</button>
                    </div>
                </div>
        )
    }
}
  
export default ManageAccountOverlay;