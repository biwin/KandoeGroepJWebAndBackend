/*
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

    /!*read(name:string):Theme {
        this.themeModel.find({}).where('name').equals(name).exec((err:any, t:Theme) => {

        });
    }*!/

   /!* create(theme:Theme):void {
      //  this.themeModel.
    }*!/
}*/
/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var theme_1 = require("../model/theme");
var daoConstants_1 = require("./daoConstants");
var ThemeDao = (function () {
    function ThemeDao() {
        this.client = new mongodb_1.MongoClient();
    }
    ThemeDao.prototype.read = function (name) {
        /**
         * werkt nog niet
         * */
        var theme = new theme_1.Theme(1, "dicks", "");
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            var a = db.collection('themes').find({ '_name': name }).limit(1).next();
            console.log(a);
        });
        return theme;
    };
    ThemeDao.prototype.create = function (t) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').insertOne(t);
        });
    };
    return ThemeDao;
})();
exports.ThemeDao = ThemeDao;
//# sourceMappingURL=themeDao.js.map