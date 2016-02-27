var User = (function () {
    function User(_name, _email, _password) {
        this._name = _name;
        this._email = _email;
        this._password = _password;
        this._organisatorOf = [];
        this._memberOf = [];
    }
    User.empty = function () {
        return new User("", "", "");
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map