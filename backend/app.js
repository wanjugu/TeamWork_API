const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');


const { uploader, cloudinaryConfig } = require('./config/cloudinaryConfig');
const { multerUploads, dataUri } = require('./middleware/multer');
const { resolve } = require('path');

app.use(express.static(resolve(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*', cloudinaryConfig);



// const multerUploads =require('./middleware/multer');

const users = require('./controllers/user');
const Auth = require('./middleware/auth');
const db = require('./config/db');

const Articles = require('./controllers/article');
const ArticleComments = require('./controllers/articleComments');
const GifUpload = require('./controllers/gifUpload');
const GifComment = require('./controllers/gifComment');

dotenv.config();
//Cross origin
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,PUT,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Content, Accept,Authorization, X-Auth-Token, content-type');
//     next();
//    });


   app.get('/',(req,res)=>{
    res.json({
        message: 'welcome to our app'
    });
});

app.post('/api/v1/users',Auth.verifyToken,users.create);
app.post('/api/v1/users/login',users.login);
app.delete('/api/v1/users/me', Auth.verifyToken, users.delete);

//articles
app.get('/api/v1/articles',Articles.getAllArticles);
app.get('/api/v1/articles/:id',Articles.getArticleById);
app.post('/api/v1/articles',Auth.verifyToken,Articles.createNewArticle);
app.put('/api/v1/articles/:id',Auth.verifyToken,Articles.updateArticle);
app.delete('/api/v1/articles/:id',Auth.verifyToken,Articles.delete);

//articles comment
app.post('/api/v1/articles/:id/comment',Auth.verifyToken,ArticleComments.addComment);
app.get('/api/v1/articles/:id/comments',Auth.verifyToken,ArticleComments.getArticleComments);
app.put('/api/v1/articles/:id/comment',Auth.verifyToken,ArticleComments.updateComment);
app.delete('/api/v1/articles/comment/:commentId',Auth.verifyToken,ArticleComments.delete);


//app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
app.get('/api/v1/gifs',GifUpload.GetAllGifs);
app.get('/api/v1/gif/:id',GifUpload.GetOneGifs);
app.delete('/api/v1/gif/:id',Auth.verifyToken,GifUpload.DeleteGif);
app.post('/api/v1/gif/:id/comment',Auth.verifyToken,GifComment.NewGifComment);
app.put('/api/v1/gif/comment/:id',Auth.verifyToken,GifComment.UpdateGifComment);
app.delete('/api/v1/gif/comment/:id',Auth.verifyToken,GifComment.DeleteComment);
//GIF UPLoad using Cloudinary and multer
app.post('/api/v1/upload',Auth.verifyToken, multerUploads, (req, res) => {
 if(req.file) {
  const file = dataUri(req).content;
  return uploader.upload(file).then((result) => {
    const image = result.url;
    
    try{
      //post image url to postgres
      GifUpload.uploadGif(image,req,res);            
      
    }catch(err){
      console.log(err);
      res.status(404).json({err})
      return;
    }
    

    return res.status(200).json({
      messge: 'Your image has been uploded successfully to cloudinary',
      data: {
        image
      }
    })
  }).catch((err) => res.status(400).json({
    messge: 'someting went wrong while processing your request',
    data: {
      err
    }
  }))
 }
});
module.exports = app;