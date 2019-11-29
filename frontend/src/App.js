import React, {Component} from 'react';
import Articles from './Articles';
import '../src/App.css'



class App extends Component {
    render() {
        return (
            <Articles articles={this.state.articles} />
        )
    }

    state = {
      articles: []
    };

    componentDidMount() {
        fetch('https://team-work-api-v1.herokuapp.com/api/v1/articles')
            .then(res => res.json())
            .then((data) => {
                this.setState({ articles: data })
            })
            .catch(console.log)
    }
}

export default App;