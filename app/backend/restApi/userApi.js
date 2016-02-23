var userManager_1 = require("../logic/userManager");
var user_1 = require("../model/user");
var UserApi = (function () {
    function UserApi() {
    }
    UserApi.createUser = function (name, email, password, role, res) {
        return new userManager_1.UserManager().registerUser(new user_1.User(name, email, password, role), function (user) {
            res.send(user);
        });
    };
    UserApi.createDummyUser = function (res) {
        return new userManager_1.UserManager().registerUser(new user_1.User("Kattoor44", "jasper.catthoor@student.kdg.be", "sup", "admin"), function (user) {
            res.send(user);
        });
    };
    UserApi.getUser = function (id, res) {
        return new userManager_1.UserManager().getUserById(id, function (user) {
            res.send(user);
        });
    };
    return UserApi;
})();
exports.UserApi = UserApi;
//# sourceMappingURL=userApi.js.map