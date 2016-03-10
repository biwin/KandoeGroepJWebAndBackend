var userManager_1 = require("../logic/userManager");
var user_1 = require("../model/user");
var groupAPI_1 = require("./groupAPI");
var circleSessionApi_1 = require("./circleSessionApi");
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
                var claim = new Buffer(JSON.stringify({ "type": "web", "name": name, "id": u._id, "email": email })).toString('base64');
                var signature = SHA256(header + "." + claim);
                var token = header + "." + claim + "." + signature;
                res.send(token);
            }
        });
    };
    UserApi.getPicture = function (token, type, res) {
        UserApi.isTokenValid(token, function (valid, decodedClaim) {
            if (valid)
                UserApi.manager.getUserById(decodedClaim.id, function (u) { return res.send(type == 'small' ? u._pictureSmall : u._pictureLarge); });
            else
                res.send("nope");
        });
    };
    UserApi.changeProfile = function (token, newName, newSmallPicture, newLargePicture, res) {
        UserApi.isTokenValid(token, function (valid, decodedClaim) {
            if (valid) {
                if (decodedClaim.type == 'facebook') {
                    UserApi.manager.changeProfileByFacebookId(decodedClaim.facebookId, newName, newSmallPicture, newLargePicture, function (u) {
                        if (u == null)
                            res.send("nope");
                        else
                            res.send(UserApi.generateTokenForUser(u, "facebook", u._facebookId));
                    });
                }
                else {
                    UserApi.manager.changeProfileByEmail(decodedClaim.email, newName, newSmallPicture, newLargePicture, function (u) {
                        if (u == null)
                            res.send("nope");
                        else
                            res.send(UserApi.generateTokenForUser(u, "web"));
                    });
                }
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
        callback(isLegit, isLegit ? JSON.parse(new Buffer(encClaim, 'base64').toString('ascii')) : null);
    };
    UserApi.getUser = function (email, password, res) {
        UserApi.manager.getUserByEmail(email, function (u) {
            if (u == null || u._password != password) {
                res.send("nope");
            }
            else {
                res.send(UserApi.generateTokenForUser(u, "web"));
            }
        });
    };
    UserApi.generateTokenForUser = function (u, type, facebookId) {
        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
        var claimObject = { "type": type, "name": u._name, "email": u._email, "id": u._id.toString() };
        if (facebookId)
            claimObject.facebookId = facebookId;
        var claim = new Buffer(JSON.stringify(claimObject)).toString('base64');
        var signature = SHA256(header + "." + claim);
        return header + "." + claim + "." + signature;
    };
    UserApi.getFacebookUser = function (facebookId, email, pictureSmall, pictureLarge, name, registrar, res) {
        UserApi.manager.facebookUserExists(facebookId, function (exists) {
            if (exists) {
                UserApi.manager.getFacebookUser(facebookId, function (u) {
                    if (u == null) {
                        res.send("nope");
                    }
                    else {
                        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                        var claim = new Buffer(JSON.stringify({ "facebookId": facebookId, "type": "facebook", "name": u._name, "id": u._id.toString() })).toString('base64');
                        var signature = SHA256(header + "." + claim);
                        var token = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            }
            else {
                var user = new user_1.User(name, email, "", registrar);
                user._facebookId = facebookId;
                user._pictureSmall = pictureSmall;
                user._pictureLarge = pictureLarge;
                UserApi.manager.registerUser(user, function (u) {
                    if (u == null) {
                        res.send("nope");
                    }
                    else {
                        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                        var claim = new Buffer(JSON.stringify({ "facebookId": facebookId, "type": "facebook", "name": name, "id": u._id })).toString('base64');
                        var signature = SHA256(header + "." + claim);
                        var token = header + "." + claim + "." + signature;
                        res.send(token);
                    }
                });
            }
        });
    };
    UserApi.getGroups = function (userId, res) {
        groupAPI_1.GroupAPI.getGroupsOfUserById(userId, res);
    };
    UserApi.getCircleSessions = function (userId, res) {
        circleSessionApi_1.CircleSessionApi.getCircleSessionsOfUserById(userId, res);
    };
    UserApi.getUsers = function (userIds, res) {
        UserApi.manager.getUsers(userIds, function (us) {
            res.send(us);
        });
    };
    UserApi.getCurrentUserId = function (token, callback) {
        UserApi.isTokenValid(token, function (b, decodedToken) {
            callback(b ? decodedToken.id : null);
        });
    };
    UserApi.manager = new userManager_1.UserManager();
    return UserApi;
})();
exports.UserApi = UserApi;
//# sourceMappingURL=userApi.js.map