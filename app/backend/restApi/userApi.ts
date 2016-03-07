import {UserManager} from "../logic/userManager";
import {User} from "../model/user";
import {GroupAPI} from "./groupAPI";
import {CircleSessionApi} from "./circleSessionApi";
var SHA256 = require("crypto-js/sha256");

export class UserApi {

    private static manager: UserManager = new UserManager();

    public static createUser(name:string, email:string, password:string, registrar:string, res) {
        UserApi.manager.registerUser(new User(name, email, password, registrar), (u: User) => {
            if (u == null) {
                res.send("nope");
            } else {
                var header:string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                var claim:string = new Buffer(JSON.stringify({"type": "web", "name": name, "id": u._id, "email": email})).toString('base64');
                var signature:string = SHA256(header + "." + claim);
                var token:string = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    }

    public static getPicture(token, type: string, res) {
        UserApi.isTokenValid(token, (valid: boolean, decodedClaim) => {
            if (valid) UserApi.manager.getUserById(decodedClaim.id, (u: User) => res.send(type == 'small' ? u._pictureSmall : u._pictureLarge));
            else res.send("nope");
        });
    }

    public static changeProfile(token, newName: string, newSmallPicture: string, newLargePicture: string, res) {
        UserApi.isTokenValid(token, (valid: boolean, decodedClaim) => {
            if (valid) {
                if (decodedClaim.type == 'facebook') {
                    UserApi.manager.changeProfileByFacebookId(decodedClaim.facebookId, newName, newSmallPicture, newLargePicture, (u: User) => {
                        if (u == null) res.send("nope");
                        else res.send(UserApi.generateTokenForUser(u, "facebook", u._facebookId));
                    });
                } else {
                    UserApi.manager.changeProfileByEmail(decodedClaim.email, newName, newSmallPicture, newLargePicture, (u: User) => {
                        if (u == null) res.send("nope");
                        else res.send(UserApi.generateTokenForUser(u, "web"));
                    });
                }
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
        callback(isLegit, isLegit ? JSON.parse(new Buffer(encClaim, 'base64').toString('ascii')) : null);
    }

    public static getUser(email: string, password: string, res) {
        UserApi.manager.getUserByEmail(email, (u:User) => {
            if (u == null || u._password != password) {
                res.send("nope");
            } else {
                res.send(UserApi.generateTokenForUser(u, "web"));
            }
        });
    }

    private static generateTokenForUser(u: User, type: string, facebookId?: string) {
        var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
        var claimObject: any = {"type": type, "name": u._name, "email": u._email, "id": u._id.toString()};
        if (facebookId) claimObject.facebookId = facebookId;
        var claim: string = new Buffer(JSON.stringify(claimObject)).toString('base64');
        var signature: string = SHA256(header + "." + claim);
        return header + "." + claim + "." + signature;
    }

    public static getFacebookUser(facebookId: number, email: string, pictureSmall: string, pictureLarge: string, name: string, registrar: string, res) {
        UserApi.manager.facebookUserExists(facebookId, (exists: boolean) => {
            if (exists) {
                UserApi.manager.getFacebookUser(facebookId, (u: User) => {
                    if (u == null) {
                        res.send("nope");
                    } else {
                        var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                        var claim: string = new Buffer(JSON.stringify({"facebookId": facebookId, "type": "facebook", "name": u._name, "id": u._id.toString()})).toString('base64');
                        var signature: string = SHA256(header + "." + claim);
                        var token: string = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            } else {
                var user: User = new User(name, email, "", registrar);
                user._facebookId = facebookId;
                user._pictureSmall = pictureSmall;
                user._pictureLarge = pictureLarge;
                UserApi.manager.registerUser(user, (u: User) => {
                    if (u == null) {
                        res.send("nope");
                    } else {
                        var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                        var claim: string = new Buffer(JSON.stringify({"facebookId": facebookId, "type": "facebook", "name": name, "id": u._id})).toString('base64');
                        var signature: string = SHA256(header + "." + claim);
                        var token: string = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            }
        });
    }

    public static getGroups(userId:string, res){
        GroupAPI.getGroupsOfUserById(userId, res);
    }

    public static getCircleSessions(userId:string, res){
        CircleSessionApi.getCircleSessionsOfUserById(userId, res);
    }

    public static getUsers(userIds:string[], res) {
        UserApi.manager.getUsers(userIds, (us:User[]) => {
            res.send(us);
        })
    }
}