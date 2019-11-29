import React from 'react'


const PostedImages = ({ gifs }) => {
    return (
        <div>
           
              <div className="header">
                        <h2>GIF</h2> 
                     </div>
            {gifs.map((rows) => (                         
                  

                     <div className="row">
                         <div className="leftcolumn">
                         <div class="card">
                            <h2>{rows.title}</h2>
                            <h5>Posted on, {rows.date_created}</h5>
                         </div>
                             <div className="img">
                                 <img src={rows.image_url} alt="https://dummyimage.com/hd1080" />
                                
                             </div>
                             <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                             <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                             <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                             <hr />
                             
                         </div>
                     </div>
                         
                 

                
            ))}
              <div className="footer">
                     <h6>&copy; 2019 Team Work </h6>
                 </div>
        </div>
    )
};

export default PostedImages