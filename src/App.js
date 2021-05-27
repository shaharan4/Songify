import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import MainPage from './components/mainPage';
import {Route} from  'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import TestPage from './components/testPage';
import MixtapePage from './components/myMixtapePage';
import NewMixtapePage from './components/newMixtapePage';
import StoryPage from './components/storyPage';
import TestDatabaseHandler from './components/testDatabaseHandler';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { extend } from 'jquery';


var json = require('./components/data/data3.json');
var mixtapes = json[3].Account.mixtapes;
var user2 = {
  id: "",
  username: "",
  password: "",
  account_name: "",
  stories: [],
  mixtapes: [],
  account_profile_pic: "",
  account_email: ""
};

function addMixtape(mixtape) {
  console.log("add", mixtape)
  // console.log(json[3].Account.mixtapes)
  // mixtapes.push(mixtape);
}

// function onSignIn(login_user) {
//   console.log("logged in", login_user);
//   user2 = login_user;
//   loggedIn = true;
// }

function App() {
  // this.state = {
  //   user: {
  //     id: "",
  //     username: "",
  //     password: "",
  //     account_name: "",
  //     stories: [],
  //     mixtapes: [],
  //     account_profile_pic: "",
  //     account_email: ""
  //   }
  // }

  const onSignIn = (user) => {
    console.log("logged in", user);
    this.setState({
      user: user
    })
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {
  //       id: "",
  //       username: "",
  //       password: "",
  //       account_name: "",
  //       stories: [],
  //       mixtapes: [],
  //       account_profile_pic: "",
  //       account_email: ""
  //     },
  //     loggedIn: false
  //   }
  // }

  // onSignIn = (user) => {
  //   this.setState({
  //     user: user,
  //     loggedIn: true
  //   });
  //   console.log(this.state);
  // }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()

  const handleSubmit = async (e, username, password, callback) => {
      if (e) {
        e.preventDefault();
      }
      console.log("in handlesubmit");
      if (!user) {
        // setUsername("123abc");
        // setPassword("123456");
        console.log("logging in");
        // const user = { username: "123abc", password: "123456" };
        console.log(username, password);
        // send the username and password to the server
        const response = await axios.get(
        "https://young-meadow-02813.herokuapp.com/users/login?" + "username=" + username + "&password=" + password
        );
        console.log(response.data);
        if (response.data.length != 0 && response.data != null) {
          console.log('logged in');
          // set the state of the user
          setUser(response.data[0])
          // store the user in localStorage
          localStorage.setItem("user", JSON.stringify(response.data[0]));
          window.location.reload();
        }
        else {
          if (callback) {
            callback("wrong username or password")
          }
          console.log("wrong username or password");
        }
      }
      else {
        console.log("user already logged in", user);
      }
  };

  if (user) {
    console.log(user);
  }
  else {
    console.log("no user");
  }


  const handleLogout = () => {
    console.log("logging out");
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
    // console.log("user: ", user);
    // window.location.reload();
    window.location.href = "/main_page";
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //     console.log("user found");
  //   }
  //   else {
  //     console.log("not found", localStorage);
  //   }
  // }, []);

  // const test = () => {
  //   console.log("test");
  // }
  
  return (
    <div>
      <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Router>
        <Switch>
          {/* If the current URL is /about, this route is rendered
              while the rest are ignored */}
          <Route path="/main_page">
            <MainPage
            // onSignIn={onSignIn}
            user={JSON.parse(localStorage.getItem("user"))}
            handleSubmit={handleSubmit}
            // handleSubmit={(e) => {console.log("test")}}
            handleLogout={handleLogout}/>
          </Route>
          <Route path="/test_page">
            <TestPage />
          </Route>
          <Route path="/my_mixtape_page">
            <MixtapePage 
            // mixtapes={mixtapes}
            user={JSON.parse(localStorage.getItem("user"))}
            handleSubmit={handleSubmit}
            handleLogout={handleLogout}/>
          </Route>
          <Route path="/new_mixtape_page">
            <NewMixtapePage 
            addMixtape={addMixtape}
            // user={user}
            user={JSON.parse(localStorage.getItem("user"))}
            handleLogout={handleLogout}
            />
          </Route>
          <Route path="/story_page">
            <StoryPage 
            user={JSON.parse(localStorage.getItem("user"))}
            handleSubmit={handleSubmit}
            handleLogout={handleLogout}/>
          </Route>
          <Route path="/testDatabaseHandler">
            <TestDatabaseHandler />
          </Route>
          <Route path="/">
            <Redirect from="/" to ="/main_page"></Redirect>
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );

  // render() {
  //   return(
  //     <div>
  //     <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  //     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
  //     <Router>
  //       <Switch>
  //         {/* If the current URL is /about, this route is rendered
  //             while the rest are ignored */}
  //         <Route path="/main_page">
  //           <MainPage 
  //           onSignIn={this.onSignIn}
  //           user={this.state.user}
  //           handleSubmit={handleSubmit}
  //           />
  //         </Route>
  //         <Route path="/test_page">
  //           <TestPage />
  //         </Route>
  //         <Route path="/my_mixtape_page">
  //           <MixtapePage 
  //           mixtapes={mixtapes}
  //           user={this.state.user}
  //           loggedIn={this.state.loggedIn}/>
  //         </Route>
  //         <Route path="/new_mixtape_page">
  //           <NewMixtapePage 
  //           addMixtape={addMixtape}
  //           user={this.state.user}/>
  //         </Route>
  //         <Route path="/story_page">
  //           <StoryPage 
  //           user={this.state.user}/>
  //         </Route>
  //         <Route path="/testDatabaseHandler">
  //           <TestDatabaseHandler />
  //         </Route>
  //         <Route path="/">
  //           <MainPage />
  //         </Route>
  //       </Switch>
  //     </Router>
  //   </div>
  //   )
  // }
}

export default App;
