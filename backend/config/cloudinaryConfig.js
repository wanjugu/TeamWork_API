const { config, uploader } = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();
const cloudinaryConfig = (req, res, next) => {
  config({
    'cloud_name': 'dybd3fvj1',
    'api_key':228583311129153,
    'api_secret': 'IkWPya5wYHG0KItAOxiuerW6VR8'
  });
  next();
}

module.exports =  { cloudinaryConfig, uploader };