var organisationAPI_1 = require("./organisationAPI");
var userManager_1 = require("../logic/userManager");
var user_1 = require("../model/user");
var SHA256 = require("crypto-js/sha256");
var UserApi = (function () {
    function UserApi() {
    }
    UserApi.createUser = function (name, email, password, registrar, res) {
        UserApi.manager.registerUser(new user_1.User(name, email, password, registrar), function (u) {
            if (u == null) {
                res.send("{\"_message\":\"nope\"}");
            }
            else {
                var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                var claim = new Buffer(JSON.stringify({ "_type": "web", "_name": name, "_id": u._id, "_email": email })).toString('base64');
                var signature = SHA256(header + "." + claim);
                var token = header + "." + claim + "." + signature;
                res.send("{\"_message\":\"" + token + "\"}");
            }
        });
    };
    UserApi.getUser = function (email, password, res) {
        UserApi.manager.getUserByEmail(email, function (u) {
            if (u == null || u._password != password) {
                res.send("{\"_message\":\"nope\"}");
            }
            else {
                res.send("{\"_message\":\"" + UserApi.generateTokenForUser(u, "web") + "\"}");
            }
        });
    };
    UserApi.getPicture = function (token, type, res) {
        UserApi.isTokenValid(token, function (valid, decodedClaim) {
            if (valid)
                UserApi.manager.getUserById(decodedClaim._id, function (u) { return res.send("{\"message\":\"" + (type == 'small' ? u._pictureSmall : u._pictureLarge) + "\"}"); });
            else
                res.send("{\"_message\":\"nope\"}");
        });
    };
    UserApi.changeProfile = function (token, newName, newSmallPicture, newLargePicture, res) {
        UserApi.isTokenValid(token, function (valid, decodedClaim) {
            if (valid) {
                if (decodedClaim._type == 'facebook') {
                    UserApi.manager.changeProfileByFacebookId(decodedClaim._facebookId, newName, newSmallPicture, newLargePicture, function (u) {
                        if (u == null)
                            res.send("{\"_message\":\"nope\"}");
                        else
                            res.send("{\"_message\":\"" + UserApi.generateTokenForUser(u, "facebook", u._facebookId) + "\"}");
                    });
                }
                else {
                    UserApi.manager.changeProfileByEmail(decodedClaim._email, newName, newSmallPicture, newLargePicture, function (u) {
                        if (u == null)
                            res.send("{\"_message\":\"nope\"}");
                        else
                            res.send("{\"_message\":\"" + UserApi.generateTokenForUser(u, "web") + "\"}");
                    });
                }
            }
            else {
                res.send("{\"_message\":\"nope\"}");
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
    UserApi.generateTokenForUser = function (u, type, facebookId) {
        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
        var claimObject = { "_type": type, "_name": u._name, "_email": u._email, "_id": u._id.toString() };
        if (facebookId)
            claimObject._facebookId = facebookId;
        var claim = new Buffer(JSON.stringify(claimObject)).toString('base64');
        var signature = SHA256(header + "." + claim);
        return header + "." + claim + "." + signature;
    };
    UserApi.getFacebookUser = function (facebookId, email, pictureSmall, pictureLarge, name, registrar, res) {
        UserApi.manager.facebookUserExists(facebookId, function (exists) {
            if (exists) {
                UserApi.manager.getFacebookUser(facebookId, function (u) {
                    if (u == null) {
                        res.send("{\"_message\":\"nope\"}");
                    }
                    else {
                        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                        var claim = new Buffer(JSON.stringify({ "_facebookId": facebookId, "_type": "facebook", "_name": u._name, "_id": u._id.toString() })).toString('base64');
                        var signature = SHA256(header + "." + claim);
                        var token = header + "." + claim + "." + signature;
                        res.send("{\"_message\":\"" + token + "\"}");
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
                        res.send("{\"_message\":\"nope\"}");
                    }
                    else {
                        var header = new Buffer(JSON.stringify({ "typ": "JWT", "alg": "HS256" })).toString('base64');
                        var claim = new Buffer(JSON.stringify({ "_facebookId": facebookId, "_type": "facebook", "_name": name, "_id": u._id })).toString('base64');
                        var signature = SHA256(header + "." + claim);
                        var token = header + "." + claim + "." + signature;
                        res.send("{\"_message\":\"" + token + "\"}");
                    }
                });
            }
        });
    };
    UserApi.getUsers = function (req, res) {
        var userIds = JSON.parse(decodeURI(req.params.array));
        UserApi.manager.getUsers(userIds, function (us) {
            res.send(us);
        });
    };
    UserApi.getCurrentUserId = function (token, callback) {
        UserApi.isTokenValid(token, function (b, decodedToken) {
            callback(b ? decodedToken._id : null);
        });
    };
    UserApi.getAllOrganisationsOfCurrentUser = function (req, res) {
        organisationAPI_1.OrganisationAPI.getAllOrganisationsOfCurrentUser(req, res);
    };
    UserApi.getMembersOfOrganisationById = function (organisationId, res) {
        this.manager.getMembersOfOrganisationById(organisationId, function (members) {
            res.send(members);
        });
    };
    UserApi.getMembersOfGroupById = function (groupId, res) {
        this.manager.getMembersOfGroupById(groupId, function (members) {
            res.send(members);
        });
    };
    UserApi.manager = new userManager_1.UserManager();
    return UserApi;
})();
exports.UserApi = UserApi;
//# sourceMappingURL=userApi.js.map