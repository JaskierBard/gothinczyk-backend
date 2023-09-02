import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import'./utils/db';
import {playerRouter} from "./routers/player";
import { barsStats } from './routers/barsStats';


const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:3000',
    

}));


app.use('/player', playerRouter);
app.use('/bars', barsStats);



app.listen(3001, '0.0.0.0', () => {
    console.log('Program działa na adresie http://localhost:3001');
})