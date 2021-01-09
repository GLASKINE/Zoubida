import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { registerMidd, loginMidd } from '../middlewares/auth.middleware';
import { Request, Response } from 'express';

const route: Router = Router();
const path = require('path');

route.get('/', (req: Request, res: Response) => {
    const indexPath = path.resolve("./index.html");
    res.sendFile(indexPath);
    return res.end('<h1>Congrats, you are logged.</h1>')
})

route.post('/register', registerMidd, AuthController.register);
route.post('/login', loginMidd, AuthController.login);
//route.post('/update', updateMidd, AuthController.update)
//route.post('/delete', deleteMidd, AuthController.delete)

export { route as AuthentificationRoute }