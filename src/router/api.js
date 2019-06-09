const express = require("express");
const router = express.Router();
const testingEmail = require('../controller/auth.controller')
const postdata= require('../controller/crimedetail.controller');
const type = require('../controller/type.controller');
const comment = require('../controller/comment.controller');
const missing = require('../controller/missing.controller');

router.post('/signup',testingEmail.nodeMailer);

router.post('/login',testingEmail.login)

router.post('/crimedetails',postdata.postDetails);

router.post('/crime-type', type.type);

router.post('/post-comment',comment.postComment);

router.post('/missing-people',missing.missingperson);

module.exports = router;