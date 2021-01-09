import Account from "../models/Account";
import User from "../models/User";
import PasswordException from '../exceptions/PasswordException';
import { Request, Response } from 'express';
import Role from "../models/Role";

export class AuthController {
    static register = async(req: Request, res: Response) => {
        
        let data: any = req.body;

        try{
            if (await Account.isExiste(data.email))
                throw new Error('409');

            let today: Date = new Date();
            let currentDate = today;
;
            const user = new User(null, data.firstname, data.lastname, data.sexe, data.date_naissance);
            await user.save();
            const password = await PasswordException.hashPassword(data.password);
            const account = new Account(user, data.email, password);
            await account.save();

            return res.status(201).json({
                error: false,
                message: "User have been succesfully created.",
                user: {
                    lastname: user.lastName,
                    firstname: user.firstName,
                    email: account.email,
                    sexe: user.gender,
                    dateNaissance: user.birthdate,
                    createdAt: user.creaDate,
                    updateAt: user.upDate,
                    subscription: user.subscription

                }
            });

        } catch (err){
            if (err.message == '409'){
                return res.status(409).json({error: true, message: "This mail adress is already reedemed by an account."}).end();
            }
        }
    }

    static login = async(req: Request, res: Response) => {
        
        let data: any = req.body;

        try{

            const isExist = await Account.isExiste(data.Email);

            if (!isExist)
                throw new Error('400');

            const account: any = await Account.select({ email: data.Email });
            const role: any = await Role.select({ idRole: account[0].idRole});

            return res.status(200).json({
                error: false,
                message: "User authentified with success.",
                user: {
                    firstname: account[0].firstname,
                    lastname: account[0].lastname,
                    email: account[0].email,
                    sexe: account[0].gender,
                    role: role[0].name,
                    dateNaissance: account[0].birthdate,
                    createdAt: account[0].createdAt,
                    updateAt: account[0].updatedAt,
                    subscription: account[0].subscription
                }
            });

        } catch (err){
            if (err.message == '400'){
                return res.status(400).json({error: true, message: "This mail adress is already reedemed by an account."}).end();
            }

        }
    }
}