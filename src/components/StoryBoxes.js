import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './storyPage.css'
import { Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import StoryBoxesItem from './StoryBoxesItem'


class StoryBoxes extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.ifFromMyStories)
    }
    renderItems() {
        // console.log("FUCKs"+this.props.storyItems[0].story_message)
        // console.log(this.props)
        return this.props.storyItems.map((item, index) => 
            <StoryBoxesItem 
            key={index} 
            {...item}
            setPlayMusicOverlay={this.props.setPlayMusicOverlay}
            setSelectedStory={this.props.setSelectedStory}
            ifFromMyStories={this.props.ifFromMyStories}
            user={this.props.user}/>
        )
    }

    render() {
        // const numbers = [1,2,3,4,5];
        // const listItems = numbers.map(number => <p>{number}</p>)
        return (
            <div className = "list-items">
                {this.renderItems()}
            </div>
        )
    }
}


  export default StoryBoxes;