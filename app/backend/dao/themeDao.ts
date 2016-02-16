/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {DaoConstants} from "./daoConstants";
import {Theme} from "../model/theme";
import {Mongoose} from "mongoose";
import {Schema} from "mongoose";
import {Model} from "mongoose";
import {ITheme} from "../model/iTheme";
import {model} from "mongoose";
import {keyValDiff} from "angular2/src/core/change_detection/change_detection";

export class ThemeDao {
    private _db:Mongoose;
    private _themeScheme:Schema;
    private _themeModel:Model<ITheme>;

    constructor() {
        this._db = new Mongoose().connect(DaoConstants.CONNECTION_URL);
        this._themeScheme = new Schema({
            _id:Number,
            _creatorId:Number,
            _name:String,
            _description:String,
            _tags:[]
        });
        this._themeModel = model<ITheme>('Theme', this._themeScheme);
    }

    read(name:string):Theme {
        var theme:Theme;
        this._themeModel.find({}).where('name').equals(name).exec((err:any, t:Theme) => {
            theme = t;
        });
        return theme;
    }

    create(theme:Theme):void {


    }
}