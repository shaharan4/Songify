import React from 'react';
import { ThemeProvider } from 'react-bootstrap';
import "./myMixtapePage.css"
import Search from './search.js';

class MixtapeCard extends React.Component {
    constructor(props) {
        super(props);
    }
    showPlayMusicOverlay = () => {
        window.document.getElementById("play_music_overlay_container").style.display = "block";
    }
    showMoreOverlay = () => {
        // window.document.getElementById("my_mixtape_more_overlay_container").style.display = "block";
        this.props.setRenderMore(this.props.mixtape);
        // console.log("set mixtpae", this.props.mixtape);
        this.props.setSelectedMixtape(this.props.mixtape);
    }
    showMixtapeOverlay = () => {
        // window.document.getElementById("mixtape_overlay_container").style.display = "block";
        this.props.setRenderMixtapeOverlay(true);
    }
    setSelectedMixtape = () => {
        // console.log("set mixtape");
        // let search = new Search();
        // search.getTrackWithURL(this.props.mixtape.tracks.href, (res) => {
        //     this.state = {
        //         tracks: res
        //     }
        //     console.log(this.state.tracks);
        // })
        this.props.setSelectedMixtape(this.props.mixtape)
        // console.log(this.props.mixtape);
        // this.props.setRenderMixtapeOverlay(true);
    }
    render() {
        // this.mixtape = {};
        // this.mixtape.mixtapeName = "Mixtape Name";
        // this.mixtape.publishedBy = "Publish Name";
        // this.mixtape.imgURL = "https://source.unsplash.com/user/erondu/140x140";
        if(this.props.mixtape){
        return(                       
            <tr className="my_mixtapes_table_row" onClick={this.setSelectedMixtape}>
                <th scope="row" className="my_mixtapes_table_col pointer_on_hover"><img id="mixtape_item" src={this.props.mixtape.images[0].url}  onClick={this.showMixtapeOverlay}></img></th>
                <td>
                <div className="my_mixtapes_table_info pointer_on_hover" id="mixtape_name" onClick={this.showMixtapeOverlay}>
                    {this.props.mixtape.name}
                </div>
                <div className="my_mixtapes_table_info my_mixtapes_table_published">
                    Owner: {this.props.mixtape.owner.display_name}
                </div>
                </td>
                <td className="my_mixtapes_table_col my_mixtape_page_play_mixtape_button pointer_on_hover" id="mixtape_play_button" onClick={this.showMixtapeOverlay}>
                    &#9654;
                </td>
                <td className="my_mixtapes_table_col my_mixtape_page_edit_mixtape_button pointer_on_hover" id="mixtape_edit_button" onClick={this.showMoreOverlay}>
                    &#9776;
                </td>
            </tr>
            // <div>{console.log(this.props.mixtape.mixtape_photo)}</div>
        )
        }
        else{
            return(
                <tr className="my_mixtapes_table_row" onClick={this.setSelectedMixtape}>
                    </tr>
            )
        }
    }
}
  
export default MixtapeCard;