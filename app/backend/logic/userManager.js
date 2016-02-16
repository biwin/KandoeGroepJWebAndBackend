var userdao = require('../dao/udo');
var UserManager = (function () {
    //private _userDao: UserDao;
    function UserManager() {
        //  this._userDao = new UserDao();
    }
    UserManager.prototype.registerUser = function (id, email, password) {
        return userdao.create(id, email, password);
    };
    return UserManager;
})();
exports.UserManager = UserManager;
//# sourceMappingURL=userManager.js.map