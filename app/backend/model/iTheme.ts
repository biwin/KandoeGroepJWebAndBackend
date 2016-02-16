/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Document} from "mongoose";
export interface ITheme extends Document {
    _id:number,
    _creatorId:number,
    _name:string,
    _description:string,
    _tags:string[]
}