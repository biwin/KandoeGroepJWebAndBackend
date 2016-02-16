/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var mongoose_1 = require("mongoose");
var daoConstants_1 = require("./daoConstants");
var UserDao = (function () {
    function UserDao() {
        console.log("JASPER");
        this._db = new mongoose_1.Mongoose().connect(daoConstants_1.DaoConstants.CONNECTION_URL);
        this._userSchema = new mongoose_1.Schema({
            _id: String,
            _email: Strin,
            _password: String
        }, { versionKey: false });
        this._userModel = mongoose_1.model('User', this._userSchema);
    }
    UserDao.prototype.create = function (id, email, password) {
        var user = new this._userModel({ _id: id, _email: email, _password: password });
        console.log("jasper??");
        user.save(function (createdUser) {
            console.log("hello");
            console.log(createdUser);
        });
        return null;
    };
    return UserDao;
})();
exports.UserDao = UserDao;
//# sourceMappingURL=userDao.js.map