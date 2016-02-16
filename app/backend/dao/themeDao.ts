/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Mongoose} from "mongoose";
import {DaoConstants} from "./daoConstants";
import {Theme} from "../model/theme";

export class ThemeDao {
    private db:Mongoose;

    constructor() {
        this.db = new Mongoose().connect(DaoConstants.CONNECTION_URL);
    }

    read(number:Number):Theme {
        return null;
    }

    create(theme:Theme):void {

    }
}