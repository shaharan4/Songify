import React from 'react';
import DatabaseHandler from './databaseHandler';
import './overlay.css';


class FriendSearchResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            addClass: "friend_search_result_card_add_not_sent"
        }
    }

    sendFriendRequest = () => {
        if (!this.state.sent) {
            let db = new DatabaseHandler();
            db.sendFriendRequest(this.props.from_user, this.props.to_user, (data) => {console.log(data)});
            this.setState({
                sent: true,
                addClass: "friend_search_result_card_add_sent"
            })
        }
        
    }

    getSend = () => {
        if (this.state.sent) {
            return "sent"
        }
        return "+"
    }

    render() {
        return (
            <div className="friend_search_result_card">
                <img src="https://picsum.photos/100" alt="img" className="friend_search_result_card_img"></img>
                <span className="friend_search_result_card_name">{this.props.to_user.account_name}</span>
                <span className="friend_search_result_card_mood">{this.props.to_user.state.mood}</span>
                <span className={this.state.addClass} onClick={this.sendFriendRequest}>{this.getSend()}</span>
            </div>
        )
    }
}

export default FriendSearchResultCard;