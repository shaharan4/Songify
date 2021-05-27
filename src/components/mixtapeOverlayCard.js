import React from 'react';
import './overlay.css';

class MixtapeOverlayCard extends React.Component {
    constructor(props) {
        super(props);
    }
    showPlayMusicOverlay = function() {
        window.document.getElementById("play_music_overlay_container").style.display = "block";
    }
    setSelectedSong = () => {
        this.props.setSelectedSong(this.props.track);
        console.log("set song", this.props.track);
    }
    moveUp = () => {
        this.props.moveUp(this.props.index);
    }
    moveDown = () => {
        this.props.moveDown(this.props.index);
    }
    remove = () => {
        this.props.remove(this.props.index);
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
                    <td>
                        <div className="pointer_on_hover mixtape_overlay_card_up" onClick={this.moveUp}>
                            <p class="glyphicon glyphicon-arrow-up"></p>
                        </div>
                    </td>
                    <td>
                        <div className="pointer_on_hover mixtape_overlay_card_down" onClick={this.moveDown}>
                            <p class="glyphicon glyphicon-arrow-down"></p>
                        </div>
                    </td>
                    <td>
                        <div className="pointer_on_hover mixtape_overlay_card_remove" onClick={this.remove}>
                            <p class="glyphicon glyphicon-remove"></p>
                        </div>
                    </td>
                </div>
            </tr>
        );
    }
}

export default MixtapeOverlayCard;