/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Document} from "mongoose";

export interface IUser extends Document {
    _id:string;
    _email:string;
    _password:string;

}