const express = require("express");
const router = express.Router();

const {localfileUpload, imageUpload, videoUpload} = require("../controllers/FileController");

// api route
router.post("/localfileUpload", localfileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);


module.exports = router;