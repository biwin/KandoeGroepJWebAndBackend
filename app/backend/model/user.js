var User = (function () {
    function User(_name, _email, _password, _role) {
        this._name = _name;
        this._email = _email;
        this._password = _password;
        this._role = _role;
    }
    User.empty = function () {
        return new User("", "", "", "");
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map