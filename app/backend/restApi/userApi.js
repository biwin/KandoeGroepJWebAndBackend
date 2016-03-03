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
                var claim = new Buffer(JSON.stringify({ "name": name, "id": u._id, "email": email })).toString('base64');
                var signature = SHA256(header + "." + claim);
                var token = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    };
    UserApi.changeUsername = function (token, newName, res) {
        UserApi.isTokenValid(token, function (valid, decodedClaim) {
            console.log("valid?: " + valid);
            if (valid) {
                UserApi.manager.changeUsernameByEmail(decodedClaim.email, newName, function (u) {
                    console.log("Did it work? : " + u);
                    if (u == null)
                        res.send("nope");
                    else
                        res.send(UserApi.generateTokenForUser(u));
                });
            }
            else {
                res.send("nope");
            }
        });
    };
    UserApi.isTokenValid = function (token, callback) {
        if (token == null) {
            callback(false, null);
            return;
        }
        var parts = token.split('.');
        if (parts.length != 3) {
            callback(false, null);
            return;
        }
        var encHeader = parts[0];
        var encClaim = parts[1];
        var encSignature = parts[2];
        var isLegit = (SHA256(encHeader + "." + encClaim) == encSignature);
        console.log("isLegit?? : " + isLegit + ": " + JSON.stringify(new Buffer(encClaim, 'base64').toString('ascii')));
        callback(isLegit, isLegit ? JSON.parse(new Buffer(encClaim, 'base64').toString('ascii')) : null);
    };
    UserApi.getUser = function (email, password, res) {
        UserApi.manager.getUserByEmail(email, function (u) {
            if (u == null || u._password != password) {
                res.send("nope");
            }
            else {
                res.send(UserApi.generateTokenForUser(u));
            }
        });
    };
    UserApi.generateTokenForUser = function (u) {
        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
        var claim = new Buffer(JSON.stringify({ "name": u._name, "email": u._email, "id": u._id.toString() })).toString('base64');
        var signature = SHA256(header + "." + claim);
        return header + "." + claim + "." + signature;
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
                        var header = new Buffer(JSON.stringify({
                            "typ": "JWT",
                            "alg": "HS256"
                        })).toString('base64');
                        var claim = new Buffer(JSON.stringify({
                            "name": name,
                            "id": u._id.toString()
                        })).toString('base64');
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
                        var header = new Buffer(JSON.stringify({
                            "typ": "JWT",
                            "alg": "HS256"
                        })).toString('base64');
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