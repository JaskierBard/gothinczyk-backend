import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {blueRouter} from "./routers/blue";
import {redRouter} from "./routers/red";
import {greenRouter} from "./routers/green";
import {yellowRouter} from "./routers/yellow";

import'./utils/db';
import { stepRouter } from './routers/steps';

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}));

app.use(express.json());

app.use('/steps', stepRouter);
app.use('/green', greenRouter);
app.use('/blue', blueRouter);
app.use('/red', redRouter);
app.use('/yellow', yellowRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Program działa na adresie http://localhost:3001');
})