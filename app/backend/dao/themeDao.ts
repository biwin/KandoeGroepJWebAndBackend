/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {DaoConstants} from "./daoConstants";
import {Theme} from "../model/theme";
import {Mongoose} from "mongoose";
import {Schema} from "mongoose";
import {Model} from "mongoose";
import {ITheme} from "../model/iTheme";
import {model} from "mongoose";

export class ThemeDao {
    private db:Mongoose;
    private themeScheme:Schema;
    private themeModel:Model<ITheme>;

    constructor() {
        this.db = new Mongoose().connect(DaoConstants.CONNECTION_URL);
        this.themeScheme = new Schema({
            id:Number,
            creatorId:Number,
            _name:String,
            description:String,
            tags:[]
        });
        this.themeModel = model<ITheme>('Theme', this.themeScheme);
    }

    /*read(name:string):Theme {
        this.themeModel.find({}).where('name').equals(name).exec((err:any, t:Theme) => {

        });
    }*/

   /* create(theme:Theme):void {
      //  this.themeModel.
    }*/
}