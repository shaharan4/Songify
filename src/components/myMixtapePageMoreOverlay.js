import React from 'react';
import './overlay.css';


class MyMixtapePageMoreOverlay extends React.Component {
    hide = () => {
        // window.document.getElementById("my_mixtape_more_overlay_container").style.display = "none";
        this.props.setRenderMore(false);
    }
    show = () => {
        window.document.getElementById("my_mixtape_more_overlay_container").style.display = "block";
    }
    showMixtape = () => {
        // window.document.getElementById("mixtape_overlay_container").style.display = "block";
        this.props.setSelectedMixtape(this.props.mixtape);
        this.props.setRenderMixtapeOverlay(true);
    }

    removeMixtape = () => {
        this.props.removeMixtape(this.props.mixtape);
    }
    showSendMixtapeOverlay = () => {
        // window.document.getElementById("send_mixtape_overlay_container").style.display = "block";
        // this.hide();
        this.props.setRenderSendMixtapeOverlay(true);

    }
    render() {
        return(
            <div id="my_mixtape_more_overlay_container">
                <div className="my_mixtape_more_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x my_mixtape_more_overlay_exit" onClick={this.hide}></i>
                    <table className="my_mixtape_more_overlay_table">
                        <tr>
                            <td className="my_mixtape_more_overlay_edit pointer_on_hover" onClick={this.showMixtape}>Edit Mixtape</td>
                        </tr>
                        <tr>
                            <td className="my_mixtape_more_overlay_send pointer_on_hover" onClick={this.showSendMixtapeOverlay}>Send Mixtape</td>
                        </tr>
                        <tr>
                            <td className="my_mixtape_more_overlay_remove pointer_on_hover" onClick={this.removeMixtape}>Remove Mixtape</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
  
export default MyMixtapePageMoreOverlay;