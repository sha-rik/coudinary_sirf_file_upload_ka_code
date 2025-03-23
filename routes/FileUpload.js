const express = require("express");
const router = express.Router();

// ab ham apne controller me se sare handler funtion leke aayege
const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require("../controllers/fileUpload");

// api routes
router.post("/localFileUpload", localFileUpload);

module.exports = router;
// ye file upload karne ka api h jo local file ko server par upload karta h
