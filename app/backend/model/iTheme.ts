/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Document} from "mongoose";
export interface ITheme extends Document {
    _id:number,
    creatorId:number,
    _name:string,
    description:string,
    tags:string[]
}