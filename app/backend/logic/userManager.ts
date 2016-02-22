import {UserDao} from "../dao/userDao";
import {User} from "../model/user";
import {Organisation} from "../model/organisation";
import {ObjectID} from "mongodb";
import {Group} from "../model/group";

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

    registerGroup(group:Group, callback: (g: Group) => any  ) {
        this.groupExists(group._name, (taken) => {

            if (!taken) {
                this._dao.readOrganisation(group._organisationId, (o:Organisation) => {
                    this._dao.createGroup(group, () => {
                        o.groups.push(group);
                        this.getGroup(group._name, callback);
                    });
                });

            } else  {
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

    getUserById(id: string, callback: (u: User) => any) {
        this._dao.readUserById(id, callback);
    }

    getGroup(gName:string, callback: (g:Group) => any) {
        this._dao.readGroup(gName, callback);

    }

    getGroupById(id: string, callback: (g:Group) => any) {
        this._dao.readGroupById(id, callback);
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

    addToOrganisation(oName: string, uId: string, callback: (o: Organisation) => any) {
        this.userIdInOrganisation(oName, uId, (alreadyInOrganisation: boolean) => {
            if (alreadyInOrganisation) {
                callback(null);
            } else {
                this._dao.addToOrganisation(oName, uId, () => {
                    this.getOrganisation(oName, callback);
                });
            }
        });
    }

    addToGroup(uId:String, gName:String, callback: (g: Group) => any) {
        this.userIdInGroup(gName, uId, (alreadyInGroup: boolean) => {
            if (alreadyInGroup) {
                callback(null);
            }
            else {
                this._dao.addToGroup(uId,gName, () => {
                    this.getGroup(gName, callback)
                });
            }
        });

    }

    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    removeUserFromOrganisation(oName: string, uId: string, callback: (b: boolean) => any) {
        this.userIdInOrganisation(oName, uId, (userAlreadyInOrganisation: boolean) => {
            console.log("User in organisation? " + userAlreadyInOrganisation);
            if (!userAlreadyInOrganisation) {
                callback(false);
            } else {
                this._dao.deleteUserFromOrganisation(oName, uId, () => {
                    this.getOrganisation(oName, (o: Organisation) => {
                        callback(o == null);
                    });
                });
            }
        });
    }

    userExists(name: string, callback: (b: boolean) => any) {
        this._dao.readUser(name, (u: User) => {
            callback(u != null);
        });
    }

    groupExists(name: string, callback: (b: boolean) => any) {
        this._dao.readGroup(name, (g: Group) => {
            callback(g != null);
        });
    }

    organisationExists(name: string, callback: (b: boolean) => any) {
        this._dao.readOrganisation(name, (o: Organisation) => {
            callback(o != null);
        });
    }

    userIdInOrganisation(oName: string, uId: string, callback: (b: boolean) => any) {
        this.getOrganisation(oName, (o: Organisation) => {
            /*var userInOrganisation = o._organisators.filter((value) => {
                return value.localeCompare(uId) == 0;
            }).length == 1;
            console.log("User in organisation? " + userInOrganisation);
            callback(userInOrganisation);*/
            callback(false);
        });
    }



}