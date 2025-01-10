import express from 'express';
import userRouter from './user';
import artistRouter from './artist';
import authRouter from './auth';
import musicRouter from './music';

const app = express();

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/artist', artistRouter);
app.use('/artist/:artistId/songs', musicRouter);

export default app;