/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var mongoose_1 = require("mongoose");
var daoConstants_1 = require("./daoConstants");
var User = require("../model/User");
var UserDao = (function () {
    function UserDao() {
        this._db = new mongoose_1.Mongoose().connect(daoConstants_1.DaoConstants.CONNECTION_URL);
    }
    UserDao.prototype.create = function (id, email, password) {
        var user = new User({ name: id, email: email, password: password });
        user.save();
        return null;
    };
    return UserDao;
})();
exports.UserDao = UserDao;
//# sourceMappingURL=userDao.js.map