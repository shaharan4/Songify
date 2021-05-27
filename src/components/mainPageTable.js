import React from 'react';
import FeaturedMixtapeItem from './FeaturedMixtapeItem.js';
import './mainPage.css';
import DatabaseHandler from './databaseHandler';

class MainPageTable extends React.Component {
    constructor(props){
    super(props);
        // {this.getMixtapes()};
    this.state={
      // mixtapes: !this.mixtapes? localStorage.getItem('data'):null,
      loggedIn : false,
      featuredMixtapes: [
        {
          mixtapeName: "Mixtape 1",
          mixtapeImage: "https://source.unsplash.com/user/erondu/140x140",
          mixtapeLikes: 223,
        },
        {
          mixtapeName: "Mixtape 2",
          mixtapeImage: "https://picsum.photos/200/300",
          mixtapeLikes: 126,
        },
        {
          mixtapeName: "Mixtape 3",
          mixtapeImage: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
          mixtapeLikes: 875,
        },
        {
          mixtapeName: "Mixtape 4",
          mixtapeImage: "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9",
          mixtapeLikes: 670,
        },
        {
          mixtapeName: "Mixtape 5",
          mixtapeImage: "https://scitechdaily.com/images/Cat-Wearing-COVID-19-Mask.jpg",
          mixtapeLikes: 467,
        },
        {
          mixtapeName: "Mixtape 6",
          mixtapeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS896DEKx4JsUoHqzPwAcNOroTQ7LPo8QuP5A&usqp=CAU",
          mixtapeLikes: 588,
        },
        {
          mixtapeName: "Mixtape 7",
          mixtapeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnnyiQOuh2odeTOWlEwrOVljPafPRBZFiasQ&usqp=CAU",
          mixtapeLikes: 521,
        },
        {
          mixtapeName: "Mixtape 8",
          mixtapeImage: "https://s.abcnews.com/images/Business/racecar-lexus-ht-ps-181121_hpEmbed_5x3_992.jpg",
          mixtapeLikes: 239,
        },
        {
          mixtapeName: "Mixtape 9",
          mixtapeImage: "https://picsum.photos/200/300",
          mixtapeLikes: 417,
        },
      ]
    }

  }
  
    showPlayMusicOverlay = function() {
      window.document.getElementById("play_music_overlay_container").style.display = "block";
    }
    // getMixtapes = () =>{
    //   let db = new DatabaseHandler;
    //   db.getMixtapes((data)=>{this.setState({mixtapes: data});
    //   localStorage.setItem('data', JSON.stringify(data))});
  
    // }
    componentDidMount(){
              // {this.getMixtapes()};
    }
    render() {
        let n = 3;
        let rows = [];
        let j = 0;
        for(var i=0; i<n; i++) {
            rows.push(i);
        }
        document.body.style = 'background: #2d2d31;'
        return(
            <div className="mainpage_table_container">
              <table class="table" className="my_mixtapes_table">
                <thead>
                  <tr>
                    <th id="top_featured_mixtapes_text" style={{textDecoration: 'underline', top: '-30px'}}>Top Featured Mixtapes</th>
                    {/* <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th> */}
                  </tr>
                </thead>
                        
                    <FeaturedMixtapeItem featuredMixtapes={this.state.featuredMixtapes} mixtapes={this.props.mixtapes}></FeaturedMixtapeItem>
                     
              </table>
            </div>
        )
    }
}
  
export default MainPageTable;