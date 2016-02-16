import {User} from "../model/user";
let userdao = require('../dao/udo');

export class UserManager {

    //private _userDao: UserDao;

    constructor() {
      //  this._userDao = new UserDao();
    }

    registerUser(id: string,email: string,password: string): User {
        return userdao.create(id, email, password);
    }
}