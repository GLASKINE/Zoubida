import User from "./User";
import MySQL, { jointureInterface } from "../db/MySQL";

export default class Account extends User {
    save() {
        throw new Error("Method not implemented.");
    }
    email: string;
    password: string = '';
    user_idUser: number | null | undefined;
    attempts: number;
    blockedAttemptsDate: Date;

    protected table: string = 'account';

    constructor(id: User, email: string = '', password: string = ''){

        super(id); 

        this.email = email;
        this.password = password;
        this.user_idUser = this.id;
    }

    get attributInsert(): Array <string> {
        return ['email', 'password', 'idUser']
    }

    static isExiste(email: string) {
        return new Promise((resolve, reject) => {
            MySQL.select('account', {email: email}).then((arrayClient: Array <any> ) => {
                resolve((arrayClient.length > 0));
            })
            .catch((err: any) => {
                console.log(err);
                reject(false);
            });
        })
    }

    static select(where: any) {
        return new Promise((resolve, reject) => {
            const join: Array <jointureInterface> = [{
                type: 'LEFT',
                table: 'user',
                where: {
                    table: 'account',
                    foreignKey: 'idUser'
                }
            }, {
                type: 'LEFT',
                table: 'role',
                where: {
                    table: 'user',
                    foreignKey: 'idRole'
                }
            }]

            MySQL.selectJoin('account', join, where).then((arrayAccount: Array <any>) => {
                let newUser: User;
                let data: Array <User> = [];

                for (const user of arrayAccount) {
                    user.birthdate = user.birthdate;
                    user.createdAt = user.createdAt;
                    user.updatedAt = user.updatedAt;
                    user.id = user.idUser;
                    newUser = new User(user);
                    data.push(new Account(newUser, user.email, user.password));
                }
                
                console.log(data);
                resolve(data);
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }

    static update(update: any, where: any) {
        return new Promise((resolve, reject) => {
            MySQL.update('account', update, where).then(() => {
                console.log("Updated successfully!");
                resolve(true);
            })
            .catch((err: any) => {
                console.log(err);
                reject(false);
            });
        });
    }
}