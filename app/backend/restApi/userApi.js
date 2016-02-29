var userManager_1 = require("../logic/userManager");
var user_1 = require("../model/user");
var SHA256 = require("crypto-js/sha256");
var UserApi = (function () {
    function UserApi() {
    }
    UserApi.createUser = function (name, email, password, res) {
        console.log("omg");
        UserApi.manager.registerUser(new user_1.User(name, "", password), function (u) {
            console.log("registered user: " + name + ": " + password);
            var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
            var claim = new Buffer(JSON.stringify({ "name": name, "id": u._id })).toString('base64');
            var signature = SHA256(header + "." + claim);
            var token = header + "." + claim + "." + signature;
            console.log("Registered: " + token);
            res.send(token);
        });
    };
    UserApi.getUser = function (username, password, res) {
        console.log("omg2");
        UserApi.manager.getUser(username, function (u) {
            if (u._password == password) {
                console.log(u);
                console.log("id: " + u._id);
                var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                var claim = new Buffer(JSON.stringify({ "name": username, "id": u._id.toString() })).toString('base64');
                var signature = SHA256(header + "." + claim);
                var token = header + "." + claim + "." + signature;
                console.log("Logged in: " + token);
                res.send(token);
            }
            else {
                console.log("nope");
                res.send("nope");
            }
        });
    };
    UserApi.manager = new userManager_1.UserManager();
    return UserApi;
})();
exports.UserApi = UserApi;
//# sourceMappingURL=userApi.js.map