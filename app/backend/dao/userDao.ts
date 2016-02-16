/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Mongoose, Model, Schema, model} from "mongoose";
import {DaoConstants} from "./daoConstants";
import User = require("../model/User");

export class UserDao {
    private _db:Mongoose;

    constructor() {
        this._db = new Mongoose().connect(DaoConstants.CONNECTION_URL);
    }

    create(id:string, email:string, password:string): Object {
        var user = new User({name: id, email: email, password: password});
        user.save();
        return null;
    }
}