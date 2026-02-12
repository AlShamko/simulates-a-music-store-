import express from 'express';
import cors from 'cors';
import { getSongs } from './controllers/controllerSong.js';
import config from './config/config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/songs', getSongs);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});