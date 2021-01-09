import { Router } from 'express';
import { UserController } from '../controllers/UsersController';
import { updateMidd, signOutMidd, addChildMidd, deleteChildMidd, getChildMidd, removeUserMidd } from '../middlewares/users.middleware';

const route: Router = Router();

route.put('/', updateMidd, UserController.update);
route.delete('/off', signOutMidd, UserController.signOut);
route.post('/child', addChildMidd, UserController.addChild);
route.delete('/child', deleteChildMidd, UserController.removeChild);
route.get('/child', getChildMidd, UserController.getChild);
route.delete('/', removeUserMidd, UserController.removeUser);

export { route as UserRoute }