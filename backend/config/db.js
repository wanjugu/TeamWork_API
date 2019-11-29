const { Pool } = require('pg');
const dotenv = require('dotenv');



dotenv.config();

const pool = new Pool({
   // connectionString: process.env.DB_URL
  user: 'hdfgvhycembtcf',
  host: 'ec2-174-129-29-101.compute-1.amazonaws.com',
  database: 'd87r02ar6crre5',
  password: '74010842e9f6620620094a1edd56fdf713a1eca6277f741e0afc93ad2aad0d87',
  port: 5432,
});

pool.on('connect',() => {
    console.log('connected to the Database');
});

/**
 *create  articles table
 */
const createArticleTable = () => {
  const queryText = 
  `CREATE TABLE IF NOT EXISTS Articles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL,
    featured_image VARCHAR(250),
    categories VARCHAR(255),    
    date_created TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP
  )`;

  pool.query(queryText).then((res)=>{
    console.log(res);
    pool.end();
  }).catch((err) =>{
    console.log(err);
    pool.end();
  });
}

const createArticleCommentsTable = () =>{
  const query = 
  `CREATE TABLE IF NOT EXISTS article_comments(
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    user_id UUID NOT NULL,
    comment TEXT NOT NULL,
    date_created TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP  WITH TIME ZONE
  )`;
  pool.query(query).then((res)=>{
    console.log(res);
    pool.end();
  }).catch((err) =>{
    console.log(err);
    pool.end();
  });
}

//image table
const uploadImage = () =>{
  const query = `CREATE TABLE IF NOT EXISTS gallery(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_url VARCHAR(250) NOT NULL,
    alt_text VARCHAR(100) NULL,
    image_type VARCHAR(50),
    user_id UUID NOT NULL,
    date_created TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP  WITH TIME ZONE
  )`;

  pool.query(query).then((res)=>{
    console.log(res);
    pool.end();
  }).catch((err) =>{
    console.log(err);
    pool.end();
  });
}

//GIF comments
const createGifCommentsTable = () =>{
  const query = 
  `CREATE TABLE IF NOT EXISTS gif_comments(
      id SERIAL PRIMARY KEY,
      gif_id INTEGER NOT NULL,
      user_id UUID NOT NULL,
      comment VARCHAR(250) NOT NULL,
      date_created TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_modified TIMESTAMP  WITH TIME ZONE)`;

      pool.query(query).then((res)=>{
        console.log(res);
        pool.end();
      }).catch((err) =>{
        console.log(err);
        pool.end();
      });
    

}


const createAllTables = () =>{
  createArticleTable();  
  createArticleCommentsTable();
  uploadImage();
  createGifCommentsTable();
}


module.exports = {  
  pool,
  createAllTables,
 // createArticleTable,
  //createArticleCommentsTable
};

require('make-runnable');