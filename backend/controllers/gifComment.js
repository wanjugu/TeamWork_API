const db = require('../config/db');
const moment = require('moment');
const auth = require('../middleware/auth');

const pool = db.pool;

const GifComment = {
    //Create Comment
    async NewGifComment(req,res,next){
        const insertQuery =`INSERT INTO gif_comments(gif_id,user_id,comment,date_created)
          VALUES($1,$2,$3,$4)`;

          const values = [
              req.params.id,
              req.user.id,
              req.body.comment,
              moment(new Date())
          ];

          try{
            const { rows } = await pool.query(insertQuery,values);          
            return res.status(201).send({'message': 'Comment posted successfully'});
          }catch(error){            
            return res.status(400).json({error:error});
          }

    },
    //Edit comment~gif
    async UpdateGifComment(req,res){
      const fetchOne = 
      `SELECT id,gif_id,user_id,comment, last_modified FROM gif_comments
       WHERE id=$1 AND user_id = $2`;

       const updateComment = 
        `UPDATE gif_comments SET comment=$1, last_modified= $2 WHERE id=$3 returning *`;
        try{
          const { rows } = await pool.query(fetchOne,[req.params.id, req.user.id]);
          if(!rows[0]){
            return res.status(404).json({message: 'Comment not found'});
          }
          const values = [
            req.body.comment || rows[0].comment,
            moment(new Date()),
            req.params.id
          ];

          const response = await pool.query(updateComment,values);
          return res.status(200).json({message: 'Gifs Comment Updated Successfully!'});
        }catch(error){
          console.log(error);
          return res.status(400).json({error});
        }

    },
    //delete comment~ gif
    async DeleteComment(req,res){
      const deleteOne = `DELETE FROM gif_comments WHERE id=$1 AND user_id=$2 returning *`;

      try{
        const { rows } = await pool.query(deleteOne,[req.params.id,req.user.id]);
        if(!rows[0]){
          return res.status(404).send({'message': 'Gif Comment not found!'});
        }
        return res.status(200).json({message: 'Gif Comment deleted successfully'});

      }catch(error){
        return res.status(400).json({error});

      }

    }
}
module.exports = GifComment;
