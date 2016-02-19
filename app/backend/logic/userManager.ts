import {UserDao} from "../dao/userDao";
import {User} from "../model/user";
import {Organisation} from "../model/organisation";

export class UserManager {

    private _dao: UserDao;

    constructor() {
        this._dao = new UserDao();
    }

    clearDatabase(callback: () => any) {
        this._dao.clearDatabase(callback);
    }

    registerUser(user: User, callback: (u: User) => any) {
        this.userExists(user._name, (taken) => {
            if (!taken) {
                this._dao.createUser(user, () => {
                    this.getUser(user._name, callback);
                });
            } else {
                callback(null);
            }
        });
    }

    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    deleteUser(name: string, callback: (b: boolean) => any) {
        this.userExists(name, (exists: boolean) => {
            if (!exists) {
                callback(false);
            } else {
                this._dao.deleteUser(name, () => {
                    this.getUser(name, (u: User) => {
                        callback(u == null);
                    });
                });
            }
        });
    }

    getUser(name: string, callback: (u: User) => any) {
        this._dao.readUser(name, callback);
    }

    createOrganisation(organisation: Organisation, callback: (o: Organisation) => any) {
        this.organisationExists(organisation._name, (exists) => {
            if (exists) {
                callback(null);
            } else {
                this._dao.createOrganisation(organisation, () => {
                    this.getOrganisation(organisation._name, callback);
                });
            }
        });
    }

    getOrganisation(name: string, callback: (o: Organisation) => any) {
        this._dao.readOrganisation(name, callback);
    }

    addToOrganisation(organisationName: string, userName: string, callback: (o: Organisation) => any) {
        this._dao.addToOrganisation(organisationName, userName, () => {
            this.getOrganisation(organisationName, callback);
        });
    }

    userExists(name: string, callback: (b: boolean) => any) {
        this._dao.readUser(name, (u: User) => {
            callback(u != null);
        });
    }

    organisationExists(name: string, callback: (b: boolean) => any) {
        this._dao.readOrganisation(name, (o: Organisation) => {
            callback(o != null);
        });
    }
}