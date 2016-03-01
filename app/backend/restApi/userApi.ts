import {UserManager} from "../logic/userManager";
import {User} from "../model/user";
var SHA256 = require("crypto-js/sha256");

export class UserApi {

    private static manager: UserManager = new UserManager();

    public static createUser(name: string, email: string, password: string, res) {
        UserApi.manager.registerUser(new User(name, "", password), (u: User) => {
            if (u == null) {
                res.send("nope");
            } else {
                var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                var claim: string = new Buffer(JSON.stringify({"name": name, "id": u._id})).toString('base64');
                var signature: string = SHA256(header + "." + claim);
                var token: string = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    }

    public static getUser(username: string, password: string, res) {
        UserApi.manager.getUser(username, (u: User) => {
            if (u == null) {
                res.send("nope");
            } else if (u._password == password) {
                var header:string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                var claim:string = new Buffer(JSON.stringify({"name": username, "id": u._id.toString()})).toString('base64');
                var signature:string = SHA256(header + "." + claim);
                var token:string = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    }
}