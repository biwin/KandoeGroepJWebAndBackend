/**
 * Created by Jan on 16/02/2016.
 */
export class User {

    private _id:string;
    private _email:string;
    private _password:string;

    constructor (id:string,email:string,password:string) {
        this._id = id;
        this._email = email;
        this._password = password;
    }


    get id():string {
        return this._id;
    }

    set id(value:string) {
        this._id = value;
    }

    get email():string {
        return this._email;
    }

    set email(value:string) {
        this._email = value;
    }

    get password():string {
        return this._password;
    }

    set password(value:string) {
        this._password = value;
    }
}
