import React from 'react';
import './overlay.css';

class NewMixtapePageCard extends React.Component {
    constructor(props) {
        super(props);
        this.song = this.props.song;
    }
    getIndex = function() {
        this.index++;
        return this.index;
    }
    showPlayMusicOverlay = () => {
        this.setSelectedSong();
        // window.document.getElementById("play_music_overlay_container").style.display = "block";
        this.props.setPlayMusicOverlay(true);
    }
    setSelectedSong = () => {
        this.props.setSelectedSong(this.props.song);
    }
    moveUp = () => {
        console.log("up")
        this.props.moveUp(this.props.index)
    }
    moveDown = () => {
        this.props.moveDown(this.props.index)
    }
    remove = () => {
        this.props.remove(this.props.index)
    }
    render() {
        return(
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                <div className="border_bottom new_mixtape_page_row">
                    <td>
                        <div className=" new_mixtape_page_card_index">
                            {this.props.index}
                        </div>
                    </td>
                    <td onClick={this.showPlayMusicOverlay}>
                        <div className="pointer_on_hover new_mixtape_page_card_name">
                            {this.props.song.name}
                        </div>
                    </td>
                    <td onClick={this.showPlayMusicOverlay}>
                        <div className="pointer_on_hover new_mixtape_page_card_author">
                            {this.props.song.artists[0].name}
                        </div>
                    </td>
                    <td>
                        <div className="pointer_on_hover  new_mixtape_page_card_up" onClick={this.moveUp}>
                            <p class="glyphicon glyphicon-arrow-up"></p>
                        </div>
                    </td>
                    <td>
                        <div className="pointer_on_hover  new_mixtape_page_card_down" onClick={this.moveDown}>
                            <p class="glyphicon glyphicon-arrow-down"></p>
                        </div>
                    </td>
                    <td>
                        <div className="pointer_on_hover  new_mixtape_page_card_remove" onClick={this.remove}>
                            <p class="glyphicon glyphicon-remove"></p>
                        </div>
                    </td>
                </div>
            </div>
        );
    }
}

export default NewMixtapePageCard;