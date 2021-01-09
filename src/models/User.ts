export default class User{
    static select(arg0: { idUser: any; }): any {
        throw new Error("Method not implemented.");
    }
    static delete(arg0: { idUser: any; }) {
        throw new Error("Method not implemented.");
    }
    static update(arg0: { idUser: any; }) {
        throw new Error("Method not implemented.");
    }
    save() {
        throw new Error("Method not implemented.");
    }

    protected idUser ? : number | null;
    public lastName: string | null;
    public firstName: string | null;
    public gender: string | null;
    public birthDate: string | null;
    public creaDate: string | null;
    public upDate: string | null;
    public subscription: boolean | null;

    protected table: string = 'user';

    constructor(user: User | null, firstname: string = '', lastname: string = '', gender: string = '', birthDate: string = '', createdAt: string = '', updatedAt: string = '', subscripted: boolean = false){
        if (user === null){
  
            this.lastName = lastname;
            this.firstName = firstname;
            this.gender = gender;
            this.birthDate = birthDate;
            this.creaDate = createdAt;
            this.upDate = updatedAt;
            this.subscription = subscripted;
        } else {
            this.idUser = user.id;
            this.lastName = user.lastName;
            this.firstName = user.firstName;
            this.gender = user.gender;
            this.birthDate = user.birthDate;
            this.creaDate = user.creaDate;
            this.upDate = user.upDate;
            this.subscription = user.subscription;
        }
    }

    get id(): number{
        return <number>this.idUser;
    }

    get name(): string{
        return <string>this.lastName;
    }

    get firstname(): string{
        return <string>this.firstName;
    }

    get genre(): string{
        return <string>this.gender;
    }

    get birthdate(): string{
        return <string>this.birthDate;
    }

    get creationAt(): string{
        return <string>this.creaDate;
    }

    get updatedAt(): string{
        return <string>this.upDate;
    }

    get subscripted(): boolean{
        return <boolean>this.subscription;
    }

    get attributInsert(): Array <string> {
        return [ 'lastname', 'firstname', 'gender', 'birthDate', 'createdAt', 'updatedAt', 'subscripted']
    }
}