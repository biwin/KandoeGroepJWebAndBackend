import {UserManager} from "../logic/userManager";
import {User} from "../model/user";
var SHA256 = require("crypto-js/sha256");

export class UserApi {

    private static manager:UserManager = new UserManager();

    public static createUser(name:string, email:string, password:string, registrar:string, res) {
        UserApi.manager.registerUser(new User(name, email, password, registrar), (u:User) => {
            if (u == null) {
                res.send("nope");
            } else {
                var header:string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                var claim:string = new Buffer(JSON.stringify({"name": name, "id": u._id})).toString('base64');
                var signature:string = SHA256(header + "." + claim);
                var token:string = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    }

    public static getUser(username:string, password:string, res) {
        UserApi.manager.getUser(username, (u:User) => {
            if (u == null || u._password != password) {
                res.send("nope");
            } else {
                var header:string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                var claim:string = new Buffer(JSON.stringify({
                    "name": username,
                    "id": u._id.toString()
                })).toString('base64');
                var signature:string = SHA256(header + "." + claim);
                var token:string = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    }

    public static getFacebookUser(id:number, name:string, registrar:string, res) {
        UserApi.manager.facebookUserExists(id, (exists:boolean) => {
            if (exists) {
                console.log("exists: " + name + ": " + id);
                UserApi.manager.getFacebookUser(id, (u:User) => {
                    if (u == null) {
                        res.send("nope");
                    } else {
                        var header:string = new Buffer(JSON.stringify({
                            "typ": "JWT",
                            "alg": "HS256"
                        })).toString('base64');
                        var claim:string = new Buffer(JSON.stringify({
                            "name": name,
                            "id": u._id.toString()
                        })).toString('base64');
                        var signature:string = SHA256(header + "." + claim);
                        var token:string = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            } else {
                console.log("!exists: " + name + ": " + id);
                var user:User = new User(name, "", "", registrar);
                user._facebookId = id;
                UserApi.manager.registerUser(user, (u:User) => {
                    if (u == null) {
                        res.send("nope");
                    } else {
                        var header:string = new Buffer(JSON.stringify({
                            "typ": "JWT",
                            "alg": "HS256"
                        })).toString('base64');
                        var claim:string = new Buffer(JSON.stringify({"name": name, "id": u._id})).toString('base64');
                        var signature:string = SHA256(header + "." + claim);
                        var token:string = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            }
        });
    }
}