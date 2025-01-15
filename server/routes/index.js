const express = require('express');
const userRouter = require("./user.js");
const artistRouter = require('./artist.js');
const authRouter = require('./auth.js');
const musicRouter = require('./music.js');

const app = express();

app.use('/auth',  authRouter);
app.use('/user', userRouter);
app.use('/artist', artistRouter);
app.use('/songs', musicRouter);

module.exports = app;