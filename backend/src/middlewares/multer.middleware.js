import multer from "multer"

// Determine destination based on environment
const tempPath = process.env.NODE_ENV === 'production' ? '/tmp' : './public/temp';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempPath)
    },
    filename: function (req, file, cb) {
      //THis is just fancy : const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname )
    }
  })

  export const upload = multer({storage:storage})