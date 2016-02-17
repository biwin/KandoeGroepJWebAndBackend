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
import {CursorResult} from "mongodb";

export class ThemeDao {
    private client:MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    read(name:string, callback:(t:Theme) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db:Db) => {
            return db.collection('themes').find({'_name': name}).limit(1).next();
        }).then((cursor:CursorResult) => {
            callback(cursor);
        });
    }

    create(t:Theme, callback?:()=>any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').insertOne(t).then(() => {
                db.close();
                callback();
            });
        });
    }
}