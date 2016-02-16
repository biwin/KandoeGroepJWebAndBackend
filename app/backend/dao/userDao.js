/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var mongoose_1 = require("mongoose");
var daoConstants_1 = require("./daoConstants");
var UserDao = (function () {
    function UserDao() {
        this._db = new mongoose_1.Mongoose().connect(daoConstants_1.DaoConstants.CONNECTION_URL);
        this._userSchema = new mongoose_1.Schema({
            _id: String,
            _email: String,
            _password: String
        }, { versionKey: false });
        this._userModel = mongoose_1.model('User', this._userSchema);
    }
    UserDao.prototype.create = function (id, email, password) {
        var user = new this._userModel({ _id: id, _email: email, _password: password });
        user.save(function (createdUser) {
        });
        return null;
    };
    return UserDao;
})();
exports.UserDao = UserDao;
//# sourceMappingURL=userDao.js.map