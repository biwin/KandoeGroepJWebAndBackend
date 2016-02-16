import {User} from "../model/user";
import {UserDao} from "../dao/userDao";

export class UserManager {

    private _userDao: UserDao;

    constructor() {
        this._userDao = new UserDao();
    }

    registerUser(id: string,email: string,password: string): User {
        return this._userDao.create(id,email,password);
    }
}