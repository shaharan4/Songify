import React, { useState } from "react";
import './mainPage.css';
import DatabaseHandler from './databaseHandler';


class LoginOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_message: ""
        }
    }
    hide = function() {
        window.document.getElementById("login_overlay_container").style.display = "none";
    }
    show = function() {
        window.document.getElementById("login_overlay_container").style.display = "block";
    }
    showSignupOverlay = function() {
        window.document.getElementById("signup_overlay_container").style.display = "block";
        window.document.getElementById("login_overlay_container").style.display = "none";
      }

    onSignIn = () => {
        let username = document.getElementById("login_username").value;
        let password = document.getElementById("login_password").value;
        let db = new DatabaseHandler();
        // console.log(username, password)
        db.findUserWithPassword(username, password, this.checkSignIn);
        
    }
    checkSignIn = (res) => {
        console.log(res);
        if (res.data == null || res.data.length == 0) {
            console.log("incorrect username or password");
            this.setState({
                error_message: "incorrect username or password"
            })
        }
        else {
            console.log("login success");
            this.props.onSignIn(res.data[0]);
            this.setState({
                error_message: ""
            })
        }
    }

    handleSubmit = (e) => {
        let username = document.getElementById("login_username").value;
        let password = document.getElementById("login_password").value;
        this.props.handleSubmit(e, username, password, (msg) => {
            console.log(msg)
            this.setState({
                error_message: msg
            })
        });
    }

    onKeyDown = (e) => {
        if (e.keyCode == 13) {
          console.log("prevent default", e.keyCode)
          e.preventDefault();
          this.handleSubmit(e);
        }
      }



    render() {
        return(
            <div id="login_overlay_container">
                <div className="login_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x login_overlay_exit" onClick={this.hide}></i>
                    <table className="login_overlay_table">
                        <tr>
                            <td className="login_overlay_edit pointer_on_hover" style={{fontSize: 130}}>Log In</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td className="login_overlay_username">
                                <form className="login_overlay_username_container">
                                    <input className="search_bar" id="login_username" onKeyDown={this.onKeyDown} style={{fontSize: 30, height: '80px', width: '450px'}}type="search" placeholder=" Enter User Name" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                </form>
                            </td>
                        </tr>
                        <tr>
                        <td className="login_overlay_password">
                                <form className="login_overlay_password_container">
                                    <input className="search_bar" autocomplete="off" id="login_password" onKeyDown={this.onKeyDown} style={{fontSize: 30, height: '80px', width: '450px'}}type="search" placeholder=" Enter Password" aria-label="Search for music"/>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                </form>
                            </td>
                        </tr>
                        <p style={{color:"red"}}>{this.state.error_message}</p>
                        <tr>
                        <td className="login_overlay_sign_in">
                                <form className="login_overlay_sign_in_container">
                                <button type="button" className = "login_sign_in" style ={{fontSize: 35, border: 'solid', borderColor: "grey", borderRadius: 12}} class="btn btn-dark" onClick={(e) => {this.handleSubmit(e)}}>Sign In</button>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    <button type="button" style ={{fontSize: 35,  borderRadius: 12, border: 'solid',borderColor: "grey",}} class="btn btn-dark" onClick={this.showSignupOverlay}>Sign Up</button>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                </form>
                            </td>
                        </tr>
                        {/* <button className="fp_button" type="button" style ={{fontSize: 30,  borderRadius: 12}} class="btn btn-dark">Forgot Password</button> */}
                                
                        <tr>
                        <td className="login_overlay_sign_in">
                                
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
  
export default LoginOverlay;