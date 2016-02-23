var userDao_1 = require("../dao/userDao");
var UserManager = (function () {
    function UserManager() {
        this._dao = new userDao_1.UserDao();
    }
    UserManager.prototype.clearDatabase = function (callback) {
        this._dao.clearDatabase(callback);
    };
    UserManager.prototype.registerUser = function (user, callback) {
        var _this = this;
        this.userExists(user._name, function (taken) {
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
        this.groupExists(group._name, function (taken) {
            if (!taken) {
                _this._dao.readOrganisation(group._organisationId, function (o) {
                    _this._dao.createGroup(group, function () {
                        o.groups.push(group);
                        _this.getGroup(group._name, callback);
                    });
                });
            }
            else {
                callback(null);
            }
        });
    };
    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    UserManager.prototype.deleteUser = function (name, callback) {
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
    UserManager.prototype.deleteUserById = function (id, callback) {
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
    UserManager.prototype.getGroup = function (gName, callback) {
        this._dao.readGroupByName(gName, callback);
    };
    UserManager.prototype.getGroupById = function (id, callback) {
        this._dao.readGroupById(id, callback);
    };
    UserManager.prototype.createOrganisation = function (organisation, callback) {
        var _this = this;
        this.organisationExists(organisation._name, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createOrganisation(organisation, callback);
            }
        });
    };
    UserManager.prototype.getOrganisation = function (name, callback) {
        this._dao.readOrganisation(name, callback);
    };
    UserManager.prototype.addToOrganisation = function (oName, uId, callback) {
        var _this = this;
        console.log("adding user to organisation");
        this.userIdInOrganisation(oName, uId, function (alreadyInOrganisation) {
            if (alreadyInOrganisation) {
                callback(null);
            }
            else {
                _this._dao.addToOrganisation(oName, uId, function () {
                    _this.getOrganisation(oName, callback);
                });
            }
        });
    };
    UserManager.prototype.addToGroup = function (uId, gName, callback) {
        var _this = this;
        this.userIdInGroup(gName, uId, function (alreadyInGroup) {
            if (alreadyInGroup) {
                callback(null);
            }
            else {
                _this._dao.addToGroup(uId, gName, function () {
                    _this.getGroup(gName, callback);
                });
            }
        });
    };
    /*
     * Returns false if the user doesn't exist or when the user couldn't be deleted.
     */
    UserManager.prototype.removeUserFromOrganisation = function (oName, uId, callback) {
        var _this = this;
        console.log("remove user from organisation");
        this.userIdInOrganisation(oName, uId, function (userAlreadyInOrganisation) {
            if (!userAlreadyInOrganisation) {
                callback(false);
            }
            else {
                _this._dao.deleteUserFromOrganisation(oName, uId, function () {
                    _this.getOrganisation(oName, function (o) {
                        callback(o == null);
                    });
                });
            }
        });
    };
    UserManager.prototype.userExists = function (name, callback) {
        this._dao.readUser(name, function (u) {
            callback(u != null);
        });
    };
    UserManager.prototype.userExistsById = function (id, callback) {
        this._dao.readUserById(name, function (u) {
            callback(u != null);
        });
    };
    UserManager.prototype.groupExists = function (name, callback) {
        this._dao.readGroupByName(name, function (g) {
            callback(g != null);
        });
    };
    UserManager.prototype.organisationExists = function (name, callback) {
        this._dao.readOrganisation(name, function (o) {
            callback(o != null);
        });
    };
    UserManager.prototype.userIdInOrganisation = function (oName, uId, callback) {
        console.log("I got called!");
        this.getOrganisation(oName, function (o) {
            if (o != null) {
                for (var index in o._organisators) {
                    /*console.log(o._organisators[index].toString());
                     console.log(o._organisators[index].toString().length);
                     console.log(uId.toString());
                     console.log(uId.toString().length);*/
                    if (o._organisators[index].toString() == uId.toString()) {
                        console.log("returning true for " + uId);
                        callback(true);
                        return;
                    }
                }
            }
            console.log("returning false for " + uId);
            callback(false);
        });
    };
    UserManager.prototype.userIdInGroup = function (gName, uId, callback) {
        /*this._dao.readGroupByName(gName, (g: Group) => {
            this._dao.readUserById(uId, (u: User) => {
                if (g._users.indexOf(u._id) > -1) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            });

        });*/
        this._dao.readIsUserInGroup(gName, uId, function (inGroup) {
            callback(inGroup);
        });
    };
    UserManager.prototype.getGroupByName = function (gName, callback) {
        this._dao.readGroupByName(gName, callback);
    };
    UserManager.prototype.removeGroup = function (_id, callback) {
        var _this = this;
        this._dao.readGroupById(_id, function (g) {
            _this.getOrganisation(g._organisationId, function (o) {
                _this._dao.deleteGroupFromOrganisation(g._id, o._id, function () {
                    _this._dao.deleteGroup(g._id, function (b) {
                        callback(b);
                    });
                });
            });
        });
    };
    UserManager.prototype.removeUserFromGroupById = function (_uId, _gId, callback) {
        var _this = this;
        this._dao.readUserById(_uId, function (u) {
            _this._dao.readGroupById(_gId, function (g) {
                _this._dao.deleteUserFromGroup(u._id, g._id, function () {
                });
            });
        });
    };
    UserManager.prototype.getAllUsers = function (callback) {
        this._dao.readAllUsers(callback);
    };
    UserManager.prototype.deleteOrganisationById = function (id, callback) {
        var _this = this;
        this.organisationExists(id, function (exists) {
            if (!exists) {
                callback(false);
            }
            else {
                _this._dao.deleteOrganisationById(id, callback);
            }
        });
    };
    return UserManager;
})();
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map