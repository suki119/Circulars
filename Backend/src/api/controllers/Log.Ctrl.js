const Log = require("../model/Log.Model");

//create log
const createLog = (req, res) => {

    console.log(`<-- ${req.method} Request`);
    //const log = new Log(req.body);
    const log = new Log({
        userid: req.body.userId,
        loggedIn: String(Date.now()),
        loggedOut: ""
    });

    Log.create(log).then((savedLog) => {
        res.json(savedLog._id);
console.log(savedLog._id);
        console.log(`--> ${req.method} Response`);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//update log
const updateLog = (req, res) => {
    console.log(`<-- ${req.method} Request`);
    const id = req.params.id;

    Log.findByIdAndUpdate(id, {
        $set: {
            loggedOut: String(Date.now()),
        }
    }, {
        new: true
    }).then(() => {
        res.json("Log Updated")
        console.log(`--> ${req.method} Response`);
        console.log("logout ok");
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//get all the logs
const readAllLogs = (req, res) => {
    console.log(`<-- ${req.method} Request`);

    Log.find().then((logs) => {
        console.log(`--> ${req.method} Response`);
        res.json(logs);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

module.exports = {createLog, updateLog, readAllLogs}