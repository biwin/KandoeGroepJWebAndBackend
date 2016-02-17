import {UserDao} from "../dao/userDao";
import {User} from "../model/user";

export class UserManager {

    private _dao: UserDao;

    constructor() {
        this._dao = new UserDao();
    }

    registerUser(user: User, callback: (u: User) => any) {
        this.userNameTaken(user._name, (taken) => {
            console.log(taken);
            if (!taken) {
                this._dao.create(user, () => {
                    this.getUser(user._name, callback);
                });
            } else {
                callback(null);
            }
        });
    }

    getUser(name: string, callback: (u: User) => any) {
        this._dao.read(name, callback);
    }

    userNameTaken(name: string, callback: (b: boolean) => any) {
        this._dao.read(name, (u: User) => {
            console.log("User [" + name + "] taken: " + (u != null));
           callback(u != null);
        });
    }
}