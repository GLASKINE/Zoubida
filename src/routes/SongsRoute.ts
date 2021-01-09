import { Router } from 'express';
import { SongController } from '../controllers/SongsController';
import { getSongsMidd, getSongByIdMidd } from '../middlewares/songs.middleware';

const route: Router = Router();

route.get('/', getSongsMidd, SongController.getSongs);
route.get('/:id', getSongByIdMidd, SongController.getSongById);

export { route as SongRoute }