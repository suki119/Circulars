const FileUpload = require("../model/QmsFileUpload.model");

//create fileUpload
const createFileUpload = async (req, res) => {

    console.log(`<-- ${req.method} Request`);
    //const fileUpload = new FileUpload(req.body);
    const fileUpload = new FileUpload({
        eng_title:req.body.eng_title,
        sin_title:req.body.sin_title,
        type:req.body.type,
        division:req.body.division,
        keywords:req.body.keywords,
        document:req.file.filename,
        date:req.body.date,
        documentLevel:req.body.documentLevel,
        subLevel:req.body.subLevel,
        qmsAccess:req.body.qmsAccess
    });

    FileUpload.create(fileUpload).then(() => {
        res.json("File Upload added")
        console.log(`--> ${req.method} Response`);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//update fileUpload
const updateFileUpload = (req,res)=>{

    console.log(`<-- ${req.method} Request`);
    const id = req.params.id;
    const fileUpload = new FileUpload(req.body);

    FileUpload.findByIdAndUpdate(id,fileUpload).then(() => {
        res.json("File updated")
        console.log(`--> ${req.method} Response`);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

//delete fileUpload
const deleteFileUpload = (req,res)=>{

    console.log(`<-- ${req.method} Request`);
    const id = req.params.id;

    FileUpload.findByIdAndDelete(id).then(() => {
        res.json("File deleted")
        console.log(`--> ${req.method} Response`);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

//get all the fileUploads
const readAllFileUploads = (req,res)=>{
        console.log(`<-- ${req.method} Request`);

        FileUpload.find().then((fileUploads)=>{
            console.log(`--> ${req.method} Response`);
            res.json(fileUploads);
        }).catch((error)=>{
            console.log(`${error.message}`)
        })
}

//get a fileUpload
const getFileUpload = (req,res)=> {
    console.log(`<-- ${req.method} Request`);
    const names = req.params.name;

    FileUpload.find({eng_title:names}).then((fileUpload)=>{
        console.log(`--> ${req.method} Response`);
        res.json(fileUpload);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

const getFileUploadByDivision = (req,res)=> {
    console.log(`<-- ${req.method} Request`);

    const division = req.body.division;

    FileUpload.find({division:division}).then((fileUpload)=>{
        console.log(`--> ${req.method} Response`);
        res.json(fileUpload);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

const getFileUploadByDivisionAndDate = (req,res)=> {
    console.log(`<-- ${req.method} Request`);

    const division = req.body.division;
    const date = req.body.date;

    FileUpload.find({division:division, date:date}).then((fileUpload)=>{
        console.log(`--> ${req.method} Response`);
        res.json(fileUpload);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

const getFileUploadByDivisionAndTitles = (req,res)=> {
    console.log(`<-- ${req.method} Request`);

    const division = req.body.division;
    const eng_title = req.body.eng_title;
    const sin_title = req.body.sin_title;

    FileUpload.find({ $and: [{division:division}, { $or: [{ eng_title: eng_title }, { sin_title: sin_title }]}]}).then((fileUpload)=>{
        console.log(`--> ${req.method} Response`);
        res.json(fileUpload);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

const getFileUploadByDivisionAndKeywords = (req,res)=> {
    console.log(`<-- ${req.method} Request`);

    const division = req.body.division;
    const keywords = req.body.keywords;

    FileUpload.find({ $and: [{division:division},{ keywords:{$all:keywords}}]}).then((fileUpload)=>{
        console.log(`--> ${req.method} Response`);
        res.json(fileUpload);
    }).catch((error)=>{
        console.log(`${error.message}`)
    })
}

module.exports = {createFileUpload,updateFileUpload,deleteFileUpload,readAllFileUploads,getFileUpload,getFileUploadByDivision,getFileUploadByDivisionAndDate,getFileUploadByDivisionAndTitles,getFileUploadByDivisionAndKeywords}