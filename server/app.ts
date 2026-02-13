import express from 'express';
import cors from 'cors';
import { getSongs } from './controllers/song.js';
import config from './config/config.js';
import { getCover } from './controllers/cover.js';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/cover', getCover);
app.get('/api/songs', getSongs);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});