const express = require("express");
const router = express.Router();
const testingEmail = require('../controller/auth.controller')
const postdata= require('../controller/crimedetail.controller');
const type = require('../controller/type.controller');
const comment = require('../controller/comment.controller');
const missing = require('../controller/missing.controller');

router.post('/signup',testingEmail.nodeMailer);

router.post('/login',testingEmail.login);
router.get('/alluser',testingEmail.alluser);
router.get('/allcrime',postdata.getPostDetails);


router.put('/suspend/:uid',testingEmail.suspend);
router.put('/updateprofile/:uid',testingEmail.updatepro);
router.put('/updateprofileadmin/:uid',testingEmail.adminupdatepro)

router.post('/crimedetails',postdata.postDetails);

router.post('/crime-type', type.type);

router.post('/post-comment',comment.postComment);
router.post('/approve',missing.approve);
router.post('/missing-people',missing.missingperson);
router.get('/getmissingpeople', missing.getmissing)
module.exports = router;