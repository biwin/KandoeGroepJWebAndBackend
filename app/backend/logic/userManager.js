var userDao_1 = require("../dao/userDao");
var UserManager = (function () {
    function UserManager() {
        this._dao = new userDao_1.UserDao();
    }
    UserManager.prototype.registerUser = function (user, callback) {
        var _this = this;
        this.userNameTaken(user._name, function (taken) {
            console.log(taken);
            if (!taken) {
                _this._dao.create(user, function () {
                    _this.getUser(user._name, callback);
                });
            }
            else {
                callback(null);
            }
        });
    };
    UserManager.prototype.getUser = function (name, callback) {
        this._dao.read(name, callback);
    };
    UserManager.prototype.userNameTaken = function (name, callback) {
        this._dao.read(name, function (u) {
            console.log("User [" + name + "] taken: " + (u != null));
            callback(u != null);
        });
    };
    return UserManager;
})();
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map