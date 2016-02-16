import mongoose = require("mongoose");
import IUser = require("./iUser");

export interface IUserModel extends IUser, mongoose.Document { }