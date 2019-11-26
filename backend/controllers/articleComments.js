const db = require('../config/db');
const moment = require('moment');
const auth = require('../middleware/auth');

const pool = db.pool;

const Comments = {

    async addComment(req,res,next){
        auth.userLoggedIn(req,res,next);
        
        const newComment =
         `INSERT INTO article_comments(article_id,user_id,comment,date_created) 
         VALUES($1,$2,$3,$4) returning *`;

         const values = [
             req.params.id,
             req.user.id,
             req.body.comment,
             moment(new Date())
         ];

         try{
             const { rows } = await pool.query(newComment,values);
             return res.status(201).send({'message': 'Comment posted successfully'});

         }catch(error){
             return res.status(400).json({error:error});
         }
    },

    //fetch all articles associated with a post
    async getArticleComments(req,res,next){
        const fetchCommentById= 
            `SELECT * FROM article_comments WHERE article_id=$1`;

            try{
                const { rows, rowsCount } = await pool.query(fetchCommentById,[req.params.id]);
                return res.status(200).send({rows,rowsCount})
            }catch(error){
                return res.status(400).json({error});
            }
    },

    //allow logged in user to edit comment
    async updateComment(req,res){
        const findOne = `SELECT id, article_id,user_id,comment FROM article_comments 
        WHERE id=$1 AND user_id= $2`;
        
        const updateComment = `UPDATE article_comments SET 
        comment = $1, last_modified= $2 WHERE id=$3 AND user_id= $4 returning *`;

        try{
            const userId = req.user.id;
            const { rows } = await pool.query(findOne,[req.params.id,userId]);
            if(!rows[0]){               
                return res.status(404).send({'message': 'Comment not found'})
            }
            const values = [
                req.body.comment || rows[0].comment,
                moment(new Date()),
                req.params.id,
                userId,
            ];
            const response = await pool.query(updateComment,values);
            return res.status(200).json({message: 'Comment Updated Successfully!'});
        }catch(error){
            return res.status(400).json({error});
        }         
    },

    async delete(req,res,next){
        const userId = req.user.id;
        const deleteOne = `DELETE FROM article_comments WHERE id=$1 AND user_id=$2 returning *`;
            try{
                const { rows } = await pool.query(deleteOne,[req.params.commentId,userId]);
                console.log(rows);

                if(!rows[0]){
                    return res.status(404).send({'message':'Comment not found'});
                }
                return res.status(200).json({message: 'Comment deleted Successfully'});
            }catch(error){   
                            
                return res.status(400).send({error});
            }
    }
    

}

module.exports = Comments;