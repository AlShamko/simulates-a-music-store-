import express from 'express';
import cors from 'cors';
import { getSongs } from './controllers/song.js';
import config from './config/config.js';
import { getCover } from './controllers/cover.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/api/cover', getCover);
app.get('/api/songs', getSongs);

const PORT = Number(process.env.PORT) || Number(config.port) || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});