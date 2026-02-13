import { createCanvas } from 'canvas';
import type {Request, Response} from 'express';

export const getCover = (req: Request, res: Response) => {
    const title = (req.query.title as string) || 'Unknown Title';
    const artist = (req.query.artist as string) || 'Unknown Artist';
    const seed = parseInt(req.query.seed as string) || 0;

    const size = 400;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    const hue = seed % 360;
    ctx.fillStyle = `hsl(${hue}, 60%, 40%)`;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 20;
    ctx.strokeRect(50, 50, 300, 300);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(title, size / 2, size / 2 - 20);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(artist, size / 2, size / 2 + 20);

    res.setHeader('Content-Type', 'image/png');
    canvas.createPNGStream().pipe(res);
};