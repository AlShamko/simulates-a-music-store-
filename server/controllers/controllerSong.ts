import type {Request, Response} from 'express';
import {generateSongs, getLikesCount} from '../utils/generator.js';
import {type Song} from '../types/song.js';

export const getSongs = (req: Request, res: Response) => {
    const seed = parseInt(req.query.seed as string) || 0;
    const page = parseInt(req.query.page as string) || 1;
    const locale = (req.query.locale as string) || 'en';
    const avgLikes = parseFloat(req.query.likes as string) || 0;

    const baseSongs = generateSongs(seed, page, locale);

    const songsWithLikes: Song[] = baseSongs.map((song) => {
        const songSpecificSeed = seed + page + song.id;
        return {
            ...song,
            likes: getLikesCount(avgLikes, songSpecificSeed)
        };
    });

    res.json(songsWithLikes);
};