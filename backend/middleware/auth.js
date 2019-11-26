const jwt = require('jsonwebtoken');
const db = require('../config/db');
const pool = db.pool;

const auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    //const token = req.headers['x-access-token'];
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      //const decoded = await jwt.verify(token, process.env.SECRET);
      const decoded = jwt.verify(token,process.env.SECRET);      
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await pool.query(text, [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };      
     
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  //Get the user logged in ID from token provided
  async userLoggedIn(req,res,next){
    const token = req.headers.authorization.split(' ')[1];
        if(!token) {
          return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {         
          const decoded = jwt.verify(token,process.env.SECRET);      
          const text = 'SELECT * FROM users WHERE id = $1';
          const { rows } = await pool.query(text, [decoded.userId]);
          if(!rows[0]) {
            return res.status(400).send({ 'message': 'The token you provided is invalid' });
          }
          req.user = { id: decoded.userId }; 
          return req.user;        
          
        } catch(error) {
          return res.status(400).send(error);
        }
       
  }
}




module.exports =  auth;