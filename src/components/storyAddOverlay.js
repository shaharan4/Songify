import React from 'react';
import './storyoverlay.css';
import SearchResultStoryOverlay from './searchResultStoryOverlay';
import SearchResultCard from './searchResultCard.js';
import PlayMusicOverlay from './playMusicOverlay.js';
import Search from './search.js';
import DatabaseHandler from './databaseHandler';
import { uuid } from 'uuidv4';


class StoryAddOverlay extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username:null,
            password:null,
            selectedSong: {
                album: {
                    images: [
                        {
                            url: ""
                        }
                    ]
                },
                artists: [
                    {
                        name: "null"
                    }
                ],
                name: "null",
            },
            story: {
                story_photo: "",
                story_message: "",
                story_date_created: null,
                story_time_to_live: -1,
                story_privacy: "",
                story_id: "",
                story_publisher : this.props.user.account_name,
                track: {}
            },
            renderSearchResultOverlay: false
        }
        this.props.setSelectedStory(this.state.story)
    }
    search = (e) => {
        if (e) {
          e.preventDefault();
        }
        let search_input = document.getElementById("search_input").value;
        if (search_input != "") {
            new Search(search_input, "track", this.setSearchResult);
            // this.showSearchResultStoryOverlay();
            this.setState({
                renderSearchResultOverlay: true
            })
        }
    }
    showSearchResultStoryOverlay = () => {
        document.getElementById("search_result_overlay_container_story").style.display = "block";
      }
    setSearchResult = (result) => {
        this.setState({
          searchResult: result
        })
        console.log(this.state.searchResult)
    }


    componentDidMount(){
        console.log("componentDidMount === ", this.state.username);
    }
    componentWillMount(){
        console.log("componentwillMount === ", this.state.username);
    }

    // componentDidUpdate(){
        // var text = document.getElementById("story_input").value();
        // console.log("THe text value is = ",text);
    // }

    hide = () => {
        // window.document.getElementById("story_add_overlay_container").style.display = "none";
        this.props.setRenderStoryAddOverlay(false)
    }
    show = function() {
        window.document.getElementById("story_add_overlay_container").style.display = "block";
    }
    setSelectedSong = (song) => {
        this.setState({
            selectedSong: song
        })
        let story = this.state.story;
        story.track = song;
        this.setState({
            story: story
        })
        this.props.setSelectedStory(this.state.story);
        console.log(song);
    }
    addStory = () => {
        let db = new DatabaseHandler();
        let story = {
            story_photo: "https://picsum.photos/id/18/400",
            story_message: document.getElementById("story_input").value,
            story_date_created: "00-00-0000",
            story_time_to_live: -1,
            story_privacy: "everyone",
            story_id: uuid(),
            story_publisher : this.props.user.account_name,
            track: this.state.selectedSong
        }
        this.setState({
            story: story
        })
        db.addStory(story, (res) => {console.log(res)})
        db.addStoryToUser(story, this.props.user, () => {
            // this.props.setRenderStoryAddOverlay(false)
            let user = this.props.user;
            user.stories.push(story);
            //add to localstorage
            localStorage.setItem("user", JSON.stringify(user));
            console.log(JSON.parse(localStorage.getItem("user")));
            // window.location.reload();
            this.props.setRenderStoryAddOverlay(false)
        });
    }
    renderSearchResultOverlay = () => {
        if (this.state.renderSearchResultOverlay) {
            console.log("search result")
            return(
                <SearchResultStoryOverlay
                tracks={this.state.searchResult}
                setSelectedSong={this.setSelectedSong}
                setSelectedMixtape={this.setSelectedMixtape}
                setPlayMusicOverlay={this.props.setPlayMusicOverlay}
                setRenderSearchResultOverlay={this.setRenderSearchResultOverlay}
                addToMixtape={this.addToMixtape}
                setSelectedtory={this.props.setSelectedStory}
                // selectSong={this.selectSong}
                ></SearchResultStoryOverlay>
            )
        }
    }
    setRenderSearchResultOverlay = (val) => {
        console.log("setRenderSearchResultOverlay", val)
        this.setState({
            renderSearchResultOverlay: val
        })
    }
    addToMixtape = (song) => {
        this.setState({
            selectedSong: song
        })
    }
    onKeyDown = (e) => {
        if (e.keyCode == 13) {
          console.log("prevent default", e.keyCode)
          e.preventDefault();
          this.search(e);
        }
    }
    render() {
        return(
            
                <div id="story_add_overlay_container" className="story_add_overlay_container">
                    <div className="story_play_music_overlay_wrapper">
                        <div className="story_play_music_exit"onClick={this.hide}>
                            <i class="fa fa-times-circle fa-5x play_music_exit" ></i>
                        </div>
                        <img className="story_play_music_photo" src="https://source.unsplash.com/user/erondu/600x600"></img>
                        
                        <form action="/story_page"  onSubmit={function(e){
                            e.preventDefault();
                            this.props.onSubmit(
                                e.target.textmessage.value
                            );
                            // window.close();
                            }.bind(this)}>   
                            <div id="story_editor">
                                <textarea id="story_input" placeholder=" type something..." name = "textmessage"></textarea>
                            </div>
                            <div className="story_add_song_container">
                                <div>
                                    <div>
                                        <img src={this.state.selectedSong.album.images[0].url} className="story_add_song_img"></img>
                                    </div>
                                    <div>
                                        <div className="story_add_song_info">
                                            <div style={{overflow: "hidden;"}}>
                                                Name: {this.state.selectedSong.name}
                                            </div>
                                            <div>
                                                Artist: {this.state.selectedSong.artists[0].name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className="search_container_story">
                                <input id="search_input" className="search_bar" type="search" onClick={this.onClick} placeholder="Search" aria-label="Search" onKeyDown={this.onKeyDown}/>
                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                <button id="search" className="search_button" type="submit"><i class="fa fa-search" onClick={this.search}></i></button>
                            </form>
                            <button id="story_addbutton"type="submit" class="btn btn-secondary mb-3" onClick={this.addStory}>Add Story</button>
                        </form>
                        {/* <SearchResultStoryOverlay
                        tracks={this.state.searchResult}
                        setSelectedSong={this.setSelectedSong}
                        setSelectedMixtape={this.setSelectedMixtape}
                        setPlayMusicOverlay={this.props.setPlayMusicOverlay}
                        addToMixtape={this.addToMixtape}
                        // selectSong={this.selectSong}
                        ></SearchResultStoryOverlay> */}
                        {this.renderSearchResultOverlay()}
                       
                        {/* <text className="story_play_music_text">It was a great day, today I bought a lottery and I won. So I got 100 million dollars. What should I do from now on? Should I stop studying? LOL</text>
                        <div className="story_play_music_progress_bar">
                            <p className="story_play_music_progress_bar_whole"></p>
                            <p className="story_play_music_progress_bar_part"></p>
                        </div>
                        <div className="story_play_music_info">
                            <p className="story_play_music_name">Music Name</p><br/>
                            <div className="story_play_music_author">Author</div>
                            <div className="story_play_music_length">- 3:47</div>
                        </div>
                        <div className="story_play_music_tools">
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                            <i class="fa fa-backward play_music_previous"></i>
                            <i class="fa fa-play-circle-o fa-2x play_music_pause_play"></i>
                            <i class="fa fa-forward play_music_next"></i> */}
                        {/* </div> */}
                    </div>
                </div>
        )
    }
}
  
export default StoryAddOverlay;