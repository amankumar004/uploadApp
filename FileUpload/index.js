// app create
const express = require("express");
const app = express();

// Port finding
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware addition
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

// db connection
const db = require("../FileUpload/config/database");
db.connect();

// cloudinary connection
const cloduinary = require("../FileUpload/config/cloudinary");
cloduinary.cloudinaryConnect();

// mount api route
const upload = require("../FileUpload/routes/FileUpload");
app.use("/api/v1/upload", upload);

// start the server
app.listen(PORT, () => {
    console.log("App is running at " + PORT);
})