var userManager_1 = require("../logic/userManager");
var user_1 = require("../model/user");
var SHA256 = require("crypto-js/sha256");
var UserApi = (function () {
    function UserApi() {
    }
    UserApi.createUser = function (name, email, password, registrar, res) {
        UserApi.manager.registerUser(new user_1.User(name, email, password, registrar), function (u) {
            if (u == null) {
                res.send("nope");
            }
            else {
                var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                var claim = new Buffer(JSON.stringify({ "name": name, "id": u._id })).toString('base64');
                var signature = SHA256(header + "." + claim);
                var token = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    };
    UserApi.getUser = function (username, password, res) {
        UserApi.manager.getUser(username, function (u) {
            if (u == null) {
                res.send("nope");
            }
            else if (u._password == password) {
                var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                var claim = new Buffer(JSON.stringify({ "name": username, "id": u._id.toString() })).toString('base64');
                var signature = SHA256(header + "." + claim);
                var token = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    };
    UserApi.getFacebookUser = function (id, name, registrar, res) {
        UserApi.manager.facebookUserExists(id, function (exists) {
            if (exists) {
                console.log("exists: " + name + ": " + id);
                UserApi.manager.getFacebookUser(id, function (u) {
                    if (u == null) {
                        res.send("nope");
                    }
                    else {
                        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                        var claim = new Buffer(JSON.stringify({ "name": name, "id": u._id.toString() })).toString('base64');
                        var signature = SHA256(header + "." + claim);
                        var token = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            }
            else {
                console.log("!exists: " + name + ": " + id);
                var user = new user_1.User(name, "", "", registrar);
                user._facebookId = id;
                UserApi.manager.registerUser(user, function (u) {
                    if (u == null) {
                        res.send("nope");
                    }
                    else {
                        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                        var claim = new Buffer(JSON.stringify({ "name": name, "id": u._id })).toString('base64');
                        var signature = SHA256(header + "." + claim);
                        var token = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            }
        });
    };
    UserApi.manager = new userManager_1.UserManager();
    return UserApi;
})();
exports.UserApi = UserApi;
//# sourceMappingURL=userApi.js.map