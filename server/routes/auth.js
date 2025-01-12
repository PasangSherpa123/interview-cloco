
const express = require('express');

const {register} = require('../controllers/auth.js');
const router = express.Router();

router.post('/register', register);
// router.post('/login', );

module.exports=  router;