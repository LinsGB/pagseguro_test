import express from "express";
import routes from "./routes";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

//Allows us to receive requests with data in x-www-form-urlencoded format
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(routes);


app.listen(3333, () => console.log("API PAGSEGURO UTILS STARTED"));
dotenv.config();
