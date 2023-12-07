const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const DB_connect = require("./src/utils/database.connection");

const app = express();
const PORT = process.env.PORT || 4030;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Server Port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
  DB_connect().then(() => {
    console.log("MongoDB Connecting...");
  });
});

//routes
app.use("/upload", require("./src/api/routes/FileUpload.route"));
app.use("/QMS-upload", require("./src/api/routes/QmsFileUpload.route"));
app.use("/user", require("./src/api/routes/User.route"));
app.use("/log",require("./src/api/routes/Log.route"));