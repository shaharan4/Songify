import React from 'react';
import DatabaseHandler from './databaseHandler';
import "./overlay.css";
import FriendSearchResultCard from './FriendSearchResultCard';
import ReceivedMixtapeOverlay from './receivedMixtapeOverlay';



class FriendOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: '',
            searchResult: [],
            renderReceivedMixtapeOverlay: false,
            selectedMixtape: null
        }
    }

    hide = function() {
        document.getElementById("friend_overlay_container").style.display = "none";
    }
    show = function() {
        document.getElementById("friend_overlay_container").style.display = "block";
    }
    // resetSongsIndices = () => {
    //     for (var i=0; i<this.songs.length; i++) {
    //         this.state.songs[i].index = i + 1;
    //     }
    // }

    searchFriend = (e) => {
        e.preventDefault();
        let search_input = document.getElementById("new_friend_search_bar").value;
        let db = new DatabaseHandler();
        db.findAccountName(search_input, (data) => {
            if (data.length != 0) {
                this.setState({
                    searchResult: data
                })
            }
        })
    }

    renderFriendSearchResult = () => {
        // e.preventDefault();
        // let search_input = document.getElementById("new_friend_search_bar").value;
        // if (search_input != "") {
        //     let db = new DatabaseHandler();
        //     db.findAccountName(search_input, (data) => {
        //         if (data.length != 0) {
        //             console.log("add child");
        //             let parent_node = document.getElementById("friend_search_result");
        //             for (var i=0; i<9; i++) {
        //                 // let user = data[i];
        //                 // let child = document.createElement("div");
        //                 // child.className = "friend_search_result_card";
        //                 // child.innerHTML = user.account_name;
        //                 // parent_node.appendChild(child);
        //             }
        //         }
        //     });
        // }
        return (
            this.state.searchResult && this.state.searchResult.map((user) => {
                return (
                    <FriendSearchResultCard
                    from_user={this.props.user}
                    to_user={user}
                    ></FriendSearchResultCard>
                )
            })
        )
    }

    acceptFriend = (user) => {
        let db = new DatabaseHandler();
        console.log(this.props.user.account_name, "accept", user._id);
        db.acceptFriend(this.props.user, user, (res) => {
            if (res.status == 200) {
                db.refreshUser(this.props.user);
            }
        });
    }

    declineFriend = (user) => {
        let db = new DatabaseHandler();
        console.log(this.props.user.account_name, "accept", user._id);
        db.declineFriend(this.props.user, user, (res) => {
            if (res.status == 200) {
                db.refreshUser(this.props.user);
            }
        });
    }

    setSelectedMixtape = (mixtape) => {
        this.setState({
            selectedMixtape: mixtape
        })
    }

    renderReceivedRequests = () => {
        return (
            this.props.user.friend_system.received_requests && this.props.user.friend_system.received_requests.map((user) => {
                return (
                    <tr>
                        <td className="friend_table_item">{user.account_name}</td>
                        <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button" onClick={() => this.acceptFriend(user)} ><i class="fa fa-check" aria-hidden="true"></i></button></td>
                        <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button" onClick={() => this.declineFriend(user)}><i class="fa fa-close" aria-hidden="true"></i></button></td>
                    </tr>
                )
            })
        )
    }

    renderReceivedMxitapes = () => {
        return (
            this.props.user.friend_system.received_mixtapes && this.props.user.friend_system.received_mixtapes.map((item) => {
                return (
                    <tr onClick={() => {this.setRenderReceivedMixtapeOverlay(true); this.setSelectedMixtape(item.mixtape)}}>
                        <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">{item.mixtape.name}</td>
                        <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item sent_mixtape_from">{item.from}</td>
                        <td className="btn btn-success"onClick={() => this.addMixtape(item.mixtape)}>Add</td>
                        <td className="btn btn-danger"onClick={() => this.deleteMixtape(item.mixtape)}>Delete</td>
                    </tr>
                )
            })
        )
    }

    addMixtape = (mixtape) => {
        let db = new DatabaseHandler();
        db.acceptMixtape(this.props.user, mixtape, (res) => {
            console.log(res)
            if (res.status == 200) {
                db.removeReceivedMixtape(this.props.user, mixtape, (res) => {
                    if (res.status == 200) {
                        db.refreshUser(this.props.user);
                    }
                });
            }
        });
        console.log("add", this.props.user);
    }

    deleteMixtape = (mixtape) => {
        let db = new DatabaseHandler();
        db.removeReceivedMixtape(this.props.user, mixtape, (res) => {
            if (res.status == 200) {
                db.refreshUser(this.props.user);
            }
        });
    }

    renderReceivedMixtapeOverlay = () => {
        if (this.state.renderReceivedMixtapeOverlay) {
            console.log(this.state.selectedMixtape)
            return(
                <ReceivedMixtapeOverlay
                mixtape={this.state.selectedMixtape}
                setRenderReceivedMixtapeOverlay={this.setRenderReceivedMixtapeOverlay}
                ></ReceivedMixtapeOverlay>
            )
            // console.log("rendering")
        }
    }

    setRenderReceivedMixtapeOverlay = (val) => {
        this.setState({
            renderReceivedMixtapeOverlay: val
        })
    }
    
    
    render() {
        return(
            <center>
            <div id="friend_overlay_container">
                {/* <button onClick={this.acceptFriend}>testbutton</button> */}
                <div className="friend_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x friend_overlay_exit pointer_on_hover" onClick={this.hide}></i>
                    {/* <div className="friend_overlay_self">
                        <img className="friend_overlay_self_icon" src="https://source.unsplash.com/user/erondu/80x80"></img>
                        <div className="friend_overlay_self_name">Billy Bob</div>
                    </div> */}
                    <div className="new_friend_search_container">
            <           form className="new_friend_search_bar_container">
                            <input id="new_friend_search_bar" className="new_friend_search_bar" type="search" placeholder="Search for people to add..." aria-label="Search for people"/>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                            <button className="new_friend_search_button"><i class="fa fa-search" onClick={this.searchFriend}></i></button>
                         </form>
                         <div id="friend_search_result">
                             {this.renderFriendSearchResult()}
                         </div>
                    </div>
                    <div className="new_friend_requests_container">
                        <div className="new_friend_requests_header"><strong>Pending Friend Requests</strong>:</div>
                        <table className="new_friend_requests_table">
                            {this.renderReceivedRequests()}
                            {/* <tr>
                                <td className="friend_table_item">James Hetfield</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Cliff Burton</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Kerry King</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Dave Lombardo</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Lars Ulrich</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Dave Mustaine</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Robert Trujillo</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Jason Newstead</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Alexi Laiho</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr>
                            <tr>
                                <td className="friend_table_item">Dani Filth</td>
                                <td className="friend_table_item accept_friend_request"><button className="friend_table_accept_button"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                <td className="friend_table_item decline_friend_request"><button className="friend_table_decline_button"><i class="fa fa-close" aria-hidden="true"></i></button></td>
                            </tr> */}

                        </table>
                    </div>
                    <div className="friend_sent_mixtapes_container">
                        <div className="friend_sent_mixtapes_header"><strong>Suggested Mixtapes</strong></div>
                        <table className="friend_sent_mixtapes_table">
                            {/* <tr>
                                <td className="suggested_mixtape_name_text sent_mixtapes_table_item"><strong>Mixtape Name</strong></td>
                                <td className="suggested_by_text sent_mixtapes_table_item"><strong>Suggested by</strong></td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Shower Playlist</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">John Smith</td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Happy Mood</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">James Hetfield</td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Depression</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">Tim Sykes</td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Love You</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">Carmen Rose</td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Holiday</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">Ed Sharpie</td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Metal</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">Lars Ulrich</td>
                            </tr>
                            <tr>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item pointer_on_hover sent_mixtape_name">Pop Songs</td>
                                <td className="friend_sent_mixtapes_table_item sent_mixtapes_table_item">Taylor Swift</td>
                            </tr> */}
                            {this.renderReceivedMxitapes()}
                        </table>

                    </div>
                    
                </div>
                {this.renderReceivedMixtapeOverlay()}
            </div>
            </center>
    )
    }
}

export default FriendOverlay;