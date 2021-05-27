import React from 'react';
import MixtapeCard from './mixtapeCard';
import "./myMixtapePage.css"

class MixtapeTable extends React.Component {
    constructor(props) {
      super(props);
      this.mixtapes = this.props.mixtapes;
    }
    showPlayMusicOverlay = function() {
      window.document.getElementById("play_music_overlay_container").style.display = "block";
    }
    showMixtapeOverlay = function() {
      window.document.getElementById("mixtape_overlay_container").style.display = "block";
    }
    goToNewMixtapePage = function() {
      window.document.getElementById("new_mixtape_page").style.display = "block";
    }
    setSelectedMixtape = (mixtape) => {
      this.props.setSelectedMixtape(mixtape);
    }
    onCreateMixtape = () => {
      if (this.props.user._id != "") {
        window.location.href = "/new_mixtape_page";
        // console.log(this.props.user)
      }
    }

    render() {
        document.body.style = 'background: #2d2d31;'
        return(
            <div className="table_container">
              <table class="table" className="my_mixtapes_table">
                <thead>
                  <tr>
                    {/* <th>My Mixtapes</th> */}
                    {/* <div>My Mixtapes</div> */}
                    <td>
                      <div className="my_mixtape_name">My Mixtapes</div>
                    </td>
                    <a className="my_mixtape_page_create_mixtape_button pointer_on_hover" onClick={this.onCreateMixtape}>Create Mixtape</a>
                  </tr>
                </thead>
                <tbody>
                    {this.props.mixtapes && this.props.mixtapes.map((mixtape) => {
                        return (
                            <MixtapeCard 
                            mixtape={mixtape} 
                            setSelectedMixtape={this.setSelectedMixtape}
                            setRenderMixtapeOverlay={this.props.setRenderMixtapeOverlay}
                            setRenderMore={this.props.setRenderMore}
                            currentUser={this.props.currentUser}
                            setRenderSendMixtapeOverlay={this.props.setRenderSendMixtapeOverlay}
                            ></MixtapeCard>
                            )
                    })}
                </tbody>
              </table>
            </div>
        )
    }
}
  
export default MixtapeTable;