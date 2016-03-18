import {ObjectID} from "mongodb";

import {UserDao} from "../dao/userDao";
import {Group} from "../model/group";
import {Organisation} from "../model/organisation";
import {User} from "../model/user";

export class UserManager {
    private _dao: UserDao;

    constructor() {
        this._dao = new UserDao();
    }

    clearDatabase(callback: () => any) {
        this._dao.clearDatabase(callback);
    }

    registerUser(user: User, callback: (u: User) => any) {
        this.userEmailExists(user._email, (taken) => {
            if (!taken) {
                this._dao.createUser(user, callback);
            } else {
                callback(null);
            }
        });
    }

    registerGroup(group: Group, callback: (g: Group) => any) {
        //add groupids to organisation
        this._dao.readOrganisationById(group._organisationId, (o: Organisation) => {
            this._dao.createGroup(group, (newGroup: Group) => {
                this._dao.addGroupToOrganisation(newGroup._id, o._id, () => {
                    callback(newGroup);
                });
            });
        });
    }

    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    removeUser(name: string, callback: (b: boolean) => any) {
        this.userExists(name, (exists: boolean) => {
            if (!exists) {
                callback(false);
            } else {
                this._dao.deleteUser(name, callback);
            }
        });
    }

    removeUserById(id: string, callback: (b: boolean) => any) {
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

    getUserByEmail(email: string, callback: (u: User) => any) {
        this._dao.readUserByEmail(email, callback);
    }

    getFacebookUser(facebookId: string, callback: (u: User) => any) {
        this._dao.readFacebookUser(facebookId, callback);
    }

    facebookUserExists(facebookId: string, callback: (exists: boolean) => any) {
        this._dao.readFacebookUser(facebookId, (u: User) => {
            callback(u != null);
        });
    }

    getGroup(gName:string, callback: (g:Group) => any) {
        this._dao.readGroupByName(gName, callback);

    }

    getGroupById(id: string, callback: (g:Group) => any) {
        this._dao.readGroupById(id, callback);
    }

    createOrganisation(organisation: Organisation, callback: (o: Organisation) => any) {
        this.organisationExists(organisation._id, (exists) => {
            if (exists) {
                callback(null);
            } else {
                this._dao.createOrganisation(organisation, callback);
            }
        });
    }

    getOrganisationById(oId: string, callback: (o: Organisation) => any) {
        this._dao.readOrganisationById(oId, callback);
    }

    addToOrganisation(oId: string, uId: string, isOrganisator: boolean, callback: (b: boolean) => any) {
        this.userInOrganisation(oId, uId, (alreadyInOrganisation: boolean) => {
            if (alreadyInOrganisation) {
                callback(false);
            } else {
                if (isOrganisator) {
                    this._dao.addOrganisatorToOrganisation(oId, uId, callback);
                } else {
                    this._dao.addMemberToOrganisation(oId, uId, callback);
                }
            }
        });
    }

    addToGroupById(uId: string, gId: string, callback: (b: boolean) => any) {
        this.userIdInGroup(gId, uId, (alreadyInGroup: boolean) => {
            if (alreadyInGroup) {
                callback(null);
            } else {
                this._dao.addToGroup(uId, gId, callback);
            }
        });
    }

    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    removeUserFromOrganisationByName(oName: string, uId: string, callback: (b: boolean) => any) {
        this.userInOrganisation(oName, uId, (userAlreadyInOrganisation: boolean) => {
            if (!userAlreadyInOrganisation) {
                callback(false);
            } else {
                this._dao.deleteUserFromOrganisation(oName, uId, () => {
                    this.getOrganisationById(oName, (o: Organisation) => {
                        callback(o == null);
                    });
                });
            }
        });
    }

    removeUserFromOrganisationById(oId: string, uId: string, callback: (b: boolean) => any) {
        this.userInOrganisation(oId, uId, (userAlreadyInOrganisation: boolean) => {
            if (userAlreadyInOrganisation) {

            } else {

            }
            /*if (!userAlreadyInOrganisation) {
                callback(false);
            } else {
                console.log("hi");
                callback(true);
                this._dao.deleteUserFromOrganisation(oId, uId, callback);
            }*/
        });
    }

    userExists(name: string, callback: (b: boolean) => any) {
        this._dao.readUser(name, (u: User) => {
            callback(u != null);
        });
    }

    userExistsById(id: string, callback: (b: boolean) => any) {
        this._dao.readUserById(id, (u: User) => {
            callback(u != null);
        });
    }

    userEmailExists(email: string, callback: (b: boolean) => any) {
        this._dao.readUserByEmail(email, (u: User) => {
            callback(u != null);
        });
    }

    groupExists(gId: string, callback: (b: boolean) => any) {
        this._dao.readGroupById(gId, (g: Group) => {
            callback(g != null);
        });
    }

    organisationExists(oId: string, callback: (b: boolean) => any) {
        this._dao.readOrganisationById(oId, (o: Organisation) => {
            callback(o != null);
        });
    }

    userInOrganisation(oId: string, uId: string, callback: (b: boolean) => any) {
        this.getOrganisationById(oId, (o: Organisation) => {
            if (o != null) {
                for (var index in o._memberIds) {
                    if (o._memberIds[index].toString() == uId.toString()){
                        callback(true);
                        return;
                    }
                }
                for (var index in o._organisatorIds) {
                    if (o._organisatorIds[index].toString() == uId.toString()) {
                        callback(true);
                        return;
                    }
                }
            }
            callback(false);
        });
    }

    private userIdInGroup(gId: string, uId: string, callback: (b: boolean) => any) {
        this._dao.readIsUserInGroup(gId, uId, (inGroup: boolean) => {
            callback(inGroup);
        });
    }

    getGroupByName(gName: string, callback: (g: Group) => any) {
        this._dao.readGroupByName(gName, callback);
    }
    // br = boolean reference verwijderd? bg = boolean group verwijderd?
    removeGroupById(_id: string, callback: (b: boolean) => any) {
        this._dao.readGroupById(_id, (g: Group) => {
            this.getOrganisationById(g._organisationId, (o:Organisation) => {
                this._dao.deleteGroupFromOrganisation(g._id, o._id, (br: boolean) => {
                    this._dao.deleteGroup(g._id, (bg: boolean) => {
                        callback(br && bg);
                    })
                });
            });
        });
    }


    removeUserFromGroupById(_uId: string, _gId: string, callback: (b: boolean) => any) {
        this._dao.readUserById(_uId, (u: User) => {
            this._dao.readGroupById(_gId, (g: Group) => {
                this._dao.deleteUserFromGroup(u._id, g._id, callback);
            });
        });

    }

    getAllUsers(callback: (users: User[]) => any) {
        this._dao.readAllUsers(callback);
    }

    removeOrganisationById(id: string, callback: (b: boolean) => any) {
        this._dao.deleteOrganisationById(id, callback);
    }

    setUserOrganisatorOf(uId: string, oId: string, callback:(b: boolean) => any) {
        this._dao.setUserOrganisatorOf(uId, oId, callback);
    }

    changeProfileByEmail(email: string, newName: string, newSmallPicture: string, newLargePicture: string, callback: (u: User) => any) {
        console.log("wtf Jasper: " + newName);
        this._dao.changeProfileByEmail(email, newName, newSmallPicture, newLargePicture, (success: boolean) => {
            if (success) {
                this._dao.readUserByEmail(email, callback);
            } else {
                callback(null);
            }
        });
    }

    changeProfileByFacebookId(facebookId: string, newName: string, newSmallPicture: string, newLargePicture: string, callback: (u: User) => any) {
        this._dao.changeProfileByFacebookId(facebookId, newName, newSmallPicture, newLargePicture, (success: boolean) => {
            if (success) {
                this._dao.readUserByFacebookId(facebookId, callback);
            } else {
                callback(null);
            }
        });
    }

    getUsers(userIds: string[], callback:(us: User[]) => any) {
        this._dao.readUsers(userIds.map((s:string) => new ObjectID(s)),callback);
    }

    getUserIdsByEmail(_userEmailAdresses: string[], callback:(us: string[]) => any) {
        this._dao.readUserIdsByEmail(_userEmailAdresses, callback);
    }

    getAdminsOfOrganisationById(organisationId: string, callback: (admins: User[]) => any) {
        this._dao.getAdminsOfOrganisationById(organisationId, callback);
    }

    getMembersOfOrganisationById(organisationId: string, callback: (members: User[]) => any) {
        this._dao.getMembersOfOrganisationById(organisationId, callback);
    }

    getMembersOfGroupById(groupId: string, callback: (members: User[]) => any) {
        this._dao.getMembersOfGroupById(groupId, callback);
    }

    addGroupIdToUserById(groupId: string, userId: string, callback: (added: boolean) => any) {
        this._dao.addGroupIdToUserById(groupId, userId, callback);
    }

    removeAllMembersFromGroupById(groupId: string, callback: (removed: boolean) => any) {
        this._dao.removeAllMembersFromGroupById(groupId, callback);
    }

    removeAllUsersFromOrganisationById(organisationId: string, callback: (removed: boolean) => any) {
        this._dao.removeAllUsersFromOrganisationById(organisationId, callback);
    }

    addOrganisationIdToUserById(organisationId: string, userId: string, isOrganisator: boolean, callback: (added: boolean) => any) {
        this._dao.addOrganisationIdToUserById(organisationId, userId, isOrganisator, callback);
    }

    deleteOrganisationFromUserById(organisationId: string, userId: string, callback: (deleted: boolean) => any) {
        this._dao.deleteOrganisationFromUserById(organisationId, userId, callback);
    }
}