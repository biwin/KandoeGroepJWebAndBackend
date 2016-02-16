import {Schema} from "mongoose";
import {model} from "mongoose";
import {IUserModel} from "./iUserModel";

var userSchema = new Schema({ email: String, password: String, displayName: String });
var User = model<IUserModel>("User", userSchema);
export = User;