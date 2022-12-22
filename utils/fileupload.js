const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "content");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: { fieldSize: 100000 * 100 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|png|mp4|mkv|flv|mov|wmv|gif/;
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname));
        console.log("file", mimeType, extname);
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("only images supported");

    }
}).single("content");

module.exports = upload;