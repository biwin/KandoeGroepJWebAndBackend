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
                _this._dao.createUser(user, function () {
                    _this.getUser(user._name, callback);
                });
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
                _this._dao.deleteUser(name, function () {
                    _this.getUser(name, function (u) {
                        callback(u == null);
                    });
                });
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
        this._dao.readGroup(gName, callback);
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
                _this._dao.createOrganisation(organisation, function () {
                    _this.getOrganisation(organisation._name, callback);
                });
            }
        });
    };
    UserManager.prototype.getOrganisation = function (name, callback) {
        this._dao.readOrganisation(name, callback);
    };
    UserManager.prototype.addToOrganisation = function (oName, uId, callback) {
        var _this = this;
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
        this.userIdInOrganisation(oName, uId, function (userAlreadyInOrganisation) {
            console.log("User in organisation? " + userAlreadyInOrganisation);
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
    UserManager.prototype.groupExists = function (name, callback) {
        this._dao.readGroup(name, function (g) {
            callback(g != null);
        });
    };
    UserManager.prototype.organisationExists = function (name, callback) {
        this._dao.readOrganisation(name, function (o) {
            callback(o != null);
        });
    };
    UserManager.prototype.userIdInOrganisation = function (oName, uId, callback) {
        this.getOrganisation(oName, function (o) {
            /*var userInOrganisation = o._organisators.filter((value) => {
                return value.localeCompare(uId) == 0;
            }).length == 1;
            console.log("User in organisation? " + userInOrganisation);
            callback(userInOrganisation);*/
            callback(false);
        });
    };
    return UserManager;
})();
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map