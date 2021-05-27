import React from 'react';
import './overlay.css';


class AddToMixtapeOverlay extends React.Component {
    hide = function() {
        window.document.getElementById("add_to_mixtape_overlay_container").style.display = "none";
    }
    show = function() {
        window.document.getElementById("add_to_mixtape_overlay_container").style.display = "block";
    }
    render() {
        return(
            <div id="add_to_mixtape_overlay_container">
                <div className="add_to_mixtape_overlay_wrapper">
                    <i class="fa fa-times-circle fa-5x add_to_mixtape_overlay_exit" onClick={this.hide}></i>
                    <div className="add_to_mixtape_overlay_header">Add to Mixtape</div>
                    <table className="add_to_mixtape_overlay_table">
                        <tr>
                            <td className="add_to_mixtape_overlay_mixtape">Mixtape 1</td>
                        </tr>
                        <tr>
                            <td className="add_to_mixtape_overlay_mixtape">Mixtape 2</td>
                        </tr>
                        <tr>
                            <td className="add_to_mixtape_overlay_mixtape">Mixtape 3</td>
                        </tr>
                        <tr>
                            <td className="add_to_mixtape_overlay_mixtape">Mixtape 4</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
  
export default AddToMixtapeOverlay;