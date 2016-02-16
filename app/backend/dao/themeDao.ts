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

import {MongoClient} from "mongodb";
import {Theme} from "../model/theme";
import {DaoConstants} from "./daoConstants";
import {MongoCallback} from "mongodb";
import {Db} from "mongodb";
export class ThemeDao {
    private client:MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    read(name:string):Theme {
        /**
         * werkt nog niet
         * */

        var theme:Theme = new Theme(1, "dicks", "");

        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            var a = db.collection('themes').find({'_name': name}).limit(1).next();
            console.log(a);
        });

        return theme;
    }

    create(t:Theme) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').insertOne(t);
        });
    }
}