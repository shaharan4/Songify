import React from 'react';
import DatabaseHandler from './databaseHandler';
import './overlay.css';


class SendMixtapeOverlayCard extends React.Component {
    constructor(props) {
        super(props);
        this.db = new DatabaseHandler();
        // this.state = {
        //     user: this.props.user
        // }
    }

    sendMixtapeTo = () => {
        this.props.sendMixtapeTo(this.props.friend);
    }
    onClick = () => {
        console.log(this.props.mixtape);
    }

    render() {
        return(
                <tr className="friend" onClick={this.sendMixtapeTo}>
                    {/* <button onClick={this.onClick}>click</button> */}
                    <td>
                        <img src="https://source.unsplash.com/user/erondu/80x80" className="circle_img"></img>
                    </td>
                    <td>
                        <p className="friend_name" style={{color: 'white'}}>{this.props.friend.username}</p>
                        <p className="friend_mood">"{this.props.friend.mood}"</p>
                    </td>
                </tr>
        )
    }
}
  
export default SendMixtapeOverlayCard;