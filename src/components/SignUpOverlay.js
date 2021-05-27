import React from 'react';
import './mainPage.css';
import DatabaseHandler from './databaseHandler';

class SignUpOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_msg: ""
        }
    }
    hide = function() {
        window.document.getElementById("signup_overlay_container").style.display = "none";
    }
    show = function() {
        window.document.getElementById("signup_overlay_container").style.display = "block";
    }
    hideSignupOverlay = function() {
        window.document.getElementById("signup_overlay_container").style.display = "none";
    }
    // onChangeEmail = (e) => {
    //     if (e) {
    //         e.preventDefault();
    //     }
    // }
    // onChangeusername = (e) => {
    //     if (e) {
    //         e.preventDefault();
    //     }
    // }
    // onChangeAccountName = (e) => {
    //     if (e) {
    //         e.preventDefault();
    //     }
    // }
    // onChangePassword = (e) => {
    //     if (e) {
    //         e.preventDefault();
    //     }
    // }

    onKeyDown = (e) => {
        if (e.keyCode == 13) {
          console.log("prevent default", e.keyCode)
          e.preventDefault();
          this.onSignUp(e);
        }
      }

    onSignUp = (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("working");
        let username = document.getElementById("signup_overlay_username").value;
        let db = new DatabaseHandler();
        db.findUsername(username, this.addUserIfUnique);
    }

    addUserIfUnique = (data) => {
        let email = document.getElementById("signup_overlay_email").value;
        let username = document.getElementById("signup_overlay_username").value;
        let accountname = document.getElementById("signup_overlay_accountname").value;
        let password = document.getElementById("signup_overlay_password").value;
        let confirmedPassword = document.getElementById("signup_overlay_password_confirm").value;
        if (data.length == 0) {
            if (password != confirmedPassword) {
                this.setState({
                    error_msg: "passwords don't match"
                })
                return;
            }
            let newUser = {
                username: username,
                password: password,
                account_name: accountname,
                account_profile_pic: "",
                account_email: email,
                mixtapes: [],
                stories: [],
                state: {
                    mood: "",
                    song: ""
                },
                friend_system: {
                    friends: [],
                    received_requests: [],
                    sent_requests: [],
                    received_mixtapes: [],
                    set_mixtapes: []
                }

            }
            let db = new DatabaseHandler();
            db.addUser(newUser, (res) => {
                if (res.status == 200) {
                    this.props.handleSubmit(null, newUser.username, newUser.password);
                }
            });
        }
        else {
            this.setState({
                error_msg: "username already exist"
            })
            return;
        }
    }

    
    render() {
        return(
            <div id="signup_overlay_container">
                <div className="signup_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x login_overlay_exit" onClick={this.hide}></i>
                    <table className="signup_overlay_table">
                        <tr>
                            <td className="signup_overlay_edit pointer_on_hover" style={{fontSize: 60}}>Sign Up</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td className="signup_overlay_email_wrapper">
                                <form className="signup_overlay_email_container">
                                    <input className="search_bar" id="signup_overlay_email" onKeyDown={this.onKeyDown} style={{fontSize: 25, height: '50px', width: '450px'}}type="search" placeholder="Enter Email Address" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td className="signup_overlay_accountname_wrapper">
                                <form className="signup_overlay_accountname_container">
                                    <input className="search_bar" id="signup_overlay_accountname" onKeyDown={this.onKeyDown} style={{fontSize: 25, height: '50px', width: '450px'}}type="search" placeholder="Create Account Name" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    
                                </form>
                            </td>
                        </tr>
                        <tr>
                        <td className="signup_overlay_username_wrapper">
                                <form className="signup_overlay_username_container">
                                    <input className="search_bar" id="signup_overlay_username" onKeyDown={this.onKeyDown} style={{fontSize: 25, height: '50px', width: '450px'}}type="search" placeholder="Create Username" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    
                                </form>
                            </td>
                        </tr>
                        <tr>
                        <td className="signup_overlay_password_wrapper">
                                <form className="signup_overlay_password_container">
                                    <input className="search_bar" autocomplete="off" id="signup_overlay_password" onKeyDown={this.onKeyDown} style={{fontSize: 25, height: '50px', width: '450px'}}type="search" placeholder="Create Password" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    
                                </form>
                            </td>
                        </tr>
                        <tr>
                        <td className="signup_overlay_password_confirm_wrapper">
                                <form className="signup_overlay_password_confirm_container">
                                    <input className="search_bar" autocomplete="off" id="signup_overlay_password_confirm" onKeyDown={this.onKeyDown} style={{fontSize: 25, height: '50px', width: '450px'}}type="search" placeholder="Confirm Password" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    
                                </form>
                            </td>
                        </tr>
                        <tr>
                        <p style={{color:"red"}}>{this.state.error_msg}</p>
                        <td className="signup_overlay_sign_up">
                                <form className="signup_overlay_signup_container">
                                <button type="button" style ={{fontSize: 30, border: 'solid', borderColor: "grey", borderRadius: 12, left: "-307%", position: "relative", width: "163%"}} class="btn btn-dark" onClick={this.onSignUp}>Sign Up</button>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    
                                </form>
                            </td>
                        </tr>
                
                    </table>
                </div>
            </div>
        )
    }
}
  
export default SignUpOverlay;