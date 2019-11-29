const db = require('../config/db');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const dotenv = require('dotenv');
dotenv.config();

const pool = db.pool;

  const Articles = {
      /*
      *Create an article
       */
      async createNewArticle(req, res,next){ 
          auth.userLoggedIn(req,res,next);

          const createArticle = `INSERT INTO articles(title,content,author_id,featured_image,categories,date_created) 
          VALUES($1,$2,$3,$4,$5,$6)
          returning *`;

          const values = [
              req.body.title,
              req.body.content,
              req.user.id,
              req.body.featured_image,
              req.body.categories,
              moment(new Date())
          ];

          try{
              const { rows } = await pool.query(createArticle,values);
              return res.status(201).send(rows[0]);
          }catch(error){
              return res.status(400).json({error: error});
          }  
         
      },

      //fetch all  articles
      async getAllArticles(req,res,next){
        //auth.userLoggedIn(req,res,next);
          const fetchAllArticles = 'SELECT * FROM articles ORDER bY id DESC';
          try{
              const { rows, rowcount } = await pool.query(fetchAllArticles);
              return res.status(200).json(rows); 
          }catch(error){
              return res.status(400).json({error: error});
          }
    
      },

      //update articles by userid
      async updateArticle(req,res){
          const findOneArticle = 'SELECT id, title, content, author_id, featured_image,categories,last_modified FROM articles WHERE id=$1  AND author_id =$2';
          const updateArticle = `UPDATE articles
          SET title=$1, content=$2,featured_image=$3,categories=$4,last_modified=$5 WHERE id=$6 AND author_id=$7 returning *`;

          try{
              const userId = req.user.id;             
              const { rows } = await pool.query(findOneArticle,[req.params.id,userId]);
             
              if(!rows[0]){
               
                  return res.status(404).send({'message': 'Article not found'});
              }
              const values = [
                  req.body.title || rows[0].title,
                  req.body.content || rows[0].content,
                  req.body.featured_image || rows[0].featured_image,
                  req.body.categories || rows[0].categories,
                  moment(new Date()),
                  req.params.id,
                  req.user.id
              ];

              const response = await pool.query(updateArticle, values);
              return res.status(200).json({message: 'Article Updated Successfully!'});
              //return res.status(200).send(response.row[0]);
          }catch(error){
              return res.status(400).send(error);
          }
      },

      //get article by id
      async getArticleById(req,res){
          const fetchOne = 'SELECT * FROM articles WHERE id = $1';
          try{
              const { rows } = await pool.query(fetchOne,[req.params.id]);
              if(!rows[0]){
                return res.status(404).json({message: 'Article not found'});
              } 
                return res.status(200).send(rows[0]); 
          }catch(error){
              return res.status(400).json({error: error});
          }
      },

      //Delete Article 
      async delete(req,res){
               
          const userId = req.user.id;
          const deleteOne = 'DELETE FROM articles WHERE id = $1 AND author_id=$2 returning *';

          try{
            const { rows } = await pool.query(deleteOne,[req.params.id, userId]);            
            if(!rows[0]){
                return res.status(404).send({'message': 'No Article found'});
            }
            return res.status(204).send({'message': 'Article deleted'});

          }catch(error){
              return res.status(400).send({error});
          }         
      }
  }

module.exports = Articles;