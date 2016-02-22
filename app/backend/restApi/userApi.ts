import {UserManager} from "../logic/userManager";
import {User} from "../model/user";

export class UserApi {

    public static createUser(name: string, email: string, password: string, role: string, res) {
        return new UserManager().registerUser(new User(name, email, password, role), (user: User) => {
            res.send(user);
        });
    }

    public static createDummyUser(res) {
        return new UserManager().registerUser(new User("Kattoor44", "jasper.catthoor@student.kdg.be", "sup", "admin"), (user: User) => {
            res.send(user);
        });
    }

    public static getUser(id: string, res) {
        return new UserManager().getUserById(id, (user: User) => {
            res.send(user);
        });
    }
}