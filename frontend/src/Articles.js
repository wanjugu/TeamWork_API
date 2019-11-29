import React from 'react'
//import { Link, Route,BrowserRouter } from 'react-router-dom';
// import Switch from "react-switch";
// import Gif from './gif'
// import App from './App'


const Articles = ({articles}) => {
    return (
        <div> 
            <div className="navbar">
                <a href='/'>Articles</a>
                <a href='/gallery'>Gallery</a>
                <a href='/login'>Login</a>
            </div> 
        
              <div className="header">
                        <h2>Posts</h2> 
                     </div>
            {articles.map((rows) => (   

                     <div className="row">
                         <div className="leftcolumn">
                             <div className="card">
                                 <h2>{rows.title}</h2>
                             </div>
                             <hr />
                             <article>{rows.content}</article>                             
                         </div>
                     </div>
                          
                 

                
            ))}
              <div className="footer">
                     <h6>&copy; 2019 Team Work </h6>
                 </div>
        </div>
    )
};

export default Articles