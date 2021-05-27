import React from 'react';
import './overlay.css';

class ReceivedMixtapeOverlayCard extends React.Component {
    constructor(props) {
        super(props);
    }
    setSelectedSong = () => {
        this.props.setSelectedSong(this.props.track);
        console.log("set song", this.props.track);
    }
    setPlayMusicOverlay = () => {
        this.props.setPlayMusicOverlay(true);
    }
    render() {
        return(
            <tr onClick={this.setSelectedSong}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                <div className="border_bottom mixtape_overlay_song_table_row">
                    <td>
                        <div className="mixtape_overlay_card_index">
                            {this.props.index}
                        </div>
                    </td>
                    <td onClick={this.setPlayMusicOverlay}>
                        <div className="pointer_on_hover mixtape_overlay_card_name">
                            {this.props.track.name}
                        </div>
                    </td>
                    <td onClick={this.setPlayMusicOverlay}>
                        <div className="pointer_on_hover mixtape_overlay_card_author">
                            {this.props.track.artists[0].name}
                        </div>
                    </td>
                </div>
            </tr>
        );
    }
}

export default ReceivedMixtapeOverlayCard;