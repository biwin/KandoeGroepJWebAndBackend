/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Mongoose, Model, Schema, model} from "mongoose";
import {DaoConstants} from "./daoConstants";
import {IUser} from "../model/iUser";
import {User} from "../model/user";

export class UserDao {
    private _userSchema:Schema;
    private _userModel:Model<IUser>;
    private _db:Mongoose;

    constructor() {
        console.log("JASPER");
        this._db = new Mongoose().connect(DaoConstants.CONNECTION_URL);
        this._userSchema = new Schema({
            _id: String,
            _email: String,
            _password: String
        }, {versionKey: false});
        this._userModel = model<IUser>('User', this._userSchema);
    }

    create(id:string, email:string, password:string): User {
        var user = new this._userModel({_id: id, _email: email, _password: password});
        console.log("jasper??");
        user.save((createdUser) => {
            console.log("hello");
            console.log(createdUser);
        });
        return null;
    }
}