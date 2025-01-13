const express = require('express');
const { createArtist } = require('../controllers/artist');
const router = express.Router();


router.post('/create', createArtist);



module.exports=  router;