const express = require('express');
const { createArtist, getAllArtists } = require('../controllers/artist');
const router = express.Router();


router.post('/create', createArtist);
router.get('/', getAllArtists);


module.exports=  router;