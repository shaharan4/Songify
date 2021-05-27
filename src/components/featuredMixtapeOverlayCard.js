import React from 'react';
import './overlay.css';

class FeaturedMixtapeOverlayCard extends React.Component {
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

    setPlayMusicOverlay = () => {
        this.props.setPlayMusicOverlay(true);
    }
    render() {
        return(
            <tr onClick={this.setSelectedSong}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                <div className="border_bottom featured_mixtape_overlay_song_table_row">
                    <td>
                        <div className="mixtape_overlay_card_index">
                            {this.props.index}
                        </div>
                    </td>
                    <td>
                        <div className="featured_mixtape_overlay_card_name">
                            {this.props.track?this.props.track.name:null}
                        </div>
                    </td>
                    <td>
                        <div className="featured_mixtape_overlay_card_author">
                            {this.props.track?this.props.track.artists[0].name:null}
                        </div>
                    </td>
                    <td onClick={this.setPlayMusicOverlay} rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
                    <a className="featured_mixtape_play_button"><i className="fa fa-play fa-2x"></i></a>
                    </td>
                </div>
            </tr>
        );
    }
}

export default FeaturedMixtapeOverlayCard;