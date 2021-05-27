import axios from 'axios';
import { ToastHeader } from 'react-bootstrap';
import Search from './search.js';
// import { use } from '../../backend/routes/users';


export default class DatabaseHandler {
    constructor() {
        this.initPlaylists = require("./data/playlists.json").playlists.items;
        this.initTracks = require("./data/tracks.json").tracks.items;
        this.initUsers = require("./data/users.json").users.items;
    }

    addUser = (newUser, callback) => {
        // let newUser = {
        //     username: username,
        //     password: password
        // }
        axios.post('https://young-meadow-02813.herokuapp.com/users/add', newUser)
        .then(res => {if (callback) {callback(res)}});
    }

    getUsers = () => {
        axios.get('https://young-meadow-02813.herokuapp.com/users/')
        .then(res => console.log(res.data));
    }
    getMixtapes = (callback) => {
        axios.get('https://young-meadow-02813.herokuapp.com/playlist/')
        .then((res) => {
            callback(res.data);
        });
    }
    increaseView =(mixtape, newView) =>{
        axios.post('https://young-meadow-02813.herokuapp.com/playlist/update_views/' + mixtape._id, 
        {
            views: newView    
        
            } )
        .then((res) => {
            
            console.log(res.data);
        });
    }
    addPlaylist = (newPlaylist) => {
        console.log("add playlist");
        axios.post('https://young-meadow-02813.herokuapp.com/playlist/add', newPlaylist)
        .then(res => console.log(res.data));
    }

    findUsername = (username, callback) => {
        axios.get('https://young-meadow-02813.herokuapp.com/users/find_username', 
        {
            params: {
                username: username,
            }
        })
        .then((res) => {
            callback(res.data);
        });
    }

    sendFriendRequest = (from_user, to_user, callback) => {
        axios.post('https://young-meadow-02813.herokuapp.com/users/send_friend_request', 
        {
            from_user: from_user,
            to_user: to_user
        })
        .then((res) => {
            callback(res.data);
        });
    }

    removeFriend = (from_username, to_username, callback) => {
        console.log(from_username, to_username)
        axios.post('https://young-meadow-02813.herokuapp.com/users/remove_friend', 
        {
            from_username: from_username,
            to_username: to_username
        })
        .then((res) => {
            callback(res.data);
        });

        axios.post('https://young-meadow-02813.herokuapp.com/users/remove_friend', 
        {
            from_username: to_username,
            to_username: from_username
        })
        .then((res) => {
            callback(res.data);
        });
    }

    sendMixtapeTo = (from_user, to_user, mixtape, callback) => {
        axios.post('https://young-meadow-02813.herokuapp.com/users/send_mixtape', 
        {
            from_user: from_user,
            to_user: to_user,
            mixtape: mixtape
        })
        .then((res) => {
            callback(res);
        });
    }

    findAccountName = (account_name, callback) => {
        axios.get('https://young-meadow-02813.herokuapp.com/users/find_account_name', 
        {
            params: {
                account_name: account_name,
            }
        })
        .then((res) => {
            callback(res.data);
        });
    }


    findUserWithPassword = (username, password, callback) => {
        axios.get('https://young-meadow-02813.herokuapp.com/users/login', 
        {
            params: {
                username: username,
                password: password
            }
        })
        .then((res) => {
            callback(res);
        });
    }

    findUserID = (id, callback) => {
        axios.get('https://young-meadow-02813.herokuapp.com/users/find_user_ID/' + id)
        .then((res) => {
            callback(res);
            // console.log(res);
        });
    }

    updateUsername = (newUsername, callback) => {
        axios.post('https://young-meadow-02813.herokuapp.com/users/update/5fb6df2277776beb389c2057', {
            username: newUsername
        })
        .then((res) => {
            callback(res);
            // console.log(res);
        });
    }

    deleteMixtape = (user, mixtape, callback) => {
        console.log("delete mixtape ", mixtape);
        axios.post('https://young-meadow-02813.herokuapp.com/users/delete_mixtape/' + user._id, {
            mixtape: mixtape
        })
        .then((res) => {
            callback(res);
        });
    }

    updateUser = (user, callback) => {
        console.log("update user", user)
        axios.post('https://young-meadow-02813.herokuapp.com/users/update/' + user._id, {
            user: {
                mixtapes: user.mixtapes,
                username: user.username,
                account_name: user.account_name,
                account_email: user.account_email,
                password: user.password,
                account_profile_pic: user.account_profile_pic
            }
        })
        .then((res) => {
            callback(res);
        });
        // axios.post('https://young-meadow-02813.herokuapp.com/users/update_mixtape/' + user._id)
        // .then((res) => {
        //     callback(res);
        // });
    }

    // initPlaylists = () => {
    //     for (var i=0; i<this.initPlaylists.length; i++) {
    //         let newPlaylist = this.initPlaylists[i];
    //         this.addPlaylist(newPlaylist);
    //     }
    // }

    addTrack = (newTrack) => {
        console.log("add track");
        axios.post('https://young-meadow-02813.herokuapp.com/track/add', newTrack)
        .then(res => console.log(res.data));
    }

    addMixtapeToUser = (user, callback) => {
        console.log("add mixtape to user");
        axios.post('https://young-meadow-02813.herokuapp.com/users/update_mixtape/' + user._id, {
            mixtapes: user.mixtapes
        })
        .then(() => {
            axios.get('https://young-meadow-02813.herokuapp.com/users/find_user_ID/' + user._id)
            .then((res) => {
                callback(res);
            })
        });
    }

    acceptMixtape = (user, mixtape, callback) => {
        console.log("accept mixtape");
        axios.post('https://young-meadow-02813.herokuapp.com/users/accept_mixtape/' + user._id, {
            mixtape: mixtape
        })
        .then((res) => {
            callback(res);
        });
    }
    testUpdate = () => {
        axios.get('https://young-meadow-02813.herokuapp.com/users/updateShit/')
        .then((res) => {
            console.log(res);
        });
    }
    removeReceivedMixtape = (user, mixtape, callback) => {
        console.log("removeReceivedMixtape");
        axios.post('https://young-meadow-02813.herokuapp.com/users/remove_received_mixtape/' + user._id, {
            mixtape: mixtape
        })
        .then((res) => {
            callback(res);
        });
    }

    addStory = (story, callback) => {
        console.log("add story", story);
        axios.post('https://young-meadow-02813.herokuapp.com/story/add', story)
        .then((res) => {
            callback(res);
        });
    }

    addStoryToUser = (story, user, callback) => {
        console.log("add story to user", story, user);
        axios.post('https://young-meadow-02813.herokuapp.com/users/add_story/' + user._id, {
            story: story
        })
        .then((res) => {
            callback(res);
        });
    }

    deleteStory = (story, user, callback) => {
        if (story.story_publisher == user.account_name) {
            console.log("deleting story");
            axios.post('https://young-meadow-02813.herokuapp.com/users/delete_story/' + user._id, {
                story: story
            })
            .then((res) => {
                callback(res);
            });
            axios.post('https://young-meadow-02813.herokuapp.com/story/delete_story', {
                story: story
            })
            .then((res) => {
                callback(res);
            });
        }
        else {
            console.log("not owner");
        }
    }

    deleteAllStories = (callback) => {
        axios.delete('https://young-meadow-02813.herokuapp.com/story/remove_all')
            .then((res) => {
                callback(res);
            });
    }

    getRandomStories = (num, callback) => {
        axios.get('https://young-meadow-02813.herokuapp.com/story/get_random_stories/', {
            params: {
                num: num,
                random: Math.floor(Math.random() * 10)
            }
        })
        .then((res) => callback(res.data))
    }

    acceptFriend = (from_user, to_user, callback) => {
        // console.log(from_friend.account_name, "accept", to_friend.account_name);
        axios.post('https://young-meadow-02813.herokuapp.com/users/add_user_to_friend_list/', {
            from_user: from_user,
            to_user: to_user
        })
        .then((res) => {
            if (callback) {
                callback(res);
            }
        });
        axios.post('https://young-meadow-02813.herokuapp.com/users/add_user_to_friend_list/', {
            from_user: to_user,
            to_user: from_user
        })
        .then((res) => {
            if (callback) {
                callback(res);
            }
        });
        axios.post('https://young-meadow-02813.herokuapp.com/users/remove_from_received_request/', {
            from_user: from_user,
            to_user: to_user
        })
        .then((res) => {
            if (callback) {
                callback(res);
            }
        });
        axios.post('https://young-meadow-02813.herokuapp.com/users/remove_from_received_request/', {
            from_user: to_user,
            to_user: from_user
        })
        .then((res) => {
            // if (callback) {
                callback(res);
            // }
        });
    }

    declineFriend = (from_user, to_user, callback) => {
        axios.post('https://young-meadow-02813.herokuapp.com/users/remove_from_received_request/', {
            from_user: from_user,
            to_user: to_user
        })
        .then((res) => {
            if (callback) {
                callback(res);
            }
        });
    }

    // testPushFriend = () => {
    //     axios.post('https://young-meadow-02813.herokuapp.com/users/test_push_friend/')
    //     .then((res) => {
    //         if (callback) {
    //             callback(res);
    //         }
    //     });
    // }
    refreshUser = (user) => {
        this.findUserID(user._id, (res) => {
            console.log(res);
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log("refresh")
                window.location.reload();
            }
        })
    }
    resetUsers = () => {
        axios.delete('https://young-meadow-02813.herokuapp.com/users/remove_all')
        .then((res) => {
            if (res.status == 200) {
                for (var i=0; i<this.initUsers.length; i++) {
                    let newUsers = this.initUsers[i];
                    this.addUser(newUsers, null);
                    console.log("add user", newUsers);
                }
            }
            else {
                console.log(res);
            }
        });
    }

    reset = () => {
        // let search = new Search();
        axios.delete('https://young-meadow-02813.herokuapp.com/playlist/remove_all')
        .then((res) => {
            if (res.status == 200) {
                // this.initPlaylists();
                for (var i=0; i<this.initPlaylists.length; i++) {
                    let newPlaylist = this.initPlaylists[i];
                    this.addPlaylist(newPlaylist);
                }
            }
            else {
                console.log(res);
            }
        });

        axios.delete('https://young-meadow-02813.herokuapp.com/track/remove_all')
        .then((res) => {
            if (res.status == 200) {
                // this.initPlaylists();
                for (var i=0; i<this.initTracks.length; i++) {
                    let newTracks = this.initTracks[i];
                    this.addTrack(newTracks);
                }
            }
            else {
                console.log(res);
            }
        });

        axios.delete('https://young-meadow-02813.herokuapp.com/users/remove_all')
        .then((res) => {
            if (res.status == 200) {
                for (var i=0; i<this.initUsers.length; i++) {
                    let newUsers = this.initUsers[i];
                    this.addUser(newUsers, null);
                }
            }
            else {
                console.log(res);
            }
        });

        
        // console.log(this.initPlaylists);
    }
}