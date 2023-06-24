import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/index.js';
import mongoose from './database/init-db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', api);

mongoose.connect;

app.listen(port, () => {
    console.log(`App server listening on port ${port}!`)
});
