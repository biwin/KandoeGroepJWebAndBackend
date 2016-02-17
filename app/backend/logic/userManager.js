var userDao_1 = require("../dao/userDao");
var UserManager = (function () {
    function UserManager() {
        this._dao = new userDao_1.UserDao();
    }
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
    UserManager.prototype.userExists = function (name, callback) {
        this._dao.readUser(name, function (u) {
            callback(u != null);
        });
    };
    return UserManager;
})();
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map