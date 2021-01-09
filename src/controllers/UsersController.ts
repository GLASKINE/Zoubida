import Account from "../models/Account";
import User from "../models/User";
import { Request, Response } from 'express';
import PasswordException from "../exceptions/PasswordException";
import Child from "../models/Child";
import Role from "../models/Role";

export class UserController {

    static update = async(req: Request, res: Response) => {

        let data: any = req.body;
        const userId = LINK TO DO WITH user/iduser;
    
        try{
    
            if (data.firstname){
                User.update({ firstname: data.firstname}, { idUser: userId });
                const updated = true;
            }
    
            if (data.lastname){
                User.update({ lastname: data.lastname}, { idUser: userId });
                updated = true;
            }
    
            if (data.date_naissance){
                User.update({ birthdate: data.date_naissance}, { idUser: userId });
                updated = true;
            }
    
            if (data.sexe){
                User.update({ gender: data.sexe}, { idUser: userId });
                updated = true;
            }
    
            if (updated)
                User.update({ updatedAt: = new Date(today)}, {idUser: userId});
    
            return res.status(200).json({error: false, message: "Your infos have been updated."});
    
        } catch (err){
            console.log(err);
        }
    }

    static signOut = async(req: Request, res: Response) => {
            return res.status(200).json({error: false, message: "Logged out."});
    }

    static addChild = async(req: Request, res: Response) => {

        let data: any = req.body;

        try{ 
            const tutor: any = User.select({ idUser: userId});
            const subscription: number = tutor[0].subscription;

            let today: Date = new Date();
            let currentDate = today;

            const user = new User(null, data.firstname, data.lastname, data.sexe, data.date_naissance, currentDate, currentDate, subscription);
            await user.save();
            const password = await PasswordException.hashPassword(data.password);
            const account = new Account(user, data.email, password);
            await account.save();
            const child = new Child(user, userId);
            await child.save();

            const role: any = await Role.select({ idRole: user.idRole});

            return res.status(201).json({
                error: false,
                message: "Child have been succesfully created.",
                user: {
                    firstname: user.firstName,
                    lastname: user.lastName,
                    sexe: user.gender,
                    role: role[0].name,
                    dateNaissance: user.birthDate,
                    createdAt: user.creaDate,
                    updateAt: user.upDate,
                    subscription: user.subscripted
                }
            });

        } catch (err){
            return res.status(403).json({error: true, message: "You do not have acces to this content."}).end();
        }
    }

    static removeChild = async(req: Request, res: Response) => {

        let data: any = req.body;

        try{
            const isRemoved: boolean = await User.delete({ idUser: data.id_child});

            if (!isRemoved)
                throw new Error('403');

            return res.status(201).json({ error: false, message: "User succesfully deleted." });

        } catch(err) {
            return res.status(403).json({error: true, message: "You cannot delete this subaccount."}).end();
        }
    }

    static getChild = async(req: Request, res: Response) => { 

        let token: any = req.headers.authorization;

        try{
            const child: any = await Child.select({ tutor_id: userId });

            if (child.length == 0)
                throw new Error('400');

            let i: number;
            let userData: Array<any> = [];

            for (i = 0; i < child.length; i++){
                const role: any = await Role.select({ idRole: child[i].idRole});
                const user: any = {
                    firstname: child[i].firstname,
                    lastname: child[i].lastname,
                    sexe: child[i].gender,
                    role: role[0].name,
                    dateNaissance: child[i].birthdate,
                    createdAt: child[i].createdAt,
                    updateAd: child[i].updatedAt,
                    subscription: child[i].subscription
                }
                userData.push(user);
            }

            return res.status(200).json({
                error: false,
                users: userData
            });

        } catch (err) {
            return res.status(400).json({error: true, message: "Some datas are missing."}).end();
        }
    }

    static removeUser = async(req: Request, res: Response) => {

        
        let i: number;

        try{
            const childCount: any = await Child.select({ tutor_id: userId});

            if (childCount.length > 0){
                for (i = 0; i < childCount.length; i++){
                    await User.delete({ idUser: childCount[i].child_id});
                }
            }

            User.delete({ idUser: User });

            return res.status(200).json({ error: false, message: "Your account have been succesfully created." });

        } catch (err){
            console.log(err);
        }
    }   
}

