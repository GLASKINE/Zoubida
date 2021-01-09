import DateException from "../exceptions/DateException";
import { Request, Response } from 'express';
import EmailException from "../exceptions/EmailException";
import PasswordException from "../exceptions/PasswordException";
import Account from "../models/Account";
import User from "../models/User";
import Child from "../models/Child";

export const updateMidd = async(req: Request, res: Response, next: () => void) => {

    let data: any = req.body;
    const dateNaiss = data.date_naissance;
    const optionalFields = ['firstname', 'lastname', 'date_naissance', 'sexe']

    try
    {
        let update: boolean = false;

        for (const field in data){
            for (const optional in optionalFields){
                if (field === optionalFields[optional]){  
                    update = true;                       
                    if (!data[field]) throw new Error('409');
                }
            }
        }

        if (!update)
            throw new Error('409');

        if (dateNaiss !== undefined){
            if (!DateException.checkDate(dateNaiss))
                throw new Error('409');
        }

    }
    catch (err){
        if (err.message == '409')
            return res.status(409).json({error: true, message: "Some datas are missing."}).end();
        else
            return res.status(401).json({error: true, message: "Some datas are false."}).end();
    }
}

export const signOutMidd = async(req: Request, res: Response, next: () => void) => {   
}

export const addChildMidd = async(req: Request, res: Response, next: () => void) => {

    let data: any = req.body;
    const requiredFields = ['firstname', 'lastname', 'sexe', 'date_naissance', 'email', 'password'];

    try{

        if (User[0].idRole == 2)
            throw new Error('403');

        let error: boolean = true;

        for (const required in requiredFields){
            error = true;

            for (const field in data){
                if(field === requiredFields[required])
                    error = false;
            }

            if (error)
                throw new Error('400');
        }

        if (!EmailException.checkEmail(data.email))
            throw new Error('notRight');
    
        if (!PasswordException.isValidPassword(data.password))
            throw new Error('notRight');

        if (!DateException.checkDate(data.date_naissance))
            throw new Error('notRight');

        const isEmailInUse = await Account.isExiste(data.email);

        if (isEmailInUse)
            throw new Error('emailInUse');

        const childCount: any = await Child.select({ tutor_id: User});
        if (childCount.length == 3)
            throw new Error('quotaReached');

        next();

    } catch(err) {
        if (err.message == '400'){
            return res.status(400).json({error: true, message: "Some datas are missing."}).end();
        }

        if (err.message == 'notRight'){
            return res.status(409).json({error: true, message: "Some datas are false."}).end();
        }

        if (err.message == 'emailInUse'){
            return res.status(409).json({error: true, message: "An account already use this mail adress."}).end();
        }

        if (err.message == 'quotaReached'){
            return res.status(409).json({error: true, message: "You reach your children allowance of : '3'"}).end();
        }

        return res.status(403).json({error: true, message: "You do not have acces to this content."}).end();
    }
}

export const deleteChildMidd = async(req: Request, res: Response, next: () => void) => {
    let data: any = req.body;

    try{
      
        if (User[0].idRole == 2)
            throw new Error('forbidden');
            
        const childId = data.id_child;

        if (!childId)
            throw new Error('wrongId');
        
        const child: any = await Child.select({ child_id: childId});
        if (child.length == 0)
            throw new Error('wrongId');
        
        next();

    } catch (err){
        if (err.message == 'forbidden'){
            return res.status(403).json({error: true, message: "Acces is not allowed."}).end();
        }

        if (err.message == 'wrongId'){
            return res.status(403).json({error: true, message: "You can delete this 'child'"}).end();
        }
    }
}

export const getChildMidd = async(req: Request, res: Response, next: () => void) => {

    try{

        if (User[0].idRole == 2)
            throw new Error('403');

        next();

    } catch (err) {
        return res.status(403).json({error: true, message: "You do not have acces to this content."}).end();
    }
}

export const removeUserMidd = async(req: Request, res: Response, next: () => void) => {
}