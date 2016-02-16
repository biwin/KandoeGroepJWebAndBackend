import {UserDao} from "../dao/userDao";
import {User} from "../model/user";
/**
 * Created by Jan on 16/02/2016.
 */

export class UserManager {

    private _userDao:UserDao;

    constructor() {
        this._userDao = new UserDao();
    }

    registerUser(id: string,email: string,password: string): User{
        return this._userDao.create(id,email,password);


    }
}