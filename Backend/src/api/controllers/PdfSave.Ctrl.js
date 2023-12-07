// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.static('public'));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer({storage}).array('file');
// //route: 

// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             return res.status(500).json(err)
//         }

//         return res.status(200).send(req.files)
//     })
// });
// ///unwanted
// const createFileUpload = async (req, res) => {

//     console.log(`<-- ${req.method} Request`);
//     const fileUpload = new FileUpload(req.body);
//     const {eng_title,sin_title,type,division,keywords,location,date} = new FileUpload(req.body);

//     FileUpload.create(fileUpload).then(() => {
//         res.json("File Upload added")
//         console.log(`--> ${req.method} Response`);
//     }).catch((error) => {
//         console.log(`${error.message}`)
//     })
// }