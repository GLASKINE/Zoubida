import { Request, Response } from 'express';
import Song from '../models/Song';
import User from '../models/User';

export const getSongsMidd = async(req: Request, res: Response, next: () => void) => {

    try{

        if (User[0].subscription == 0)
            throw new Error('403');

        next();

    } catch (err) {
        if (err.message == '403'){
            return res.status(403).json({error: true, message: "Your subscription does not support this song."}).end();
        }
    }
}

export const getSongByIdMidd = async(req: Request, res: Response, next: () => void) => {

    const songId: any = req.params.id

    try{

        if (User[0].subscription == 0)
            throw new Error('403');

        const song: any = await Song.select({ idSong: songId});
        if (song.length == 0)
            throw new Error('409');

        next();

    } catch (err) {
        if (err.message == '409'){
            return res.status(409).json({error: true, message: "Audio is blocked."}).end();
        }

        return res.status(403).json({error: true, message: "Your subscription does not support this song."}).end();
    }
}