const path = require('path')
const multer = require('multer')
const MAX_LIMIT = 10; // in mb

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb){
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function(req,file,callback){
    // application/pdf
    if(
      file.mimetype == "application/pdf"
    ) {
      callback(null, true)
    } else {
      console.log('only pdf file supported!')
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * MAX_LIMIT
  }
})

module.exports = upload;