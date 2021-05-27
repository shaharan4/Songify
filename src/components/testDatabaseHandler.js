import React from 'react';
import DatabaseHandler from './databaseHandler.js';
import NewMixtapePageCard from './newMixtapePageCard.js';
// import DatabaseHandler from './databaseHandler.js';


export default class TestDatabaseHandler extends React.Component {
    constructor(props) {
        super(props);
        this.db = new DatabaseHandler();

        this.state = {
            username: "dsa"
        }
    }

    onSignUp = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username != "" && password != "") {
            this.db.addUser(username, password);
        }
    }

    onShowUsers = () => {
        this.db.getUsers();
    }

    onResetDB = () => {
        let db = new DatabaseHandler();
        db.reset();
    }

    onFindUserID = (id) => {
        let db = new DatabaseHandler();
        db.findUserID("5fb6df2277776beb389c2057", (data) => {console.log(data)});
    }

    renderUsername = () => {
        return <div>{this.state.username}</div>
    }

    onChangeUsername = () => {
        let db = new DatabaseHandler();
        let newUsername = document.getElementById("new_username").value;
        db.updateUsername(newUsername, (data) => {
            if (data.status == 200) {
                this.setState({
                    username: newUsername
                })
            }
        });
    }

    onResetUsers = () => {
        let db = new DatabaseHandler();
        db.resetUsers();
    }

    onDeleteAllStories = () => {
        let db = new DatabaseHandler();
        db.deleteAllStories((res) => {
            console.log(res);
        });
    }

    
    render() {
        return(
            <div>
                {/* <input id="username"></input> */}
                {/* <input id="password"></input> */}
                {/* <button onClick={this.onSignUp}>Sign Up</button> */}
                {/* <button onClick={this.onShowUsers}>Show users in console</button> */}
                <button onClick={this.onResetDB}>Reset Database</button>
                <button onClick={this.onResetUsers}>Reset Users</button>
                <button onClick={this.onDeleteAllStories}>Delete All Stories</button>
                {/* <button onClick={this.onFindUserID}>Find User ID</button> */}
                {/* {this.renderUsername()} */}
                {/* <input id="new_username" placeholder="new username"></input> */}
                {/* <button onClick={this.onChangeUsername}>change username</button> */}
            </div>
        )
    };
}