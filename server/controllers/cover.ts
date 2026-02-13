import canvas from 'canvas';
import type { Request, Response } from 'express';

const { createCanvas } = canvas;

export const getCover = (req: Request, res: Response) => {
    const title = (req.query.title as string) || 'Unknown Title';
    const artist = (req.query.artist as string) || 'Unknown Artist';
    const seed = parseInt(req.query.seed as string) || 0;

    const size = 400;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    const random = () => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const hue1 = seed % 360;
    const hue2 = (seed + 60) % 360;
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, `hsl(${hue1}, 70%, 30%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 80%, 15%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    ctx.globalAlpha = 0.2;
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        const shapeType = (seed + i) % 3;
        if (shapeType === 0) { // Круги
            ctx.arc(random() * size, random() * size, random() * 150, 0, Math.PI * 2);
        } else {
            ctx.moveTo(random() * size, random() * size);
            ctx.lineTo(random() * size, random() * size);
            ctx.lineTo(random() * size, random() * size);
        }
        ctx.fill();
    }

    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, size * 0.7, size, size * 0.3);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    ctx.font = 'bold 24px Arial';
    ctx.fillText(title.toUpperCase(), 20, size * 0.82);

    ctx.font = 'bold 24px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText(title, 20, size * 0.82);

    ctx.font = '18px "Microsoft YaHei", sans-serif';
    ctx.fillText(artist, 20, size * 0.9);

    ctx.font = '18px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(artist, 20, size * 0.9);

    res.setHeader('Content-Type', 'image/png');
    canvas.createPNGStream().pipe(res);
};
