import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
//import PostedGif from './gif'
import './index.css';
import { Link, Route,BrowserRouter } from 'react-router-dom';
import Gif from './gif'
import Login from './Login'





ReactDOM.render(
    <BrowserRouter>	 
		  <Route exact path='/' component={App}/>
		  <Route exact path='/gallery' component={Gif}/>
          <Route exact path='/login' component={Login}/>
	  
	</BrowserRouter>,


    document.getElementById('root'));
//ReactDOM.render(<PostedGif />, document.getElementById('root'));


