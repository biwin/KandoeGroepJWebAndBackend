"use strict";
var userDao_1 = require("../dao/userDao");
var mongodb_1 = require("mongodb");
/**
 * Class that is responsible for managing what data will be send to the database layer for users
 */
var UserManager = (function () {
    function UserManager() {
        this._dao = new userDao_1.UserDao();
    }
    UserManager.prototype.clearDatabase = function (callback) {
        this._dao.clearDatabase(callback);
    };
    UserManager.prototype.registerUser = function (user, callback) {
        var _this = this;
        this.userEmailExists(user._email, function (taken) {
            if (!taken) {
                _this._dao.createUser(user, callback);
            }
            else {
                callback(null);
            }
        });
    };
    UserManager.prototype.registerGroup = function (group, callback) {
        var _this = this;
        //add groupids to organisation
        this._dao.readOrganisationById(group._organisationId, function (o) {
            _this._dao.createGroup(group, function (newGroup) {
                _this._dao.addGroupToOrganisation(newGroup._id, o._id, function () {
                    callback(newGroup);
                });
            });
        });
    };
    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    UserManager.prototype.removeUser = function (name, callback) {
        var _this = this;
        this.userExists(name, function (exists) {
            if (!exists) {
                callback(false);
            }
            else {
                _this._dao.deleteUser(name, callback);
            }
        });
    };
    UserManager.prototype.removeUserById = function (id, callback) {
        var _this = this;
        this.userExistsById(id, function (exists) {
            if (!exists) {
                callback(false);
            }
            else {
                _this._dao.deleteUserById(id, callback);
            }
        });
    };
    UserManager.prototype.getUser = function (name, callback) {
        this._dao.readUser(name, callback);
    };
    UserManager.prototype.getUserById = function (id, callback) {
        this._dao.readUserById(id, callback);
    };
    UserManager.prototype.getUserByEmail = function (email, callback) {
        this._dao.readUserByEmail(email, callback);
    };
    UserManager.prototype.getFacebookUser = function (facebookId, callback) {
        this._dao.readFacebookUser(facebookId, callback);
    };
    UserManager.prototype.facebookUserExists = function (facebookId, callback) {
        this._dao.readFacebookUser(facebookId, function (u) {
            callback(u != null);
        });
    };
    UserManager.prototype.getGroup = function (gName, callback) {
        this._dao.readGroupByName(gName, callback);
    };
    UserManager.prototype.getGroupById = function (id, callback) {
        this._dao.readGroupById(id, callback);
    };
    UserManager.prototype.createOrganisation = function (organisation, callback) {
        var _this = this;
        this.organisationExists(organisation._id, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createOrganisation(organisation, callback);
            }
        });
    };
    UserManager.prototype.getOrganisationById = function (oId, callback) {
        this._dao.readOrganisationById(oId, callback);
    };
    UserManager.prototype.userExists = function (name, callback) {
        this._dao.readUser(name, function (u) {
            callback(u != null);
        });
    };
    UserManager.prototype.userExistsById = function (id, callback) {
        this._dao.readUserById(id, function (u) {
            callback(u != null);
        });
    };
    UserManager.prototype.userEmailExists = function (email, callback) {
        this._dao.readUserByEmail(email, function (u) {
            callback(u != null);
        });
    };
    UserManager.prototype.groupExists = function (gId, callback) {
        this._dao.readGroupById(gId, function (g) {
            callback(g != null);
        });
    };
    UserManager.prototype.organisationExists = function (oId, callback) {
        this._dao.readOrganisationById(oId, function (o) {
            callback(o != null);
        });
    };
    UserManager.prototype.userInOrganisation = function (oId, uId, callback) {
        this.getOrganisationById(oId, function (o) {
            if (o != null) {
                for (var index in o._memberIds) {
                    if (o._memberIds[index].toString() == uId.toString()) {
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
    };
    UserManager.prototype.getGroupByName = function (gName, callback) {
        this._dao.readGroupByName(gName, callback);
    };
    UserManager.prototype.removeGroupById = function (_id, callback) {
        var _this = this;
        this._dao.readGroupById(_id, function (g) {
            _this.getOrganisationById(g._organisationId, function (o) {
                _this._dao.deleteGroupFromOrganisation(g._id, o._id, function (br) {
                    _this._dao.deleteGroup(g._id, function (bg) {
                        callback(br && bg);
                    });
                });
            });
        });
    };
    UserManager.prototype.removeUserFromGroupById = function (_uId, _gId, callback) {
        var _this = this;
        this._dao.readUserById(_uId, function (u) {
            _this._dao.readGroupById(_gId, function (g) {
                _this._dao.deleteUserFromGroup(u._id, g._id, callback);
            });
        });
    };
    UserManager.prototype.getAllUsers = function (callback) {
        this._dao.readAllUsers(callback);
    };
    UserManager.prototype.removeOrganisationById = function (id, callback) {
        this._dao.deleteOrganisationById(id, callback);
    };
    UserManager.prototype.setUserOrganisatorOf = function (uId, oId, callback) {
        this._dao.setUserOrganisatorOf(uId, oId, callback);
    };
    UserManager.prototype.changeProfileByEmail = function (email, newName, newSmallPicture, newLargePicture, callback) {
        var _this = this;
        this._dao.changeProfileByEmail(email, newName, newSmallPicture, newLargePicture, function (success) {
            if (success) {
                _this._dao.readUserByEmail(email, callback);
            }
            else {
                callback(null);
            }
        });
    };
    UserManager.prototype.changeProfileByFacebookId = function (facebookId, newName, newSmallPicture, newLargePicture, callback) {
        var _this = this;
        this._dao.changeProfileByFacebookId(facebookId, newName, newSmallPicture, newLargePicture, function (success) {
            if (success) {
                _this._dao.readUserByFacebookId(facebookId, callback);
            }
            else {
                callback(null);
            }
        });
    };
    UserManager.prototype.getUsers = function (userIds, callback) {
        this._dao.readUsers(userIds.map(function (s) { return new mongodb_1.ObjectID(s); }), callback);
    };
    UserManager.prototype.getUserIdsByEmail = function (_userEmailAdresses, callback) {
        this._dao.readUserIdsByEmail(_userEmailAdresses, callback);
    };
    UserManager.prototype.getAdminsOfOrganisationById = function (organisationId, callback) {
        this._dao.getAdminsOfOrganisationById(organisationId, callback);
    };
    UserManager.prototype.getMembersOfOrganisationById = function (organisationId, callback) {
        this._dao.getMembersOfOrganisationById(organisationId, callback);
    };
    UserManager.prototype.getMembersOfGroupById = function (groupId, callback) {
        this._dao.getMembersOfGroupById(groupId, callback);
    };
    UserManager.prototype.addGroupIdToUserById = function (groupId, userId, callback) {
        this._dao.addGroupIdToUserById(groupId, userId, callback);
    };
    UserManager.prototype.removeAllMembersFromGroupById = function (groupId, callback) {
        this._dao.removeAllMembersFromGroupById(groupId, callback);
    };
    UserManager.prototype.removeAllUsersFromOrganisationById = function (organisationId, callback) {
        this._dao.removeAllUsersFromOrganisationById(organisationId, callback);
    };
    UserManager.prototype.addOrganisationIdToUserById = function (organisationId, userId, isOrganisator, callback) {
        this._dao.addOrganisationIdToUserById(organisationId, userId, isOrganisator, callback);
    };
    UserManager.prototype.deleteOrganisationFromUserById = function (organisationId, userId, callback) {
        this._dao.deleteOrganisationFromUserById(organisationId, userId, callback);
    };
    UserManager.prototype.deleteGroupFromUserById = function (groupId, userId, callback) {
        this._dao.deleteGroupFromUserById(groupId, userId, callback);
    };
    UserManager.prototype.deleteTestUsers = function (callback) {
        this._dao.deleteTestUsers(callback);
    };
    UserManager.prototype.getUserIdForUserByEmail = function (email, callback) {
        this.getUserByEmail(email, function (user) {
            callback(user._id);
        });
    };
    return UserManager;
}());
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map