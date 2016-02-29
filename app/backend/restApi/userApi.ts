import {UserManager} from "../logic/userManager";
import {User} from "../model/user";
var SHA256 = require("crypto-js/sha256");

export class UserApi {

    private static manager: UserManager = new UserManager();

    public static createUser(name: string, email: string, password: string, res) {
        console.log("omg");
       UserApi.manager.registerUser(new User(name, "", password), (u: User) => {
           console.log("registered user: " + name + ": " + password);
            var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
            var claim: string = new Buffer(JSON.stringify({"name": name, "id": u._id})).toString('base64');
            var signature: string = SHA256(header + "." + claim);
            var token: string = header + "." + claim + "." + signature;
            console.log("Registered: " + token);
            res.send(token);
        });
    }

    public static getUser(username: string, password: string, res) {
        console.log("omg2");
        UserApi.manager.getUser(username, (u: User) => {
            if (u._password == password) {
                console.log(u);
                console.log("id: " + u._id);
                var header: string = new Buffer(JSON.stringify({"typ": "JWT", "alg": "HS256"})).toString('base64');
                var claim: string = new Buffer(JSON.stringify({"name": username, "id": u._id.toString()})).toString('base64');
                var signature: string = SHA256(header + "." + claim);
                var token: string = header + "." + claim + "." + signature;
                console.log("Logged in: " + token);
                res.send(token);
            } else {
                console.log("nope");
                res.send("nope");
            }
        });
    }
}