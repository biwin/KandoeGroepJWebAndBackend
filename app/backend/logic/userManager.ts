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
                this._dao.createUser(user, callback);
            } else {
                callback(null);
            }
        });
    }

    registerGroup(group:Group, callback: (g: Group) => any  ) {
        this.groupExists(group._id, (taken) => {

            if (!taken) {
                this._dao.readOrganisation(group._organisationId, (o:Organisation) => {
                    this._dao.createGroup(group, (newGroup: Group) => {
                        this._dao.addGroupToOrganisation(newGroup._id,o._id, () => {
                           callback(newGroup);
                        });
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
                this._dao.deleteUser(name, callback);
            }
        });
    }

    deleteUserById(id: string, callback: (b: boolean) => any) {
        this.userExistsById(id, (exists: boolean) => {
            if (!exists) {
                callback(false);
            } else {
                this._dao.deleteUserById(id, callback);
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
        this._dao.readGroupByName(gName, callback);

    }

    getGroupById(id: string, callback: (g:Group) => any) {
        this._dao.readGroupById(id, callback);
    }


    createOrganisation(organisation: Organisation, callback: (o: Organisation) => any) {
        this.organisationExists(organisation._name, (exists) => {
            if (exists) {
                callback(null);
            } else {
                this._dao.createOrganisation(organisation, callback);
            }
        });
    }

    getOrganisation(name: string, callback: (o: Organisation) => any) {
        this._dao.readOrganisation(name, callback);
    }

    addToOrganisation(oName: string, uId: string, callback: (o: Organisation) => any) {
        console.log("adding user to organisation");
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

    addToGroupById(uId:string, gId:string, callback: (g: Group) => any) {
        this.userIdInGroup(gId, uId, (alreadyInGroup: boolean) => {
            if (alreadyInGroup) {
                callback(null);
            }
            else {
                this._dao.addToGroup(uId,gId, () => {
                    this.getGroup(gId, callback)
                });
            }
        });

    }

    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    removeUserFromOrganisationByName(oName: string, uId: string, callback: (b: boolean) => any) {
        console.log("remove user from organisation by name");
        this.userIdInOrganisation(oName, uId, (userAlreadyInOrganisation: boolean) => {
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

    removeUserFromOrganisationById(oId: string, uId: string, callback: (b: boolean) => any) {
        console.log("remove user from organisation by id");
        this.userIdInOrganisation(oId, uId, (userAlreadyInOrganisation: boolean) => {
            if (!userAlreadyInOrganisation) {
                callback(false);
            } else {
                this._dao.deleteUserFromOrganisation(oId, uId, callback);
            }
        });
    }

    userExists(name: string, callback: (b: boolean) => any) {
        this._dao.readUser(name, (u: User) => {
            callback(u != null);
        });
    }

    userExistsById(id: string, callback: (b: boolean) => any) {
        this._dao.readUserById(name, (u: User) => {
            callback(u != null);
        });
    }

    groupExists(gId: string, callback: (b: boolean) => any) {
        this._dao.readGroupById(gId, (g: Group) => {
            callback(g != null);
        });
    }

    organisationExists(name: string, callback: (b: boolean) => any) {
        this._dao.readOrganisation(name, (o: Organisation) => {
            callback(o != null);
        });
    }

    userIdInOrganisation(oName: string, uId: string, callback: (b: boolean) => any) {
        console.log("I got called!");
        this.getOrganisation(oName, (o: Organisation) => {
            if (o != null) {
                for (var index in o._memberIds) {
                    /*console.log(o._memberIds[index].toString());
                     console.log(o._memberIds[index].toString().length);
                     console.log(uId.toString());
                     console.log(uId.toString().length);*/
                    if (o._memberIds[index].toString() == uId.toString()){
                        console.log("returning true for " + uId);
                        callback(true);
                        return;
                    }
                }
            }
            console.log("returning false for " + uId);
            callback(false);
        });
    }

    private userIdInGroup(gId:string, uId:string, callback: (b: boolean) => any) {

        /*this._dao.readGroupByName(gName, (g: Group) => {
            this._dao.readUserById(uId, (u: User) => {
         if (g._memberIds.indexOf(u._id) > -1) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            });

        });*/

        this._dao.readIsUserInGroup(gId, uId, (inGroup: boolean) => {
            callback(inGroup);
        });

    }

    getGroupByName(gName: string, callback: (g:Group) => any) {
        this._dao.readGroupByName(gName, callback);
    }

    removeGroupById(_id:string, callback: (b: boolean) => any) {
        this._dao.readGroupById(_id, (g: Group) => {
            this.getOrganisation(g._organisationId, (o:Organisation) => {
                this._dao.deleteGroupFromOrganisation(g._id, o._id, () => {
                    this._dao.deleteGroup(g._id, (b: boolean) => {
                        callback(b);
                    })
                });

            });

        });

    }


    removeUserFromGroupById(_uId:string, _gId:string, callback: (b: boolean) => any) {
        this._dao.readUserById(_uId, (u: User) => {
            this._dao.readGroupById(_gId, (g: Group) => {
                this._dao.deleteUserFromGroup(u._id, g._id, () => {

                });
            });
        });

    }

    getAllUsers(callback: (users: User[]) => any) {
        this._dao.readAllUsers(callback);
    }

    removeOrganisationById(id: string, callback: (b: boolean) => any) {
        this.organisationExists(id, (exists: boolean) => {
            if (!exists) {
                callback(false);
            } else {
                this._dao.deleteOrganisationById(id, callback);
            }
        });
    }


}