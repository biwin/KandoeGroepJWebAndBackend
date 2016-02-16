var userDao_1 = require("../dao/userDao");
/**
 * Created by Jan on 16/02/2016.
 */
var UserManager = (function () {
    function UserManager() {
        this._userDao = new userDao_1.UserDao();
    }
    UserManager.prototype.registerUser = function (id, email, password) {
        return this._userDao.create(id, email, password);
    };
    return UserManager;
})();
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map