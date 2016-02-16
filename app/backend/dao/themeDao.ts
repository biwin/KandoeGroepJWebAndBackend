/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import {Mongoose} from "mongoose";
import {DaoConstants} from "./daoConstants";

export class ThemeDao {
    private db:Mongoose;

    constructor() {
        this.db = new Mongoose().connect(DaoConstants.CONNECTION_URL);
    }


}