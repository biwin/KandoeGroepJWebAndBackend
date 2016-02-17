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
var daoConstants_1 = require("./daoConstants");
var ThemeDao = (function () {
    function ThemeDao() {
        this.client = new mongodb_1.MongoClient();
    }
    ThemeDao.prototype.read = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('themes').find({ '_name': name }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    ThemeDao.prototype.create = function (t, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').insertOne(t).then(function () {
                db.close();
                callback();
            });
        });
    };
    return ThemeDao;
})();
exports.ThemeDao = ThemeDao;
//# sourceMappingURL=themeDao.js.map