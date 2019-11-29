const db = require('../config/db');
const moment = require('moment');
const auth = require('../middleware/auth');

const pool = db.pool;

const Gif = {
    async uploadGif(url,req,res){
      const newGif = 
        `INSERT INTO gallery(title,image_url,user_id,date_created)
        VALUES($1,$2,$3,$4) returning *`;

        const values = [
            req.body.title,
            url,
            req.user.id,
            moment(new Date())
        ];

        try{
            const { rows } = await pool.query(newGif,values);
            console.log(rows);
            console.log("GIf Post saved successfull");
            return ;

        }catch(error){
            console.log(error);
            return;
        }
    },

    //fetch all gifs
    async GetAllGifs(req,res,next){
        const fetchAllGifs = `SELECT id,title,image_url,user_id,date_created FROM gallery ORDER BY date_created DESC`;

         try{
             const { rows,rowCount } = await pool.query(fetchAllGifs);
             return res.status(200).json(rows); 
            
         }catch(error){
         
             return res.status(400).json({error});
         }       

    },

      //fetch one gifs
      async GetOneGifs(req,res,next){
        const fetchOneGifs = `SELECT id,title,image_url,user_id FROM gallery WHERE id=$1 ORDER BY date_created`;

         try{
             const { rows,rowCount } = await pool.query(fetchOneGifs,[req.params.id]);
             return res.status(200).send({rows,rowCount});
            
         }catch(error){
             res.status(400).json({error});
         }         

    },


    //delete Gif from postgres db
    //to do -- Delete from  cloudinary server
    async DeleteGif(req,res,next){
        const query = `DELETE FROM gallery WHERE id=$1 AND user_id=$2 returning *`;

        try{
            const { rows } = await pool.query(query,[req.params.id, req.user.id]);
            if(!rows[0]){
                return res.status(404).send({'message': 'GIF not found'});
            }
            return res.status(200).json({message: 'GIF image deleted Successfully'})
        }catch(error){
            return res.status(400).json({error});
        }
    }




}

module.exports = Gif;