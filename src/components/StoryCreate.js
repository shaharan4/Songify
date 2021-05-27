import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './storyPage.css'
import { Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import StoryBoxesItem from './StoryBoxesItem'


class StoryCreate extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.refs.createNewItemInput.value.trim()){
        }

        this.props.createItem(this.refs.createNewItemInput.value);
    }

    render() {
        return (
            <div className = "create-container">
                <form className="create-form" onSubmit={this.handleSubmit}>
                    <input type = "text" placeholder = "put something here"  ref="createNewItemInput"/>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}


  export default StoryCreate;