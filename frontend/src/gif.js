import React, {Component} from 'react';
import PostedImages from './PostedGif';
import '../src/App.css'



class PostedGif extends Component {
    render() {
        return (
            <PostedImages gifs={this.state.gifs} />
        )
    }

    state = {
      gifs: []
    };

    componentDidMount() {
        fetch('https://team-work-api-v1.herokuapp.com/api/v1/gifs')
            .then(res => res.json())
            .then((data) => {
                this.setState({ gifs: data })
            })
            .catch(console.log)
    }
}

export default PostedGif;