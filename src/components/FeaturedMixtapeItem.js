import React from 'react';
import "./mainPage.css"
import DatabaseHandler from './databaseHandler.js'
import FeaturedMixtapeOverlay from './featuredMixtapeOverlay.js'
import Search from './search.js';
//master branch test

class FeaturedMixtapeItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            scrollLeft: false,
            scrollRight: false,
            index: 0,
            mixtapes: [],
            selectedMixtape: "",
            db: new DatabaseHandler,
            search: new Search,
            trackList: [],
            currentView: 0
        }
        


      }
      scrollLeft = () =>{
          this.setState({scrollLeft: true});
          if(this.state.index>=3){
              this.setState({index: this.state.index-3});
          }
      }
      scrollRight = () =>{
          this.setState({scrollRight: true});
          if(this.state.index<=3){
              this.setState({index: this.state.index+3});
          }
      }

      seeMixtapes = () =>{
          console.log(this.state.mixtapes)
      }
      increaseView = (mixtapeIncrease) =>{
          console.log("view increased for" + mixtapeIncrease.name)
        this.state.db.increaseView(mixtapeIncrease, this.state.selectedMixtape.views+1)
      }
      setSelectedTrackList = (result) => {
        this.setState({trackList: result}, ()=>{this.increaseView(this.state.selectedMixtape)})
      }
      getTracksWithURL = () =>{
        if(this.state.selectedMixtape!==""){
            console.log("search working")
        this.state.search.getTrackWithURL(this.state.selectedMixtape.tracks[0].href, this.setSelectedTrackList)
        }

      }
      setSelectedMixtape = (mixtape) => {
        this.setState({
            selectedMixtape: this.props.mixtapes[parseInt(mixtape.target.id.slice(-1))+this.state.index-1]
          },()=> this.getTracksWithURL());

          
      }
      resetSelectedMixtape = () => {
        this.setState({
            selectedMixtape: ""
        });
    }

    static getDerivedStateFromProps(props, state){
        let initMixtapes = props.mixtapes.sort((a, b) => b.views-a.views);

        return{
            mixtapes: initMixtapes
        }
    }
    componentDidMount(){

    }


    render() {
        // this.mixtape = {};
        // this.mixtape.mixtapeName = "Mixtape Name";
        // this.mixtape.publishedBy = "Publish Name";
        // this.mixtape.imgURL1 = "https://source.unsplash.com/user/erondu/140x140";
        // this.mixtape.imgURL2 = "https://picsum.photos/200/300";
        // this.mixtape.imgURL3= "https://picsum.photos/200/300"

       

        return(
            <div className="featured_mixtape_main"> 
                {this.state.mixtapes.length>0 &&
                <div id="featured_mixtape_1" onClick={this.setSelectedMixtape}>                     
                    <div id="featured_mixtape_item_container1">
                    
                        <img className="featured_mixtape_item" id="featured_mixtape_image1"  src = {this.state.mixtapes[this.state.index].images[0].url}></img>
                    </div>
                    <div className="featured_mixtape_name" id="featured_mixtape_name1" style={{position: 'absolute', bottom: '40%', left: '21%', fontFamily: 'cursive', fontSize: 25}}>{this.state.mixtapes[this.state.index].name}</div>
                    {/* <button style={{width: 50, height: 50, position: 'absolute', top: 730, left: 400}}class="btn btn-block btn-primary"><i class="fa fa-thumbs-up fa-2x"></i> </button> */}
                    <div className="featured_mixtape_likes" style={{position: 'absolute', bottom:'7%', left: '22%', fontSize: 25, zIndex: '-1'}}>{this.state.mixtapes[this.state.index].views} Views</div> 
                </div>
                }
                {this.state.mixtapes.length>0 && 
                <div id="featured_mixtape_2" onClick={this.setSelectedMixtape}>
                    <div id="featured_mixtape_item_container2">               
                        <img className="featured_mixtape_item" id="featured_mixtape_image2" src = {this.state.mixtapes[this.state.index+1].images[0].url}></img>
                    </div>
                    <div className="featured_mixtape_name" id="featured_mixtape_name2"style={{position: 'absolute', bottom: '40%', left: '42%', fontFamily: 'cursive', fontSize: 25}}>{this.state.mixtapes[this.state.index+1].name}</div>
                    {/* <button style={{width: 50, height: 50,  position: 'absolute', top: 730, left: 800}}class="btn btn-block btn-primary"><i class="fa fa-thumbs-up fa-2x"></i> </button> */}
                    <div className="featured_mixtape_likes" style={{position: 'absolute', bottom:'7%', left: '43%', fontSize: 25, zIndex: '-1'}}>{this.state.mixtapes[this.state.index+1].views} Views</div> 
                </div> 
                }
                {this.state.mixtapes.length>0 &&
                <div id="featured_mixtape_3" onClick={this.setSelectedMixtape}>                     
                    <div id="featured_mixtape_item_container3">   
                        <img className="featured_mixtape_item" id="featured_mixtape_image3" src = {this.state.mixtapes[this.state.index+2].images[0].url}></img>
                    </div>
                    <div className="featured_mixtape_name" id="featured_mixtape_name3" style={{position: 'absolute', bottom: '40%', left: '63%', fontFamily: 'cursive', fontSize: 25}}>{this.state.mixtapes[this.state.index+2].name}</div>
                    {/* <button style={{width: 50, height: 50,  position: 'absolute', top: 730, left: 1200}}class="btn btn-block btn-primary"><i class="fa fa-thumbs-up fa-2x"></i> </button> */}
                    <div className="featured_mixtape_likes"  style={{position: 'absolute', bottom:'7%', left: '64%', fontSize: 25, zIndex: '-1'}}>{this.state.mixtapes[this.state.index+2].views} Views</div> 
                </div>
                }
                <button id="featured_mixtapes_scroll_left" disabled={this.state.index==0} onClick = {this.scrollLeft} style={{position: 'absolute', height: '140px', width: '140px', borderRadius: '50%', left: '10%', bottom: '20%'}}>
                    <i class="fa fa-arrow-circle-left"style={{fontSize: '130px'}}> </i>
                </button> 
                <button id="featured_mixtapes_scroll_right" disabled={this.state.index==6} onClick = {this.scrollRight}style={{position: 'absolute', height: '140px', width: '140px', borderRadius: '50%', right: '11%', bottom: '20%'}}>
                    <i class="fa fa-arrow-circle-right"style={{fontSize: '130px'}}> </i>
                </button>
                {this.state.selectedMixtape &&
                <FeaturedMixtapeOverlay 
                        mixtape={this.state.selectedMixtape}
                        trackList={this.state.trackList}
                        resetSelectedMixtape={this.resetSelectedMixtape} 
                 ></FeaturedMixtapeOverlay>
                }
            </div> 


        )
    }
}
  
export default FeaturedMixtapeItem;