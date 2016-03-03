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
                var claim:string = new Buffer(JSON.stringify({"name": name, "id": u._id, "email": email})).toString('base64');
                var signature:string = SHA256(header + "." + claim);
                var token:string = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    }

    public static changeUsername(token, newName: string, res) {
        UserApi.isTokenValid(token, (valid: boolean, decodedClaim) => {
            console.log("valid?: " + valid);
            if (valid) {
                UserApi.manager.changeUsernameByEmail(decodedClaim.email, newName, (u:User) => {
                    console.log("Did it work? : " + u);
                    if (u == null) res.send("nope");
                    else res.send(UserApi.generateTokenForUser(u));
                });
            } else {
                res.send("nope");
            }
        });
    }

    public static isTokenValid(token, callback: (isValid: boolean, decodedToken) => any) {
        if (token == null) {callback(false, null); return}
        var parts: string[] = token.split('.');
        if (parts.length != 3) {callback(false, null); return}
        var encHeader = parts[0];
        var encClaim = parts[1];
        var encSignature = parts[2];
        var isLegit = (SHA256(encHeader + "." + encClaim) == encSignature);
        console.log("isLegit?? : " + isLegit + ": " + JSON.stringify(new Buffer(encClaim, 'base64').toString('ascii')));
        callback(isLegit, isLegit ? JSON.parse(new Buffer(encClaim, 'base64').toString('ascii')) : null);
    }

    public static getUser(email: string, password: string, res) {
        UserApi.manager.getUserByEmail(email, (u:User) => {
            if (u == null || u._password != password) {
                res.send("nope");
            } else {
                res.send(UserApi.generateTokenForUser(u));
            }
        });
    }

    private static generateTokenForUser(u: User) {
        var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
        var claim: string = new Buffer(JSON.stringify({"name": u._name, "email": u._email, "id": u._id.toString()})).toString('base64');
        var signature: string = SHA256(header + "." + claim);
        return header + "." + claim + "." + signature;
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